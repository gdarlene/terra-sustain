import React, {useEffect,useRef, useState} from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

const callouts = [
  {
    name: 'Market opportunities for Farmers',
    description: 'We help farmers get a market place with realtime prices',
    imageSrc: '/images/yummy.jpg',
    imageAlt: 'people holding harvests',
    href: '#',
  },
  {
    name: 'Hotels Market place',
    description: 'We are a safe platform for hotels',
    imageSrc: '/images/hotel food.jpg',
    imageAlt: 'people preparing food',
    href: '#',
  },
  {
    name: 'Logistic Services',
    description: 'We provide safe logistic services for harvest to reach the market',
    imageSrc: '/images/delivery-car.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
];
// adding the animation feature
const useInView = (options = {}) => {
  const ref = useRef<HTMLDivElement>(null);
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

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return [ref, isVisible] as const;
};
const Home: React.FC = () => {
  const partners = [
  { alt: "Naica cooperative", src: "/images/NAICA.jpg" },
  { alt: "Marriot hotels", src: "/images/marriot.jpg" },
  { alt: "La creola restaurant", src: "/images/Creola.jpg" },
  ];
  return (
    <>
      {/* Hero section */}
      <section className="relative isolate overflow-hidden h-[75vh] flex flex-col justify-center">
        {/* Background image (fills the top 75vh) */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/deforestation-large-scale.jpg"
            alt="deforested forest"
            className="w-full h-full object-cover object-center"
          />
          {/* Optional dark overlay so the search bar stays readable */}
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <div className="ml-56">
              <h2 className="text-5xl font-bold text-white sm:text-5xl">
               <span className='mb-2 pb-2'>Engage With The Proactive</span><br />Sustainability Hub
              </h2>
              <p className="mt-8 text-lg font-semibold text-pretty text-[#fbfff5]/85 sm:text-xl/8">
                 Join the wide community that supports Sustainability and make <br /> your first and lasting step to the beauty of tomorrow!
              </p>
              <div className="mt-10 flex items-center justify-normal gap-x-6">
                <a
                  href="/register"
                  className="rounded-md bg-secondary px-4 py-3 text-sm font-semibold text-[#fbfff5] shadow-xs focus:bg-secondary/90 hover:bg-secondary/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                >
                  Engage with Community
                </a>
                <a href="/about" className="rounded-sm ring-1 py-3 px-3 ring-inset ring-white text-sm/6 font-semibold text-white">
                  Read More
                </a>
            </div>
          </div>
      </section>
      {/*  OUR SERVICES */}
      <section id='services' className="bg-sectionBg-300/80 py-8 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-green-800 text-center mb-12 font-titles">
            Our Services
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {callouts.map((callout, index) => {
              const [ref, isVisible] = useInView();
              return (
                <article
                  key={callout.name}
                  ref={ref}
                  className={`
                    group transition-all duration-700 ease-out 
                    ${isVisible ? 'opacity-100 translate-y-0 ' : 'opacity-0 translate-y-10'}
                  `}
                  style={{
                    transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
                  }}
                >
                  <div className="overflow-hidden rounded-3xl bg-white shadow-md">
                    <img
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      className="aspect-square w-full object-cover group-hover:opacity-90 transition duration-300"
                    />
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-gray-900 font-subheadings">
                    <a href={callout.href} className="hover:underline text-gray-800">
                      {callout.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-lg text-gray-600 font-body">{callout.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      {/* our partners – infinite horizontal marquee for animation features */}
      <section id="partners" className="bg-sectionBg-300/50 py-8 sm:py-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg/8 font-semibold text-gray-900 mb-12">
            Trusted by Rwanda's Premium Food Network of Farmers, Hotels, and Logistics Services.
          </h2>

          {/* Marquee container – hides overflow */}
          <div className="relative overflow-hidden">
            {/* Inner track – duplicated automatically via CSS */}
            <div className="flex animate-marquee gap-12">
              {partners.map((p, i) => (
                <div
                  key={p.alt + i}
                  className="flex-shrink-0 w-80"
                >
                  <img
                    alt={p.alt}
                    src={p.src}
                    className="max-h-28 w-full object-contain"
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