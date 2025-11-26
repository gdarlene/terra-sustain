import React from "react";
import SideBar from "./sidebar";
import CitizenHeader from "./Citizen-header";

const Resources: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fcfff7c6]">
      <SideBar />
      <CitizenHeader />

      <main className="px-4 sm:px-6 lg:px-8 lg:pl-64 py-8">
        {/* Introduction */}
        <div className="transition-all duration-700 mt-10 max-w-4xl mx-auto text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800 font-subheading">
            Sustainability Awareness Resources
          </h1>
          <p className="mt-2 text-base sm:text-lg text-gray-600 font-body">
            Broaden your knowledge about the different ways to promote sustainability through text or visual resources.
          </p>
        </div>

        {/* Books Section */}
        <section className="mt-6 max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-800 font-subheading mb-4">
            Books & PDFs
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Book 1 */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col items-center">
              <img
                src="/images/common future.png"
                alt="Our Common Future book"
                className="w-full h-auto max-h-60 object-contain mb-4"
              />
              <a
                href="https://sustainabledevelopment.un.org/content/documents/5987our-common-future.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Download PDF
              </a>
            </div>
            {/* Book 2 */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col items-center">
              <img
                src="/images/afforestation-impact.png"
                alt="Afforestation Impact book"
                className="w-full h-auto max-h-60 object-contain mb-4"
              />
              <a
                href="https://www.diva-portal.org/smash/get/diva2:702668/FULLTEXT01.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Download PDF
              </a>
            </div>
            {/* Book 3 */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col items-center">
              <img
                src="/images/soil conservation.png"
                alt="Soil Conservation book"
                className="w-full h-auto max-h-60 object-contain mb-4"
              />
              <a
                href="https://www.fao.org/4/ar113e/ar113e.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Download PDF
              </a>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-800 font-subheading mb-4">
            Articles
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-body mb-6">
            Explore insightful articles on sustainability practices around the world.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col">
              <img
                src="/images/trees-planting.png"
                alt="people planting trees"
                className="w-full h-auto max-h-60 object-contain mb-4"
              />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                How Rwanda's Young Innovators Are Building A Circular Economy
              </h3>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Focus on reduce, reuse, recycle systems in Rwanda.
              </p>
              <a
                href="https://www.rfa.rw/news/news-details/season-2024-2025-tree-planting-launch-leaves-promising-impact-as-rwanda-eyes-to-plant-over-65-million-seedlings"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-secondary/90 text-white px-4 py-2 rounded-md hover:bg-secondary/80 focus:bg-secondary text-sm sm:text-base"
              >
                Read Article
              </a>
            </div>
          </div>
        </section>

        {/* Videos Section */}
        <section className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-800 font-subheading mb-4">
            Videos
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-body mb-6">
            Watch educational videos on combating deforestation and soil erosion.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="bg-white/10 p-4 sm:p-6 rounded-lg shadow-md flex flex-col">
              <a
                href="https://youtu.be/cOfWyCkcSvg?si=nRsFoFuL1wIjYF6D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col"
              >
                <img
                  src="/images/stop-deforestation.png"
                  alt="video on deforestation"
                  className="w-full h-auto max-h-60 object-contain mb-4"
                />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Can Money Stop Deforestation?
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  A grasp of stopping deforestation.
                </p>
              </a>
            </div>
          </div>
        </section>

        {/* Contribute Section */}
        <section className="mt-12 mb-8 max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-800 font-subheading mb-4">
            Contribute Your Resources
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-body mb-6">
            Coming soon: Upload your own books, articles, or video links to share with the community. Stay tuned for this feature!
          </p>
        </section>
      </main>
    </div>
  );
};

export default Resources;