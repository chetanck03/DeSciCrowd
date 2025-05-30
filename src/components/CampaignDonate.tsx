import React, { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { FaDollarSign, FaDonate, FaEdit, FaTrashAlt } from 'react-icons/fa'
import { Campaign } from '@/utils/interfaces'
import { toast } from 'react-toastify'
import { useWallet } from '@solana/wallet-adapter-react'
import {
  donateToCampaign,
  fetchAllDonations,
  fetchCampaignDetails,
  getProvider,
} from '@/services/blockchain'
import { globalActions } from '@/store/globalSlices'
import { useDispatch } from 'react-redux'

const CampaignDonate: React.FC<{ campaign: Campaign; pda: string }> = ({
  campaign,
  pda,
}) => {
  const { publicKey, sendTransaction, signTransaction } = useWallet()
  const [amount, setAmount] = useState('')
  const { setWithdrawModal, setDelModal } = globalActions
  const dispatch = useDispatch()

  const program = useMemo(
    () => getProvider(publicKey, signTransaction, sendTransaction),
    [publicKey, signTransaction, sendTransaction]
  )

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Number(amount) + campaign.amountRaised > campaign.goal) {
      return toast.warn('Amount exceeds campaign goal')
    }

    if (!publicKey) return toast.warn('Please connect wallet')

    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        try {
          const { title, description, imageUrl, goal } = campaign
          const tx: any = await donateToCampaign(
            program!,
            publicKey!,
            pda!,
            Number(amount)
          )

          setAmount('')
          await fetchCampaignDetails(program!, pda)
          await fetchAllDonations(program!, pda)

          console.log(tx)
          resolve(tx)
        } catch (error) {
          reject(error)
        }
      }),
      {
        pending: 'Approve transaction...',
        success: 'Transaction successful 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold text-neutral mb-4 flex items-center gap-2">
          <FaDonate className="text-primary" />
          Donate
        </h2>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="donationAmount"
            className="block text-neutral font-semibold mb-2"
          >
            Amount (SOL)
          </label>
          <input
            type="text"
            name="donationAmount"
            placeholder={`1 SOL (${(
              campaign.goal - campaign.amountRaised
            ).toFixed(2)} SOL remaining)`}
            value={amount}
            onChange={(e) => {
              const value = e.target.value
              if (/^\d*\.?\d{0,2}$/.test(value)) {
                setAmount(value)
              }
            }}
            className="w-full input input-bordered input-primary"
            min="1"
            required
          />
          <button
            type="submit"
            disabled={
              !amount ||
              !campaign.active ||
              campaign.amountRaised >= campaign.goal
            }
            className={`mt-4 w-full bg-blue-600 hover:bg-blue-700  text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center  ${!amount || !campaign.active || campaign.amountRaised >= campaign.goal ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <FaDonate className=" mr-2" />
            Donate Now
          </button>
        </form>

        {publicKey && campaign.creator === publicKey.toBase58() && (
          <div className="mt-6  flex flex-wrap gap-2 md:flex-nowrap md:gap-2">
            <Link
              href={`/campaign/edit/${pda}`}
              className="btn btn-outline btn-secondary flex items-center justify-center md:rounded-l-lg"
            >
              <FaEdit className="" />
              Edit
            </Link>
            {campaign.active && (
              <button
                type="button"
                className="btn btn-error  flex items-center justify-center"
                onClick={() => dispatch(setDelModal('scale-100'))}
              >
                <FaTrashAlt className="" />
                Delete
              </button>
            )}

            <button
              className="btn btn-outline btn-secondary flex items-center justify-center md:rounded-r-lg"
              onClick={() => dispatch(setWithdrawModal('scale-100'))}
            >
              <FaDollarSign className="" />
              Payout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CampaignDonate
