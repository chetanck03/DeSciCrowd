import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const CampaignHero = () => {
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHoverPosition({ x, y });
  };

  return (
    <>
      <div className="container mx-auto text-center md:text-left py-20 px-6 md:px-12  bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg mt-0 mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-primary animate-slide-in-left">
              <span className="gradient-text">
                Fund the Future of Scientific Discovery
              </span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600 mb-8 animate-slide-in-right">
              DeSciCrowd connects pioneering researchers with a global community
              of funders. Support groundbreaking science, accelerate innovation,
              and be part of the next big breakthrough.
            </p>
            <div className="mt-8 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
              <Link
                href="/account"
                className="btn btn-outline btn-primary w-full md:w-auto hover:bg-primary-dark hover:shadow-md transition duration-300"
              >
                Explore Campaigns
              </Link>
              <Link
                href="/create"
                className="btn btn-primary w-full md:w-auto hover:bg-primary-dark hover:shadow-md transition duration-300"
              >
                Start a Campaign
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <Image
              src="https://img.freepik.com/premium-photo/advanced-medical-technology-disease-clinical-analysis-medical-science-biotechnology_71956-50173.jpg"
              alt="Crowdfunding Illustration"
              width={576}
              height={384}
              className="w-full rounded-lg cursor-pointer shadow-lg h-64 md:h-80 object-cover animate-fade-in image-hover-effect"
              priority
              onClick={handleImageClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default CampaignHero;
