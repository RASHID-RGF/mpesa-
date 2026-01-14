import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DestinationDetailPage from './pages/DestinationDetailPage'
import BookingsPage from './pages/BookingsPage'
import DashboardLayout from './pages/dashboard/DashboardLayout'
import Analytics from './pages/dashboard/Analytics'
import Vouchers from './pages/dashboard/Vouchers'
import Location from './pages/dashboard/Location'
import Settings from './pages/dashboard/Settings'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destination/:id" element={<DestinationDetailPage />} />
        <Route path="/bookings" element={<BookingsPage />} />

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Analytics />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="vouchers" element={<Vouchers />} />
          <Route path="location" element={<Location />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App