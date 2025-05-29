import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CampaignHero = () => {
  return (
    <section className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-20 px-6 md:px-12">
      <div className="container mx-auto text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
             Fund the Future of Scientific Discovery
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90">
              DeSciCrowd connects pioneering researchers with a global community of funders. Support groundbreaking science, accelerate innovation, and be part of the next big breakthrough.
            </p>
            <div className="mt-8 flex flex-col md:flex-row items-center md:items-start">
              <Link
                href="/account"
                className="bg-white text-green-600 hover:bg-green-100 font-semibold py-3 px-6
                rounded-lg shadow-md transition-all mb-4 md:mb-0 md:mr-4 w-full md:w-auto text-center"
              >
                Explore Campaigns
              </Link>
              <Link
                href="/create"
                className="text-white bg-green-600 hover:bg-green-700 font-semibold py-3 px-6
                rounded-lg shadow-md transition-all w-full md:w-auto text-center"
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
              className="w-full rounded-lg shadow-lg h-96 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
export default CampaignHero
