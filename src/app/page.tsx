'use client'

import CampaignCard from '@/components/CampaignCard'
import CampaignHero from '@/components/CampaignHero'
import { useEffect, useMemo, useState } from 'react'
import {
  fetchActiveCampaigns,
  getProviderReadonly,
} from '@/services/blockchain'
import { Campaign } from '@/utils/interfaces'
import Link from 'next/link'

export default function Page() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const program = useMemo(() => getProviderReadonly(), [])

  useEffect(() => {
    fetchActiveCampaigns(program!).then((data) => setCampaigns(data))
  }, [program])

  return (
    <div className="container mx-auto p-6">
      <CampaignHero />

      {/* Features and Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-neutral mb-8">Why DeSciCrowd?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-primary mb-4">Decentralized Funding</h3>
              <p className="text-neutral">Leverage the power of the Solana blockchain for transparent and secure funding of your research projects.</p>
            </div>
            <div className="p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-primary mb-4">Global Community</h3>
              <p className="text-neutral">Connect with a diverse network of funders and researchers worldwide.</p>
            </div>
            <div className="p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-primary mb-4">Support Innovation</h3>
              <p className="text-neutral">Directly contribute to groundbreaking scientific discoveries and accelerate innovation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-neutral mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg shadow-lg bg-white">
              <div className="text-4xl font-bold text-primary mb-4">1</div>
              <h3 className="text-xl font-semibold text-neutral mb-4">For Researchers: Create Your Campaign</h3>
              <p className="text-neutral">Propose your research project, set a funding goal, and share your vision with the world.</p>
            </div>
            <div className="p-6 rounded-lg shadow-lg bg-white">
              <div className="text-4xl font-bold text-primary mb-4">2</div>
              <h3 className="text-xl font-semibold text-neutral mb-4">For Funders: Discover & Donate</h3>
              <p className="text-neutral">Explore innovative research projects and contribute directly to the science you believe in.</p>
            </div>
            <div className="p-6 rounded-lg shadow-lg bg-white">
              <div className="text-4xl font-bold text-primary mb-4">3</div>
              <h3 className="text-xl font-semibold text-neutral mb-4">Decentralized & Transparent</h3>
              <p className="text-neutral">All transactions and campaign progress are recorded on the Solana blockchain for full transparency.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-10" />
      <h1 className="text-4xl font-bold text-center mb-8">Explore Groundbreaking Research</h1>
      {campaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.cid} campaign={campaign} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-800">
            No campaigns available at the moment
          </h2>
          <p className="text-gray-600 mt-4">
            Be the first to create a campaign and make a difference!
          </p>
          <div className="mt-6">
            <a
              href="/create"
              className="btn items-center btn-primary"
            >
              Create a Campaign
            </a>
          </div>
        </div>
      )}

      {/* Call to Action Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-neutral mb-8">Ready to Get Started?</h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
            <Link
              href="/account"
              className="btn btn-outline btn-primary btn-lg w-full md:w-auto"
            >
              Explore Campaigns
            </Link>
            <Link
              href="/create"
              className="btn btn-primary btn-lg w-full md:w-auto"
            >
              Create a Campaign
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
