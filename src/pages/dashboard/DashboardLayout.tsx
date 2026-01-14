import { Link, Outlet, useLocation } from 'react-router-dom'

export default function DashboardLayout() {
  const location = useLocation()

  const links = [
    { to: '/dashboard/analytics', label: 'Analytics' },
    { to: '/dashboard/vouchers', label: 'Vouchers' },
    { to: '/dashboard/location', label: 'Location' },
    { to: '/dashboard/settings', label: 'Settings' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 md:col-span-3 lg:col-span-2 bg-white rounded-2xl p-6 shadow">
            <h2 className="heading-md mb-4">Dashboard</h2>
            <nav className="space-y-2">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`block px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === l.to ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </aside>

          <main className="col-span-12 md:col-span-9 lg:col-span-10">
            <div className="bg-white rounded-2xl p-6 shadow">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
