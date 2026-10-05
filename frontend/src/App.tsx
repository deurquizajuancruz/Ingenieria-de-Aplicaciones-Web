import HomePage from "./components/HomePage/HomePage.tsx";
import NavbarComponent from "./components/Navbar/NavbarComponent.tsx";
import { Routes, Route } from 'react-router-dom';
import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import SiteForm from "./components/SiteForm/SiteForm.tsx";


const App = () => {
  const [logged, setLogged] = useState(true);

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent logged={logged} />
      <Routes >
        <Route path="/" element={<HomePage />} />
        <Route element={<Sidebar />}>
          <Route path="/form" element={<SiteForm />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
