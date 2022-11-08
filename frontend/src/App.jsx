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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//pages
import Media from './pages/Media'
import Attributes, {AttribbutesStats} from './pages/Attribbutes'
import PropType from './pages/Attribbutes/PropType'
import Amenities from './pages/Attribbutes/Amenities'
import Experiences from './pages/Attribbutes/Experience'
import Property from './pages/Property'
import AddProperty from './pages/Property/Add'
import UpdateProperty from './pages/Property/Update'
import ListProperty from './pages/Property/List'
import Preview from './pages/Property/Preview'
import CalendarView from './pages/Property/Calendar'
import Rooms from './pages/Property/Rooms'
import NewProperty from './pages/Property/New'


function App() {
    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="locations" element={<Locations />} />
                    <Route path="attributes" element={<Attributes />}>
                        <Route index element={<AttribbutesStats/>} />
                        <Route path="property-type" element={<PropType />} />
                        <Route path="experiences" element={<Experiences />} />
                        <Route path="amenities" element={<Amenities />} />
                    </Route>
                    <Route path="properties" element={<Property />}>
                        <Route index element={<ListProperty />} />
                        <Route path="add" element={<AddProperty />} />
                        <Route path="update/:propertyId" element={<UpdateProperty />} />
                        <Route path="preview/:propertyId" element={<Preview />} />
                        <Route path="calendar/:propertyId" element={<CalendarView />} />
                        <Route path="manage/:propertyId" element={<NewProperty />} />
                        <Route path=":propertyId/rooms" element={<Rooms />} />
                    </Route>
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
