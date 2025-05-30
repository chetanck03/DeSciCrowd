'use client'

import { createCampaign, getProvider } from '@/services/blockchain'
import { useWallet } from '@solana/wallet-adapter-react'
import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'

export default function Page() {
  const { publicKey, sendTransaction, signTransaction } = useWallet()

  const program = useMemo(
    () => getProvider(publicKey, signTransaction, sendTransaction),
    [publicKey, signTransaction, sendTransaction]
  )
  // Local form state
  const [form, setForm] = useState({
    title: '',
    description: '',
    image_url: '',
    goal: '',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!publicKey) return toast.warn('Please connect wallet')

    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        try {
          const { title, description, image_url, goal } = form
          const tx: any = await createCampaign(
            program!,
            publicKey!,
            title,
            description,
            image_url,
            Number(goal)
          )

          setForm({
            title: '',
            description: '',
            image_url: '',
            goal: '',
          })

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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-neutral mb-6">Create Campaign</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title (max 64 characters)"
          maxLength={64}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="input input-bordered input-primary w-full"
          required
        />
        <input
          type="url"
          placeholder="Link to a relevant image (max 256 characters)"
          maxLength={256}
          value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          className="input input-bordered input-primary w-full"
          required
        />
        <input
          type="text"
          placeholder="Set your fundraising goal in SOL (e.g., 100)"
          value={form.goal}
          onChange={(e) => {
            const value = e.target.value
            if (/^\d*\.?\d{0,2}$/.test(value)) {
              setForm({ ...form, goal: value })
            }
          }}
          className="input input-bordered input-primary w-full"
          required
        />
        <textarea
          placeholder="Describe your research project and its impact (max 512 characters)"
          maxLength={512}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full textarea textarea-bordered textarea-primary"
          required
        />

        <div className="mt-4 space-x-4 flex justify-start items-center">
          <button type="submit" className="btn btn-primary">
            Create Now
          </button>
        </div>
      </form>
    </div>
  )
}
