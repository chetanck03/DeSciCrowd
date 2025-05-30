'use client'

import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { campaigns } from '@/data'
import Link from 'next/link'
import { RootState } from '@/utils/interfaces'
import { useSelector } from 'react-redux'
import {
  fetchCampaignDetails,
  getProvider,
  getProviderReadonly,
  updateCampaign,
} from '@/services/blockchain'
import { toast } from 'react-toastify'
import { useWallet } from '@solana/wallet-adapter-react'

export default function Page() {
  const { cid } = useParams()
  const programReadonly = useMemo(() => getProviderReadonly(), [])

  const { publicKey, sendTransaction, signTransaction } = useWallet()
  const { campaign } = useSelector((states: RootState) => states.globalStates)

  const program = useMemo(
    () => getProvider(publicKey, signTransaction, sendTransaction),
    [publicKey, signTransaction, sendTransaction]
  )

  // Local form state
  const [form, setForm] = useState({
    title: campaign?.title || '',
    description: campaign?.description || '',
    image_url: campaign?.imageUrl || '',
    goal: campaign?.goal || '',
  })

  useEffect(() => {
    if (cid) {
      const fetchDetails = async () => {
        const campaignData = await fetchCampaignDetails(
          programReadonly!,
          cid as string
        )
        setForm({
          title: campaignData.title,
          description: campaignData.description,
          image_url: campaignData.imageUrl,
          goal: campaignData.goal,
        });
      }
      fetchDetails()
    }
  }, [programReadonly, cid]) // Added programReadonly and cid to dependency array

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!publicKey) return toast.warn('Please connect wallet')

    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        try {
          const { title, description, image_url, goal } = form
          const tx: any = await updateCampaign(
            program!,
            publicKey!,
            cid as string,
            title,
            description,
            image_url,
            Number(goal)
          )

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

  // Fallback if campaign not found
  if (!campaign) return <h4>Campaign not found</h4>

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-neutral mb-6">Update Campaign</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="What's the grand title?"
          maxLength={64}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full input input-bordered input-primary"
          required
        />
        <input
          type="url"
          placeholder="Paste that fancy image URL here!"
          maxLength={256}
          value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          className="w-full input input-bordered input-primary"
          required
        />
        <input
          type="text"
          placeholder="How many SOLs for your dream?"
          value={form.goal}
          onChange={(e) => {
            const value = e.target.value
            if (/^\d*\.?\d{0,2}$/.test(value)) {
              setForm({ ...form, goal: value })
            }
          }}
          className="w-full input input-bordered input-primary"
          required
        />
        <textarea
          placeholder="Tell us the epic tale of your project..."
          maxLength={512}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full textarea textarea-bordered textarea-primary"
          required
        />

        <div className="mt-4 space-x-4 flex justify-start items-center">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Update Now
          </button>

          <Link
            href={`/campaign/${cid}`}
            className="btn btn-outline btn-neutral"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  )
}
