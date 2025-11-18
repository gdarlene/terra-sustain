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
  category:string;
}

const AddIssue: React.FC = () => {
  const navigate = useNavigate();
  const [issue, setIssue] = useState<Issue>({
    issueDescription: "",
    mediaUrl:"",
    category:"",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setIssue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!issue.issueDescription || !issue.category || !issue.mediaUrl) {
      setError("All fields are required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        issueDescription: issue.issueDescription,
        mediaUrl: issue.mediaUrl,
        category: issue.category,
      };

      await axios.post(
        "http://localhost:8096/terrasustain/citizen/add_Issue",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );
    setShowSuccessModal(true);
    setIssue({
        issueDescription: "",
        mediaUrl:"",
        category:"",
      });
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.message || "Something went wrong";
      setError(msg);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfff7c6]">
      <SideBar />
      <CitizenHeader />

      <main className="px-4 mx-72 max-w-7xl sm:px-6 lg:px-8">
        <div className="transition-all duration-700 mt-10">
          <h1 className="text-3xl font-bold text-neutral-800 font-subheading">
            Add new Issue
          </h1>
          <p className="mt-2 text-lg text-gray-600 font-body">
            Make your community aware of the dangers the environment is facing.
          </p>
        </div>

        <div className="mt-9">
          {error && (
            <p className="mb-4 text-red-600 text-center font-medium">{error}</p>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-full mx-auto"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
              Add New Issue
            </h2>
            {/* ---- Category ---- */}
            <div className="mb-5">
              <label htmlFor="category" className="block text-gray-600 mb-2 font-medium">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={issue.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-primary transition"
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="POLLUTION">Pollution</option>
                <option value="OVEREXPLOITATION">Over Exploitation</option>
                <option value="HABITAT_DESTRUCTION">Habitat Destruction</option>
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor="description"
                className="block text-gray-600 mb-2 font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                name="issueDescription"
                rows={3}
                value={issue.issueDescription}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-primary transition resize-none"
                placeholder="Please enter Issue description"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block text-gray-600 mb-2 font-medium"
              >
                Path to file
              </label>
              <input
                id="mediaUrl"
                name="mediaUrl"
                type="text"
                value={issue.mediaUrl}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-primary transition"
                placeholder="Please enter the full path to the file"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-md text-white font-medium text-lg transition
                ${
                  isSubmitting
                    ? "bg-primary/70 cursor-not-allowed"
                    : "bg-primary hover:bg-primary/85 focus:bg-primary"
                }`}
            >
              {isSubmitting ? "Adding…" : "Add Issue"}
            </button>
          </form>
        </div>
      </main>
      {showSuccessModal && (
        <SuccessModal
          title="Report"
          message="Added Successfully"
          onAddAnother={() => setShowSuccessModal(false)}
          onGoHome={() => navigate("/citizen")}
        />
      )}
    </div>
  );
};

export default AddIssue;