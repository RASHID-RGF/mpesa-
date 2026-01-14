import { useState } from 'react'

type Voucher = { id: string; code: string; discount: string; used: boolean }

const initial: Voucher[] = [
  { id: 'v1', code: 'WELCOME10', discount: '10%', used: false },
  { id: 'v2', code: 'SUMMER25', discount: '25%', used: false },
  { id: 'v3', code: 'LOYAL5', discount: '5%', used: true },
]

export default function Vouchers() {
  const [vouchers, setVouchers] = useState<Voucher[]>(initial)

  function toggleUsed(id: string) {
    setVouchers((prev) => prev.map((v) => (v.id === id ? { ...v, used: !v.used } : v)))
  }

  function addVoucher() {
    const code = `NEW${Math.floor(Math.random() * 900 + 100)}`
    setVouchers((prev) => [{ id: String(Date.now()), code, discount: '15%', used: false }, ...prev])
  }

  return (
    <section>
      <div className="flex items-center justify-between">
        <h3 className="heading-md">Vouchers</h3>
        <button onClick={addVoucher} className="px-4 py-2 bg-gray-900 text-white rounded">
          Create Voucher
        </button>
      </div>

      <p className="body-sm text-gray-600 my-4">Manage promotional vouchers. Toggle used state or add a new voucher (local-only).</p>

      <div className="space-y-3">
        {vouchers.map((v) => (
          <div key={v.id} className="p-3 bg-white rounded-lg border flex items-center justify-between">
            <div>
              <div className="font-medium">{v.code}</div>
              <div className="text-sm text-gray-500">{v.discount}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`text-sm ${v.used ? 'text-red-600' : 'text-green-600'}`}>{v.used ? 'Used' : 'Active'}</div>
              <button onClick={() => toggleUsed(v.id)} className="px-3 py-1 border rounded">
                Toggle
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
