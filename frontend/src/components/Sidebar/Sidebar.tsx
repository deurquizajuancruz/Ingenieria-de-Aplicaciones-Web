import { NavLink, Outlet } from 'react-router-dom';
import './Sidebar.css';

const links = [
    { to: '/form', label: 'Registrar sitio' },
    { to: '/sites', label: 'Mis sitios' },
    { to: '/jobs', label: 'Jobs' },
    { to: '/search', label: 'Búsqueda' },
];

const Sidebar = () => {
    return (
        <div className="d-flex flex-grow-1">
            <aside className="sidebar d-flex flex-column flex-shrink-0 bg-body-secondary py-3">
                {links.map(({ to, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
                    >
                        {label}
                    </NavLink>
                ))}
            </aside>
            <main className="flex-grow-1 p-4">
                <Outlet />
            </main>
        </div>
    );
};

export default Sidebar;
