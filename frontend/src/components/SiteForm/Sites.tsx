import { apiFetch } from '../../api/apiFetch';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import type { Site } from './Site';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface SiteResponse extends Site {
    _id: string,
    active: boolean,
    createdAt: string,
    updatedAt: string,
    __v: number
}

const convertDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-AR')
}

const Sites = () => {
    const userId: string = '6ab059bdafbad0ade39c84d1'; // hardcodeado por ahora
    const [sites, setSites] = useState<SiteResponse[]>([]);

    const fetchUserSites = async () => {
        try {
            const data = await apiFetch<SiteResponse[]>(`/sites?userId=${userId}`);
            setSites(data);
        } catch (error) {

        }
    };

    useEffect(() => {
        fetchUserSites()
    }, []);

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h1 className="mb-0">Mis sitios</h1>
                <Link to="/form" className="btn btn-primary">Registrar sitio</Link>
            </div>

            <Table hover responsive className="align-middle">
                <thead className="table-light">
                    <tr>
                        <th scope="col"> Nombre </th>
                        <th scope="col"> URL</th>
                        <th scope="col"> Profundidad</th>
                        <th scope="col"> Frecuencia </th>
                        <th scope="col"> Activo </th>
                        <th scope="col"> Fecha de Creación </th>
                        <th scope="col"> Jobs </th>
                        <th scope="col"> Acciones </th>
                    </tr>
                </thead>
                <tbody>

                    {sites.length === 0 && (
                        <tr>
                            <td colSpan={8} className="text-center text-muted">No se encontraron sitios</td>
                        </tr>
                    )}

                    {sites.map((site) => {
                        return (
                            <tr key={site._id}>
                                <th scope="row">{site.name}</th>
                                <td>
                                    <a href={site.url} target="_blank" rel="noopener noreferrer">{site.url}</a>
                                </td>
                                <td>{site.depth}</td>
                                <td>Cada {site.frequencyHours} horas</td>
                                <td>
                                    <Badge bg={site.active ? 'success' : 'danger'}>
                                        {site.active ? 'Activo' : 'Inactivo'}
                                    </Badge>
                                </td>
                                <td>{convertDate(site.createdAt)}</td>
                                <td>
                                    <Link to={`/jobs?siteId=${site._id}`} className="btn btn-primary">Ver jobs</Link>
                                </td>
                                <td>
                                    <Button variant='success' size='sm'>
                                        <i className="bi bi-pencil-square me-2"></i>
                                        Editar
                                    </Button>
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default Sites;