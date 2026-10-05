import HomePage from "./components/HomePage/HomePage.tsx";
import Jobs from "./components/Jobs/Jobs.tsx";
import NavbarComponent from "./components/Navbar/NavbarComponent.tsx";
import { Routes, Route } from 'react-router-dom';
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import SiteForm from "./components/SiteForm/SiteForm.tsx";
import Sites from "./components/SiteForm/Sites.tsx";
import Success from "./components/SiteForm/Success.tsx";
import { useState } from "react";

const App = () => {
  const [logged, setLogged] = useState(true);

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent logged={logged} />
      <Routes >
        <Route path="/" element={<HomePage />} />
        <Route path="/success" element={<Success />} />
        <Route element={<Sidebar />}>
          <Route path="/form" element={<SiteForm />} />
          <Route path="/sites" element={<Sites />} />
          <Route path="/jobs" element={<Jobs />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
