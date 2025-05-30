import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CampaignHero = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-white py-24 px-6 md:px-12 flex items-center">
      <div className="container mx-auto text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
             Fund the Future of Scientific Discovery
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 mb-8">
              DeSciCrowd connects pioneering researchers with a global community of funders. Support groundbreaking science, accelerate innovation, and be part of the next big breakthrough.
            </p>
            <div className="mt-8 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
              <Link
                href="/account"
                className="btn  btn-primary w-full md:w-auto"
              >
                Explore Campaigns
              </Link>
              <Link
                href="/create"
                className="btn btn-primary w-full md:w-auto"
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
              className="w-full rounded-lg shadow-lg h-64 md:h-80 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
export default CampaignHero
