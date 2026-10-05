import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import type { ReactElement } from 'react';

interface CardProps {
    title: string;
    text: string;
    icon: ReactElement;
    redirectPath: string;
}

const CardComponent = ({ title, text, icon, redirectPath }: CardProps) => {
    return (
        <Card className="h-100">
            <Card.Body className="d-flex flex-column">
                <div className="text-center mb-3">{icon}</div>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {text}
                </Card.Text>
                <div className="mt-auto text-center">
                    <Button className='w-100' variant='primary' href={redirectPath}> Ir </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default CardComponent;