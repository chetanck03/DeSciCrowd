import { getCluster, truncateAddress } from '@/utils/helper'
import { Transaction } from '@/utils/interfaces'
import Link from 'next/link'
import React from 'react'
import { FaMoneyBillWave } from 'react-icons/fa'

const DonationsList: React.FC<{ donations: Transaction[] }> = ({
  donations,
}) => {
  const CLUSTER: string = process.env.NEXT_PUBLIC_CLUSTER || 'localhost'
  const CLUSTER_NAME = getCluster(CLUSTER)

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-neutral mb-4 flex items-center gap-2">
        <FaMoneyBillWave className="text-primary" />
        Donation History
      </h2>
      {donations.length > 0 ? (
        <ul className="bg-white rounded-lg shadow-lg divide-y divide-gray-200">
          {donations.map((donation, index) => (
            <li
              key={index}
              className="px-4 py-2 flex justify-between items-center"
            >
              <p className="text-neutral flex justify-start items-center space-x-1">
                <strong>
                  <Link
                    href={`https://explorer.solana.com/address/${donation.owner}?cluster=${CLUSTER_NAME}`}
                    target="_blank"
                    className="text-secondary hover:underline"
                  >
                    {truncateAddress(donation.owner)}
                  </Link>
                </strong>{' '}
                <small className="text-primary">
                  {donation.amount.toLocaleString()} SOL
                </small>
              </p>

              <p className="text-neutral text-sm">
                {new Date(donation.timestamp).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-neutral">No donations yet.</p>
      )}
    </div>
  )
}

export default DonationsList
