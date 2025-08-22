import Image from 'next/image';

const stories = [
  {
    id: 1,
    title: "No Showroom Visits, No Pressure Still Got the Best Deal",
    description:
      "Did everything online, even got a test drive arranged. The car arrived just as shown — clean and effortless.",
    imgSrc: "honda-civic-2019.png",
  },
  {
    id: 2,
    title: "Got My Dream Car in Just 3 Days!",
    description:
      "I found the perfect car and had the keys in just 3 days. DriveXDeals made the whole process smooth and fast.",
    imgSrc: "honda-civic-2019.png",
  },
  {
    id: 3,
    title: "No Showroom Visits, No Pressure Still Got the Best Deal",
    description:
      "Did everything online, even got a test drive arranged. The car arrived just as shown — clean and effortless.",
    imgSrc: "honda-civic-2019.png",
  },
];

export default function BlogSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-2">
        Happy Buyers, Real Stories
      </h2>
      <p className="text-center text-gray-600 mb-10 text-sm sm:text-base">
        Stories from happy buyers who found their car with DriveXDeals.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {stories.map(({ id, title, description, imgSrc }) => (
          <div
            key={id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center"
          >
            <div className="relative w-full h-56 sm:h-64 md:h-56 lg:h-64">
              <Image
                src={imgSrc}
                alt={title}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-t-lg"
              />
            </div>

            <div className="px-4 sm:px-6 pb-6 w-full flex flex-col items-center">
              <h3 className="font-medium text-lg sm:text-xl mb-2 text-center">{title}</h3>
              <p className="text-gray-700 mb-4 text-center text-sm sm:text-base">{description}</p>
              <button className="w-full border border-gray-300 rounded-md py-2 text-sm font-medium hover:bg-gray-100 transition">
                Read My Story
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
