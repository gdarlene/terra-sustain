import React from "react";
import SideBar from "./sidebar";
import CitizenHeader from "./Citizen-header";

const Resources: React.FC = ()=>{
return(
    <div className="min-h-screen bg-[#fcfff7c6]">
      <SideBar />
      <CitizenHeader />
      <main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* introduction to page */}
        <div className="transition-all duration-700 mt-10">
          <h1 className="text-3xl font-bold text-neutral-800 font-subheading">
            Sustainability Awareness Resources
          </h1>
          <p className="mt-2 text-lg text-gray-600 font-body">
            Broaden your knowledge about the different ways to promote sustainability through text or visual resources.
          </p>
        </div>
        {/* Books Section - Downloadable PDFs */}
        <section className="mt-6">
          <h2 className="text-2xl font-bold text-neutral-800 font-subheading mb-4">
            Books & PDFs
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src="/images/common future.png" alt="our common future book" />
              <a
                href="https://sustainabledevelopment.un.org/content/documents/5987our-common-future.pdf"
                download
                className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                target="_blank"
              >
                Download PDF
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src="/images/afforestation-impact.png" alt="our common future book" />
              <a
                href="https://www.diva-portal.org/smash/get/diva2:702668/FULLTEXT01.pdf"
                download
                className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                target="_blank"
              >
                Download PDF
              </a>
            </div>   
            <div className="bg-white px-6 py-5 rounded-lg shadow-md">
              <img src="/images/soil conservation.png" alt="book" />
              <a
                href="https://www.fao.org/4/ar113e/ar113e.pdf"
                download
                className="mt-10 inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                target="_blank"
              >
                Download PDF
              </a>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-neutral-800 font-subheading mb-4">
            Articles
          </h2>
          <p className="text-lg text-gray-600 font-body mb-6">
            Explore insightful articles on sustainability practices around the World.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src="/images/trees-planting.png" alt="people planting trees" />         
              <h3 className="text-xl font-semibold mb-2">How Rwanda's Young Innovators Are Building A Circular Economy</h3>
              <p className="text-gray-600 mb-4">Focus on reduce, reuse, recycle systems in Rwanda.</p>
              <a
                href="https://www.rfa.rw/news/news-details/season-2024-2025-tree-planting-launch-leaves-promising-impact-as-rwanda-eyes-to-plant-over-65-million-seedlings"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-secondary/90 text-white px-4 py-2 rounded-md hover:bg-secondary/80 focus:bg-secondary"
              >
                Read Article
              </a>
            </div>
          </div>
        </section>

        {/* Videos Section - Links to videos (or embeds); PDFs for transcripts if needed, but using video links here */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-neutral-800 font-subheading mb-4">
            Videos
          </h2>
          <p className="text-lg text-gray-600 font-body mb-6">
            Watch educational videos on combating deforestation and soil erosion.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            <div className="bg-white/10 p-6 rounded-lg shadow-md">
              <a
                href="https://youtu.be/cOfWyCkcSvg?si=nRsFoFuL1wIjYF6D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mr-2"
              >
                <img src="/images/stop-deforestation.png" alt="video on deforestaion" />
                <h3 className="text-xl mt-3 font-semibold mb-2">Can Money Stop Deforestation?</h3>
                <p className="text-gray-600 mb-4">A grasp of stopping deforestion.</p>
              </a>
            </div>
          </div>
        </section>

        {/* add your own book  */}
        <section className="mt-12 mb-8">
          <h2 className="text-2xl font-bold text-neutral-800 font-subheading mb-4">
            Contribute Your Resources
          </h2>
          <p className="text-lg text-gray-600 font-body mb-6">
            Coming soon: Upload your own books, articles, or video links to share with the community. Stay tuned for this feature!
          </p>
        </section>
      </main>
    </div>
)
}

export default Resources;