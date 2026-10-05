import { Link, Navigate, useLocation } from "react-router-dom";

const Success = () => {
    const location = useLocation();
    const name = location.state;

    if (!name) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
            <i className="bi bi-check-circle-fill" style={{ fontSize: '6rem', color: 'green' }}></i>
            <h1> ¡Registro de sitio exitoso! </h1>
            <p className="text-center">
                {name} se registró correctamente. La primera ejecución del job se ejecutará a continuación.
                Podés ver su estado en <Link to="/jobs">Jobs</Link>
            </p>
        </div>
    );
}

export default Success;
