import './assets/libs/boxicons-2.1.1/css/boxicons.min.css'
import './scss/App.scss'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Blank from './pages/Blank'
import Locations from './pages/Locations'
import Dashboard from './pages/Dashboard'
import MainLayout from './layout/MainLayout'
import Login from './pages/Login'
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Media from './pages/Media'

function App() {
    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="locations" element={<Locations />} />
                    <Route path="villas" element={<Blank />} />
                    <Route path="medialibrary" element={<Media />} />
                    <Route path="bookings" element={<Blank />} />
                    <Route path="blogs" element={<Blank />} />
                    <Route path="customers" element={<Blank />} />
                    <Route path="settings" element={<Blank />} />
                    <Route path="stats" element={<Blank />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
