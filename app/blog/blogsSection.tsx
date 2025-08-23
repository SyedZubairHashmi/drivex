import Image from "next/image";

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
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-2">
        Happy Buyers, Real Stories
      </h2>
      <p className="text-center text-gray-600 mb-10 text-sm sm:text-base">
        Stories from happy buyers who found their car with DriveXDeals.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {stories.map(({ id, title, description, imgSrc }) => (
          <div
            key={id}
            className="border rounded-3xl h-[500px] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center"
          >
            <div className="w-300 mt-4 border rounded-3xl overflow-hidden">
              <Image
                src={imgSrc}
                alt={title}
                width={400}
                height={250}
                className="object-cover"
              />
            </div>

            <div className="px-4 sm:px-6 pb-6 flex-1 flex flex-col justify-between text-start mt-6">
              <div>
                <h3 className="font-medium text-2xl sm:text-xl mb-2">
                  {title}
                </h3>
                <p className="text-gray-700 mb-4 text-sm sm:text-base">
                  {description}
                </p>
              </div>

              <div className="mt-auto w-full">
                <button className="w-full border   border-gray-300 rounded-2xl py-2 text-xl  hover:bg-gray-100 transition">
                  Read My Story
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
