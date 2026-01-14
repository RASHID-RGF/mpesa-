import { useState } from 'react'

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  return (
    <section>
      <h3 className="heading-md">Settings</h3>
      <p className="body-sm text-gray-600 mb-4">Application-level settings (local demo toggles).</p>

      <div className="space-y-4">
        <label className="flex items-center justify-between bg-white p-3 rounded border">
          <div>
            <div className="font-medium">Email Notifications</div>
            <div className="text-sm text-gray-500">Receive notifications for new bookings and messages</div>
          </div>
          <input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />
        </label>

        <label className="flex items-center justify-between bg-white p-3 rounded border">
          <div>
            <div className="font-medium">Maintenance Mode</div>
            <div className="text-sm text-gray-500">Enable to hide booking flows from public (demo)</div>
          </div>
          <input type="checkbox" checked={maintenanceMode} onChange={(e) => setMaintenanceMode(e.target.checked)} />
        </label>
      </div>
    </section>
  )
}
