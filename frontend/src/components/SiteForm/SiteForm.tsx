import { ApiError, apiFetch } from '../../api/apiFetch';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import type { Site } from './Site';
import { useNavigate } from 'react-router-dom';
import { useState, type SubmitEvent } from 'react';

const placeholderExtractor = `function extract(req, res) {
  let $ = cheerio.load(res.body);
  return [{
    name: $('title').text(),
    url: req.url,
    description: $('meta[name="description"]').attr('content'))
  }]
}`;

const placeholderResolver = `function pageResolver(request, response) {
  let $=... var links = [];
  $("a").each(function () {
    links.push(this.href); 
  });
  return links;
}`;


const SiteForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [depth, setDepth] = useState('');
  const [frequency, setFrequency] = useState('');
  const [extractor, setExtractor] = useState('');
  const [resolver, setResolver] = useState<string | undefined>(undefined);

  const submitForm = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: Site = {
      userId: '6ab059bdafbad0ade39c84d1', // harcodeado por ahora
      name: name,
      url: url,
      depth: Number(depth),
      frequencyHours: Number(frequency),
      extractor: extractor,
      resolver: resolver,
    }

    try {
      const data = await apiFetch('/sites', 'POST', payload);
      if (data) {
        navigate('/');
      } else {
        throw new ApiError(500, 'Error inesperado');
      }
    } catch (error: ApiError | any) {
      throw new ApiError(error.code, error.message);
    }
  }

  return (
    <Form onSubmit={submitForm}>
      <h1> Registro de sitio </h1>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nombre </Form.Label>
            <Form.Control type="text" required placeholder="Wikipedia" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>URL</Form.Label>
            <Form.Control type="url" required placeholder="https://www.wikipedia.com" value={url} onChange={(e) => setUrl(e.target.value)} />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Nivel de profundidad </Form.Label>
            <Form.Control type="number" required placeholder="5" min={1} value={depth} onChange={(e) => setDepth(e.target.value)} />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Frecuencia </Form.Label>
            <Form.Select value={frequency} required onChange={(e) => setFrequency(e.target.value)}>
              <option value="" disabled>Seleccionar frecuencia</option>
              <option value="12"> Cada 12 horas </option>
              <option value="24">Cada 24 horas </option>
              <option value="48">Cada 48 horas </option>
              <option value="72">Cada 72 horas </option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3" controlId="siteExtractor">
            <Form.Label>Document extractor</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              spellCheck={false}
              style={{ fontFamily: 'monospace' }}
              placeholder={placeholderExtractor} value={extractor} onChange={(e) => setExtractor(e.target.value)} required
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3" controlId="siteResolver">
            <Form.Label>Page resolver</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              spellCheck={false}
              style={{ fontFamily: 'monospace' }}
              placeholder={placeholderResolver} value={resolver} onChange={(e) => setResolver(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col xs={12}>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="outline-secondary" type="button" onClick={() => navigate('/')}>Cancelar</Button>
            <Button variant="primary" type="submit" >Guardar</Button>
          </div>

        </Col>

      </Row>
    </Form>
  );
}

export default SiteForm;