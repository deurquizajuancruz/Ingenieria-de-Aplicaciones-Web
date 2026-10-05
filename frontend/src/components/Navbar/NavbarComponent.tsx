import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

interface NavbarProps {
    logged: boolean;
}


const NavbarComponent = ({ logged }: NavbarProps) => {
    return (
        <Navbar expand="lg" className="bg-body-secondary">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    <i className="bi bi-house-door-fill fs-3 me-2"></i>Search Service
                </Navbar.Brand>
                {logged &&
                    <NavDropdown title={<i className="bi bi-person-fill fs-3"></i>} align="end" id='navbar-dropdown'>
                        <NavDropdown.Item href=""> Perfil </NavDropdown.Item>
                        <NavDropdown.Item href=""> Cerrar sesión </NavDropdown.Item>
                    </NavDropdown>
                }
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;