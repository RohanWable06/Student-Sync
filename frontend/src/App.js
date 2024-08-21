
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import '@fortawesome/fontawesome-free/css/all.min.css';

import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import ContactUs from './Components/ContactUs';
import AboutUs from './Components/AboutUs';
import StudentHome from "./Pages/Student/Home";
import FacultyHome from "./Pages/Faculty/Home"
import AdminHome from "./Pages/Admin/Home"


function App() {
  return (
    <div>
      <Routes>

        <Route path='/' element={<Login />}></Route>
        <Route path='contactus' element={<ContactUs />}></Route>
        <Route path='aboutus' element={<AboutUs />}></Route>
        <Route path="/students" element={<StudentHome />} />
        <Route path="/faculty" element={<FacultyHome />} />
        <Route path='/Admin' element={<AdminHome />}></Route>



      </Routes>

    </div>
  );
}

export default App;
