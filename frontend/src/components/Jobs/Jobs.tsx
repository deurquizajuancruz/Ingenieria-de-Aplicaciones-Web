import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { apiFetch } from '../../api/apiFetch';
import { useEffect, useState } from 'react';
import type { Job } from './Job';
import Badge from 'react-bootstrap/esm/Badge';
import Table from 'react-bootstrap/esm/Table';

const convertDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-AR')
}

const Jobs = () => {
    const [searchParams] = useSearchParams();
    const userId = '6ab059bdafbad0ade39c84d1';
    const siteId = searchParams.get('siteId') ?? undefined;
    const [jobs, setJobs] = useState<Job[]>([]);

    if (!userId) {
        return <Navigate to="/" replace />;
    }

    const fetchJobs = async () => {
        const jobFilter: string = siteId ? `&siteId=${siteId}` : '';
        try {
            const data = await apiFetch<Job[]>(`/jobs?userId=${userId}${jobFilter}`);
            setJobs(data);
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchJobs()
    }, []);

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h1 className="mb-0">Ejecuciones de los Jobs</h1>
            </div>

            <Table hover responsive className="align-middle">
                <thead className="table-light">
                    <tr>
                        <th scope="col"> Sitio </th>
                        <th scope="col"> Fecha </th>
                        <th scope="col"> Páginas </th>
                        <th scope="col"> Documentos </th>
                        <th scope="col"> Estado </th>
                        <th scope="col"> Duración </th>
                    </tr>
                </thead>
                <tbody>

                    {jobs.length === 0 && (
                        <tr>
                            <td colSpan={7} className="text-center text-muted">No se encontraron jobs.</td>
                        </tr>
                    )}

                    {jobs.map((job) => {
                        return (
                            <tr key={job._id}>
                                <th scope="row">{job.siteId.name}</th>
                                <td>
                                    {convertDate(job.createdAt)}
                                </td>
                                <td>{job.numberPages}</td>
                                <td>{job.amountDocuments}</td>
                                <td>
                                    <Badge bg={job.state === 'in progress' ? 'primary' :
                                        job.state === 'completed' ? 'success' : 'danger'}>
                                        {job.state === 'in progress' ? 'En progreso' :
                                            job.state === 'completed' ? 'Completado' : 'Fallido'}
                                    </Badge>
                                </td>
                                <td>
                                    {Math.floor(Math.random() * 50)}m
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </Table>


        </div>
    )
}

export default Jobs;