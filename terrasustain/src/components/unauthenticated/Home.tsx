import React, { useEffect, useRef, useState } from "react";
// Custom hook: Observe when element is in view
const useInView = (options: IntersectionObserverInit = {}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, ...options }
    );
    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [options]);
  return [ref, isVisible] as const;
};
const Home: React.FC = () => {
  const partners = [
    { alt: "World Wildlife Fund", src: "/images/wwf-logo.png" },
    { alt: "GreenPeace logo", src: "/images/green-peace.png" },
    { alt: "Green Belt Movement Africa", src: "/images/the-green-belt-movement.png" },
  ];
  return (
    <>
      {/* HERO SECTION */}
        <section className="relative isolate overflow-hidden h-[70vh] sm:h-[75vh] flex items-center px-4 sm:px-0">
          <div className="absolute inset-0 -z-10">
            <img
              src="/images/deforestation-large-scale.jpg"
              alt="deforested forest"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/65" />
          </div>

          {/* CONTENT WRAPPER */}
          <div className="w-full max-w-4xl mx-auto text-center sm:text-left px-4 sm:px-0 sm:ml-24 md:ml-56">

            <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
              <span className="block mb-1">Engage With The Proactive</span>
              <span>Sustainability Hub</span>
            </h2>

            <p className="mt-4 sm:mt-8 text-base sm:text-xl font-semibold text-[#fbfff5]/85 leading-relaxed">
              Join the wide community that supports sustainability and make<br className="hidden sm:block" />
              your first and lasting step to the beauty of tomorrow!
            </p>

            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-x-6 justify-center sm:justify-start">

              <a
                href="/role"
                className="rounded-md bg-secondary px-5 py-3 w-full sm:w-auto text-sm sm:text-base
                font-semibold text-[#fbfff5] shadow hover:bg-secondary/70 transition"
              >
                Engage with Community
              </a>

              <a
                href="/about"
                className="rounded-md w-full sm:w-auto px-5 py-3 ring-1 ring-inset ring-white 
                text-sm sm:text-base font-semibold text-white hover:bg-white/10 transition"
              >
                Read More
              </a>

            </div>
          </div>
        </section>
      {/* OUR COMMUNITY SECTION */}
      <section id="community" className="py-12 sm:py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-800 font-titles leading-snug">
              Our Community in Action
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Real Rwandans. Real impact. From farmers to students, elders to
              youth — together, we're restoring our land, one report at a time.
            </p>
          </div>

          {/* COMMUNITY GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {[
              {
                src: "/images/youthplantingtrees.png",
                alt: "Youth group planting trees",
                caption: "Youth Restoring Forests",
                badge: "Top Ranked Team",
              },
              {
                src: "/images/celebrating the best.png",
                alt: "Local leaderboard celebration",
                caption: "Celebrating Active Sustainers",
                badge: "Annual events",
              },
            ].map((item, index) => {
              const [ref, isVisible] = useInView();
              return (
                <div
                  key={index}
                  ref={ref}
                  className={`group relative overflow-hidden rounded-2xl shadow-lg bg-white transform transition-all duration-700 hover:scale-105 hover:shadow-2xl ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-56 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#f9a109fe] text-white text-xs sm:text-sm font-bold px-2 py-1 rounded-full animate-bounce">
                      {item.badge}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white cursor-pointer">
                      <h3 className="text-base sm:text-lg font-semibold">{item.caption}</h3>
                      <p className="text-xs sm:text-sm opacity-90">See their impact →</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-green-900/0 group-hover:bg-green-900/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white font-semibold text-base sm:text-lg">Join Them</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* COMMUNITY STATS */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            {[
              { value: "50+", label: "Active Citizens" },
              { value: "20+", label: "Reports Submitted" },
              { value: "1.8K+", label: "Trees Protected" },
            ].map((stat, i) => {
              const [ref, isVisible] = useInView();
              return (
                <div
                  key={i}
                  ref={ref}
                  className={`transition-all duration-700 delay-300 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <p className="text-3xl sm:text-4xl font-bold text-green-700">{stat.value}</p>
                  <p className="mt-1 sm:mt-2 text-gray-600 font-medium text-sm sm:text-base">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-10 sm:mt-12 text-center">
            <a
              href="/role"
              className="inline-flex items-center rounded-full bg-secondary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-lg hover:bg-secondary/90 transform hover:scale-105 transition-all duration-300"
            >
              <span>Be Part of the Movement</span>
              <svg
                className="ml-2 w-4 sm:w-5 h-4 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* PARTNERS MARQUEE */}
      <section id="partners" className="bg-sectionBg-300/50 py-8 sm:py-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-base sm:text-lg font-semibold text-gray-900 mb-8 sm:mb-12">
            Trusted by the World's NGOs and Activists' movements.
          </h2>
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee gap-8 sm:gap-12">
              {partners.map((p, i) => (
                <div key={p.alt + i} className="flex-shrink-0 w-60 sm:w-80">
                  <img
                    alt={p.alt}
                    src={p.src}
                    className="max-h-20 sm:max-h-28 w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;