'use client';
export default function Footer() {
  return (
    <>
      <section className="bg-black text-white w-full flex flex-col relative">
        {/* Content Wrapper */}
        <div className="px-4 sm:px-6 py-8 max-w-[1300px] mx-auto flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 w-full">
            <p className="text-gray-400 text-sm sm:text-xs font-normal">
              Uncover the potency of Drive X Deals
            </p>
            <button className="ctaButton self-start sm:self-auto">
              Contact Us Now
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal leading-snug whitespace-pre-line">
            Ready to start{'\n'}with us?
          </h1>

          <hr className="border-gray-800 w-full" />

          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 text-gray-400 text-sm">
            <div>
              <p className="font-bold text-white mb-1">Head Office</p>
              <p className="leading-relaxed">
                11605 West Dodge Rd, Suite 3,
                <br />
                Omaha, NE - 68154
              </p>
            </div>

            <div>
              <p className="font-bold text-white mb-1">Office Hours</p>
              <p className="leading-relaxed">
                Mon - Sat: 9.00am to 7.00pm
                <br />
                Sunday: Closed
              </p>
            </div>

            <div>
              <p className="font-bold text-white mb-1">Email</p>
              <p className="leading-relaxed">contact@drivexdeals.com</p>
            </div>

            <div>
              <p className="font-bold text-white mb-1">Phone</p>
              <p className="leading-relaxed">+92 330 010009</p>
            </div>
          </div>
        </div>

        {/* Centered Watermark */}
        <div className="text-[80px] sm:text-[120px] md:text-[150px] font-black text-white/5 select-none pointer-events-none text-center tracking-tight leading-none mb-10">
          Drive X Deals
        </div>
      </section>

      <style jsx>{`
        .ctaButton {
          background-color: #0a7059;
          border: none;
          border-radius: 20px;
          padding: 8px 24px;
          color: #fff;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          user-select: none;
          transition: background-color 0.3s ease;
        }
        .ctaButton:hover {
          background-color: #075035;
        }
      `}</style>
    </>
  );
}
