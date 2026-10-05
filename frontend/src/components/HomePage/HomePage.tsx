import CardComponent from "./CardComponent";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const HomePage = () => {
    return (

        <Container className="d-flex align-items-center" style={{ minHeight: '80vh' }}>
            <Row className="g-3 justify-content-center w-100">
                <Col xs={12} sm={6} lg={3}>
                    <CardComponent
                        title="Registrar un sitio"
                        text="Registrá un sitio para que se ejecuten jobs con una frecuencia determinada"
                        icon={<i className="bi bi-plus-circle" style={{ fontSize: '6rem' }}></i>}
                        redirectPath="/form" />
                </Col>
                <Col xs={12} sm={6} lg={3}>
                    <CardComponent
                        title="Mis Sitios"
                        text="Consultá los sitios que registraste para ejecutar jobs"
                        icon={<i className="bi bi-globe" style={{ fontSize: '6rem' }}></i>}
                        redirectPath="" />
                </Col>
                <Col xs={12} sm={6} lg={3}>
                    <CardComponent
                        title="Mis Jobs"
                        text="Consultá tus jobs y sus documentos"
                        icon={<i className="bi bi-list-task" style={{ fontSize: '6rem' }}></i>}
                        redirectPath="" />
                </Col>
                <Col xs={12} sm={6} lg={3}>
                    <CardComponent
                        title="Búsqueda"
                        text="Buscá información recopilada por tus Jobs"
                        icon={<i className="bi bi-search" style={{ fontSize: '6rem' }}></i>}
                        redirectPath="" />
                </Col>
            </Row>
        </Container>

    )
}

export default HomePage;