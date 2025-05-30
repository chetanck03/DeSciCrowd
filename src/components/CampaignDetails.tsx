import { truncateAddress } from '@/utils/helper'
import { Campaign } from '@/utils/interfaces'
import Link from 'next/link'
import React from 'react'
import {
  FaUserCircle,
  FaCoins,
  FaDollarSign,
  FaBell,
  FaRegCalendarAlt,
} from 'react-icons/fa'

const CampaignDetails: React.FC<{ campaign: Campaign }> = ({ campaign }) => {
  const goalReachedText =
    campaign.amountRaised >= campaign.goal ? 'Reached!' : 'Not Reached!'
  const goalReachedColor =
    campaign.amountRaised >= campaign.goal ? 'text-error' : 'text-accent'
  const statusColor = campaign.active ? 'text-primary' : 'text-error'
  const statusText = campaign.active ? 'Active' : 'Ended'

  const CLUSTER_NAME = process.env.CLUSTER_NAME || 'custom'

  return (
    <div className="md:col-span-2">
      <h2 className="text-2xl font-bold text-neutral mb-4">
        About this Campaign
      </h2>
      <p className="text-neutral leading-relaxed">{campaign?.description}</p>

      {/* Funding Progress */}
      <div className="mt-6">
        <h3 className="text-lg font-bold text-neutral mb-2 flex items-center gap-2">
          <FaCoins className="text-primary" />
          Funding Progress
        </h3>
        <div className="w-full bg-neutral rounded-lg h-4">
          <div
            className="bg-primary h-4 rounded-lg"
            style={{
              width: `${(campaign?.amountRaised / campaign?.goal) * 100}%`,
            }}
          />
        </div>
        <p className="mt-2 text-neutral">
          {campaign?.amountRaised.toLocaleString()} SOL raised of{' '}
          {campaign?.goal.toLocaleString()} SOL
        </p>
      </div>

      {/* Campaign Status */}
      <div className="mt-6 grid grid-cols-2 gap-6 border-b pb-6">
        <div>
          <h3 className="text-lg font-bold text-neutral mb-2 flex items-center gap-2">
            <FaBell className={`text-xl ${statusColor}`} />
            Status
          </h3>
          <p className={`${statusColor} text-lg font-semibold`}>{statusText}</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-neutral mb-2 flex items-center gap-2">
            <FaBell className={`text-xl ${goalReachedColor}`} />
            Campaign Goal
          </h3>
          <p className={`${goalReachedColor} text-lg font-semibold`}>
            {goalReachedText}
          </p>
        </div>
      </div>

      {/* Donations and Withdrawals */}
      <div className="mt-6 grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold text-neutral mb-2 flex items-center gap-2">
            <FaDollarSign className="text-secondary" />
            Donations
          </h3>
          <p className="text-neutral">
            {campaign.donors.toLocaleString()} donations
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-neutral mb-2 flex items-center gap-2">
            <FaCoins className="text-accent" />
            Withdrawals
          </h3>
          <p className="text-neutral">
            {campaign.withdrawals.toLocaleString()} withdrawals
          </p>
        </div>
      </div>

      {/* Creator Info */}
      <div className="mt-8 grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold text-neutral mb-2 flex items-center gap-2">
            <FaUserCircle className="text-secondary" />
            Created by
          </h3>
          <div className="flex items-center space-x-4">
            <p className="text-neutral font-semibold">
              <Link
                href={`https://explorer.solana.com/address/${campaign?.creator}?cluster=${CLUSTER_NAME}`}
                target="_blank"
                className="text-secondary hover:underline"
              >
                {truncateAddress(campaign?.creator)}
              </Link>
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-neutral mb-2 flex items-center gap-2">
            <FaRegCalendarAlt className="text-accent" />
            Created At
          </h3>
          <div className="flex items-center space-x-4">
            <p className="text-neutral font-semibold">
              {new Date(campaign.timestamp).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetails
