import { useMemo } from 'react'

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg border">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="heading-lg mt-2">{value}</div>
    </div>
  )
}

export default function Analytics() {
  // sample derived stats
  const stats = useMemo(
    () => [
      { title: 'Total Bookings', value: '1,234' },
      { title: 'Revenue (30d)', value: '$45,200' },
      { title: 'Conversion Rate', value: '6.2%' },
      { title: 'Active Users', value: '3,120' },
    ],
    [],
  )

  return (
    <section>
      <h3 className="heading-md mb-4">Analytics</h3>
      <p className="body-sm text-gray-600 mb-6">Simple analytics overview — uses mock data and derived metrics.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.title} title={s.title} value={s.value} />
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-700">Interactive charts and real-time graphs can be added here (placeholder).</p>
      </div>
    </section>
  )
}
