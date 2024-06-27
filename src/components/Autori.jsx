import {useEffect, useState} from 'react'

import { Card, Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';

export default function Autori() {


  
  


    // Stato per memorizzare la lista degli autori
    const [autori, setAutori] = useState([]);
    // Stato per gestire i dati del nuovo autore da creare
    const  [nuovoAutore, setNuovoAutore] = useState({
       nome:"", cognome:"", email:"",datadinascita:"",avatar:""
    }); 
    // Stato per gestire l'utente in fase di modifica dell'autore
    const [modificaAutore, setModificaAutore] = useState(null);

    const getAutori = () => {
        fetch("http://localhost:5000/authors")
        .then((res) => res.json())
        .then((data) => setAutori(data))
        .catch((err) => console.log("Errore nella richiesta", err));
    }

    // Funzione per creare nuovo autore
    useEffect(() => {
        getAutori();
    }, []);

    // Funzione per creare nuovo autore
    const creaAutore = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/authors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuovoAutore),
        })
        .then((res) => res.json())
        .then((data) => {
            setAutori([...autori, data]);
            setNuovoAutore({
                nome: "",
                cognome: "",
                email: "",
                datadinascita: "",
                avatar: "",
            });
        })
        .catch((err) => console.log("Errore nella creazione", err));
    }
        
        //funzione per l'eliminazione di un autore
        const cancellaAutore = (id) => {
            fetch(`http://localhost:5000/authors/${id}`, {
                method: "DELETE",
            })
            .then((res) => res.json())
            .then(() => {
                setAutori(autori.filter((autore) => autore._id !== id));
            })
            .catch((err) => console.log("Errore nella cancellazione", err));
        }

            //funzione per la modifica di un autore
            const modAutore = (e) => {
                e.preventDefault();
                fetch(`http://localhost:5000/authors/${modificaAutore._id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(modificaAutore),
                })
                .then((res) => res.json())
                .then((data) => {
                    setAutori(autori.map((autore) => (autore._id === data._id ? modificaAutore : autore)));
                    setModificaAutore(null);
                  
                })
                .catch((err) => console.log("Errore nell'aggiornamento", err));
            }


  return (
    <>
    <Container>
        <Row>
            <Col >
    <h2>Crea Nuovo utente</h2>
    <Form onSubmit={creaAutore}>

    <InputGroup className="mb-3 mt-5">
      <Form.Control
        placeholder="Nome"
        aria-label="Nome"
        aria-describedby="basic-addon1"
        type='text' 
        required
        value={nuovoAutore.nome}
        onChange={(e) => setNuovoAutore({...nuovoAutore, nome: e.target.value})}
      />
    </InputGroup>

    <InputGroup className="mb-3">
        <Form.Control
        placeholder="Cognome"
        aria-label="Cognome"
        aria-describedby="basic-addon2"
        type='text'
        required
        value={nuovoAutore.cognome}
        onChange={(e) => setNuovoAutore({...nuovoAutore, cognome: e.target.value})}
      />
    </InputGroup>

    <InputGroup className="mb-3">
       <Form.Control
        placeholder="Email"
        aria-label="Email"
        aria-describedby="basic-addon2"
        type='email'
        required
        value={nuovoAutore.email}
        onChange={(e) => setNuovoAutore({...nuovoAutore, email: e.target.value})}
      />
    </InputGroup>

    <InputGroup className="mb-3">
       <Form.Control
        placeholder="Data di nascita"
        aria-label="Date"
        aria-describedby="basic-addon2"
        type='date'
        required
        value={nuovoAutore.datadinascita}
        onChange={(e) => setNuovoAutore({...nuovoAutore, datadinascita: e.target.value})}
      />
    </InputGroup>

      <InputGroup className="mb-3">
       <Form.Control
        placeholder="Link Avatar"
        aria-label="text"
        aria-describedby="basic-addon2"
        type='text'
        required
        value={nuovoAutore.avatar}
        onChange={(e) => setNuovoAutore({...nuovoAutore, avatar: e.target.value})}
      />
      </InputGroup>
      <Button variant="primary" type="submit"  >
            Crea Nuovo Autore
        </Button>
      </Form>

    </Col>
    </Row>
      <h2 className='p-2 mt-4'>Lista Autori</h2>
    <Row xs={1} sm={2} md={3} lg={4} className='g-4'>
      {autori.map((autore) => (
        <Col key={autore._id}>
          <Card style={{ minHeight: "450px" }} className="pb-2">
            <Card.Img style={{ maxHeight: "220px"}} variant="top" src={autore.avatar} alt={autore.nome + " " + autore.cognome} />
            <Card.Body>
              <Card.Title>{autore.nome} {autore.cognome}</Card.Title>
              <Card.Text>data di nascita: {autore.datadinascita}</Card.Text>
              <Card.Text>Email: {autore.email}</Card.Text>
              
              <Button variant="warning" onClick={() => setModificaAutore(autore)} className='mx-1'> Inizia Modifica</Button>
              <Button variant="danger" onClick={() => cancellaAutore(autore._id)} className='mx-1'>Cancella</Button>
            </Card.Body>
            {/*impostazioni per modificare un autore */}
            {modificaAutore && autore._id === modificaAutore._id && (
                <Form onSubmit={modAutore} >

                <InputGroup className="mb-3 mt-5">
                  <Form.Control
                    placeholder="Nome"
                    aria-label="Nome"
                    aria-describedby="basic-addon1"
                    type='text' 
                    required
                    value={modificaAutore.nome}
                    onChange={(e) => setModificaAutore({...modificaAutore, nome: e.target.value})}
                  />
                </InputGroup>
  
                <InputGroup className="mb-3">
                    <Form.Control
                    placeholder="Cognome"
                    aria-label="Cognome"
                    aria-describedby="basic-addon2"
                    type='text'
                    required
                    value={modificaAutore.cognome}
                    onChange={(e) => setModificaAutore({...modificaAutore, cognome: e.target.value})}
                  />
                </InputGroup>
  
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-addon2"
                    type='email'
                    required
                    value={modificaAutore.email}
                    onChange={(e) => setModificaAutore({...modificaAutore, email: e.target.value})}
                  />
                </InputGroup>
  
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Data di nascita"
                    aria-label="Date"
                    aria-describedby="basic-addon2"
                    type='date'
                    required
                    value={modificaAutore.datadinascita}
                    onChange={(e) => setModificaAutore({...modificaAutore, datadinascita: e.target.value})}
                  />
                </InputGroup>
  
                  <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Link Avatar"
                    aria-label="text"
                    aria-describedby="basic-addon2"
                    type='text'
                    required
                    value={modificaAutore.avatar}
                    onChange={(e) => setModificaAutore({...modificaAutore, avatar: e.target.value})}
                  />
                  </InputGroup>
                  <Button variant="primary" type="submit" size='md' className='ms-3' >
                      Salva Modifica
                  </Button>
                  <Button variant="danger" onClick={() => setModificaAutore(null)} className='mx-1' size='md'>Annulla</Button>
            </Form>

            )}
          </Card>
        </Col>
      ))}
    </Row>
   
  

    </Container>


  </>


  

  );
};
