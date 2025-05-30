import {
  fetchProgramState,
  getProvider,
  updatePlatform,
} from '@/services/blockchain'
import { ProgramState } from '@/utils/interfaces'
import { useWallet } from '@solana/wallet-adapter-react'
import React, { useMemo, useState } from 'react'
import { FaDonate } from 'react-icons/fa'
import { toast } from 'react-toastify'

const PlatformSettings: React.FC<{ programState: ProgramState }> = ({
  programState,
}) => {
  const [percent, setPercent] = useState('')
  const { publicKey, sendTransaction, signTransaction } = useWallet()

  const program = useMemo(
    () => getProvider(publicKey, signTransaction, sendTransaction),
    [publicKey, signTransaction, sendTransaction]
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!percent) return
    if (!publicKey) return toast.warn('Please connect wallet')

    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        try {
          const tx: any = await updatePlatform(
            program!,
            publicKey!,
            Number(percent)
          )

          setPercent('')
          await fetchProgramState(program!)

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
          Update Service Fee
        </h2>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="donationAmount"
            className="block text-neutral font-semibold mb-2"
          >
            Percentage range is (1 - 15%)
          </label>
          <input
            type="text"
            name="percent"
            value={percent}
            onChange={(e) => {
              const value = e.target.value
              if (/^([1-9]|1[0-5])?$/.test(value)) {
                setPercent(value)
              }
            }}
            placeholder={`Current Fee (${programState.platformFee}%)`}
            className="w-full input input-bordered input-primary"
            required
            min={1}
            max={15}
          />
          <button
            type="submit"
            className={`mt-4 w-full btn btn-primary ${
              !percent ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Update Fee
          </button>
        </form>
      </div>
    </div>
  )
}

export default PlatformSettings
