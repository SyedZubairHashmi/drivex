'use client';
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <section className=" bg-black text-white w-full flex flex-col relative">
        {/* Content Wrapper */}
        <div
          className="py-12 max-w-[1400px] mx-auto px-8 flex-col gap-20"
          // style={{ marginLeft: '150px', marginRight: '160px' }}
        >
          {/* Top text and button */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
            <p className="text-gray-400 text-sm sm:text-base font-normal">
              Uncover the potency of Drive X Deals
            </p>
           <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition">
  Contact Us Now
</button>

          </div>

          {/* Main Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal leading-snug whitespace-pre-line">
            Ready to start{'\n'}with us?
          </h1>

          <hr className="border-gray-800 w-full mb-12" />

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row justify-between gap-12 text-gray-400 text-sm">
            <div>
              <p className="font-bold text-white mb-2">Head Office</p>
              <p className="leading-relaxed">
                11605 West Dodge Rd, Suite 3,
                <br />
                Omaha, NE - 68154
              </p>
            </div>

            <div>
              <p className="font-bold text-white mb-2">Office Hours</p>
              <p className="leading-relaxed">
                Mon - Sat: 9.00am to 7.00pm
                <br />
                Sunday: Closed
              </p>
            </div>

            <div>
              <p className="font-bold text-white mb-2">Email</p>
              <p className="leading-relaxed">contact@drivexdeals.com</p>
            </div>

            <div>
              <p className="font-bold text-white mb-2">Phone</p>
              <p className="leading-relaxed">+92 330 010009</p>
            </div>
          </div>
        </div>

        {/* Bottom Center Image */}
        <div className="w-full flex justify-center mt-1 mb-4">
  <Image
    src="/Drive X Deals.png"
    alt="Footer Logo"
    width={1200}
    height={600}
    className="transition duration-300 ease-in-out hover:brightness-125"
  />
</div>

      </section>
    </>
  );
}
