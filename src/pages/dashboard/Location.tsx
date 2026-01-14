import { useState } from 'react'

const available = ['Nairobi', 'Mombasa', 'Narok', 'Lamu', 'Nakuru', 'Kilifi']

export default function Location() {
  const [selected, setSelected] = useState<string>('Nairobi')

  return (
    <section>
      <h3 className="heading-md">Location</h3>
      <p className="body-sm text-gray-600 mb-4">Set or view current active location for dashboard-specific data.</p>

      <div className="flex items-center gap-4">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          {available.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <div className="p-3 bg-gray-50 rounded">
          <div className="text-sm text-gray-500">Active Location</div>
          <div className="heading-md">{selected}</div>
        </div>
      </div>
    </section>
  )
}
