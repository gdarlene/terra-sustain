import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import SideBar from "./sidebar";
import axios from "axios";
import CitizenHeader from "./Citizen-header";
import { useNavigate } from "react-router-dom";
import SuccessModal from "./SuccessModel";

interface Issue {
  issueDescription: string;
  mediaUrl: string;
  category: string;
}

const AddIssue: React.FC = () => {
  const navigate = useNavigate();
  const [issue, setIssue] = useState<Issue>({
    issueDescription: "",
    mediaUrl: "",
    category: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const CLOUDINARY_CLOUD_NAME = "dc1jpgk2h"; 
  const CLOUDINARY_UPLOAD_PRESET = "terrasustain";

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File too large. Max 10MB allowed.");
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError("");
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
      formData,
      { headers: { "X-Requested-With": "XMLHttpRequest" } }
    );
    return response.data.secure_url;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setIssue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!issue.issueDescription.trim()) {
      setError("Description is required");
      return;
    }
    if (!issue.category) {
      setError("Please select a category");
      return;
    }
    if (!file) {
      setError("Please upload an image or video");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in");
      return;
    }

    setIsSubmitting(true);
    setUploading(true);

    try {
      const mediaUrl = await uploadToCloudinary(file);

      const payload = {
        issueDescription: issue.issueDescription,
        mediaUrl,
        category: issue.category,
      };

      await axios.post(
        "http://localhost:8096/terrasustain/citizen/add_Issue",
        payload,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      setShowSuccessModal(true);
      setIssue({ issueDescription: "", mediaUrl: "", category: "" });
      setFile(null);
      setPreview(null);
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to submit report. Please try again.";
      setError(msg);
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfff7c6]">
      <SideBar />
      <CitizenHeader />

      <main className="px-4 sm:px-6 lg:px-8 lg:pl-64 py-8">
        <div className="transition-all duration-700 mt-10 max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800 font-subheading text-center lg:text-left">
            Add New Issue
          </h1>
          <p className="mt-2 text-base sm:text-lg text-gray-600 font-body text-center lg:text-left">
            Make your community aware of the dangers the environment is facing.
          </p>
        </div>

        <div className="mt-9 max-w-3xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center font-medium">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center text-gray-800">
              Report Environmental Issue
            </h2>

            {/* Category */}
            <div className="mb-4 sm:mb-6">
              <label htmlFor="category" className="block text-gray-700 mb-2 font-medium">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={issue.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 sm:p-3 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              >
                <option value="" disabled>Select a category</option>
                <option value="POLLUTION">Pollution</option>
                <option value="OVEREXPLOITATION">Over Exploitation</option>
                <option value="HABITAT_DESTRUCTION">Habitat Destruction</option>
              </select>
            </div>

            {/* Description */}
            <div className="mb-4 sm:mb-6">
              <label htmlFor="description" className="block text-gray-700 mb-2 font-medium">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="issueDescription"
                rows={5}
                value={issue.issueDescription}
                onChange={handleChange}
                required
                placeholder="Describe the environmental issue in detail..."
                className="w-full border border-gray-300 p-2 sm:p-3 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition resize-none"
              />
            </div>

            {/* File Upload */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-gray-700 mb-2 font-medium">
                Upload Photo or Video <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                required
                className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 sm:file:px-6 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-600 file:text-white hover:file:bg-green-700 cursor-pointer"
              />

              {/* Preview */}
              {preview && (
                <div className="mt-4 sm:mt-6 border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  {file?.type.startsWith("image/") ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full max-h-72 sm:max-h-80 object-contain rounded-lg mx-auto"
                    />
                  ) : (
                    <video
                      src={preview}
                      controls
                      className="w-full max-h-72 sm:max-h-80 rounded-lg mx-auto"
                    />
                  )}
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    {file?.name} ({(file!.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || uploading}
              className={`w-full py-3 sm:py-4 rounded-md text-white font-bold text-lg transition-all duration-200
                ${isSubmitting || uploading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 active:bg-green-800 shadow-lg"
                }`}
            >
              {uploading
                ? "Uploading media..."
                : isSubmitting
                ? "Submitting report..."
                : "Submit Report"}
            </button>
          </form>
        </div>
      </main>

      {showSuccessModal && (
        <SuccessModal
          title="Report Submitted!"
          message="Thanks For Your Contribution Towards Sustainability!"
          onAddAnother={() => {
            setShowSuccessModal(false);
            setPreview(null);
            setFile(null);
          }}
          onGoHome={() => navigate("/citizen")}
        />
      )}
    </div>
  );
};

export default AddIssue;