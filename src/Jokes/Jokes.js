import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Modal, Button, Row, Col } from "react-bootstrap";
import Joke from "./Joke";
// import styles from "./Movies.module.css";

export default function Jokes() {
  const [randomjokes, setRandomjokes] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchOneJoke = () => {
    const tellDadJokesUrl = "https://icanhazdadjoke.com/";
    axios
      .get(tellDadJokesUrl, {
        headers: { Accept: "application/json" },
      })
      .then((response) => {
        // setRandomjokes((msgs) => msgs.concat(response.data));
        setRandomjokes((prev) => {
          //   return [...prev, response.data];
          let find = prev.find((item) => item.id === response.data.id);
          return find ? prev : [...prev, response.data];
        });
      })
      .catch((error) => {
        console.log(error);
        handleShow();
      });
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const fetchMultipleJokes = async (num) => {
    setRandomjokes((prev) => []);
    for (let i = 0; i < num; i++) {
      fetchOneJoke();
      await sleep(100);
    }
  };

  useEffect(() => {
    fetchMultipleJokes(20);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRreshNewJokes = () => {
    fetchMultipleJokes(20);
  };
  return (
    <Container className="my-4">
      <Container>
        <Row>
          <Col>
            <h1 className="mb-4">Jokes</h1>
          </Col>
          <Col>
            <Button className="btn-primary" onClick={handleRreshNewJokes}>
              Refresh for new jokes
            </Button>
          </Col>
        </Row>
      </Container>

      <Container>
        {/* <h1>{randomjokes.length}</h1> */}
        {randomjokes.map((item, index) => (
          <Joke key={index} jokecontent={item.joke} />
        ))}
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>something wrong</Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
