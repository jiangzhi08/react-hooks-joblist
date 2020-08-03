import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Modal, Button } from "react-bootstrap";
import SingleNews from "./SingleNews";
import styles from "./News.module.css";

export default function News() {
  const [newsdata, setNewsdata] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchNews = (category) => {
    const BASE_URL = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=fe669351939f40d5b385ad6ec93c0df6`;
    axios
      .get(BASE_URL)
      .then((res) => {
        setNewsdata(res.data.articles);
        console.log(res.data.articles);
      })
      .catch((e) => {
        handleShow();
        console.log(e);
      });
  };

  useEffect(() => {
    fetchNews("business");
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handOnclick = (e) => {
    fetchNews(e.target.value);
  };

  return (
    <Container className="my-2">
      {/* <h1 className="mb-4">News</h1> */}
      <div className={styles.newscategary}>
        <Button
          className={styles.newsbutton}
          onClick={handOnclick}
          value="business"
        >
          business
        </Button>
        <Button
          className={styles.newsbutton}
          onClick={handOnclick}
          value="entertainment"
        >
          entertainment
        </Button>

        <Button
          className={styles.newsbutton}
          onClick={handOnclick}
          value="general"
        >
          general
        </Button>

        <Button
          className={styles.newsbutton}
          onClick={handOnclick}
          value="health"
        >
          health
        </Button>

        <Button
          className={styles.newsbutton}
          onClick={handOnclick}
          value="science"
        >
          science
        </Button>

        <Button
          className={styles.newsbutton}
          onClick={handOnclick}
          value="sports"
        >
          sports
        </Button>

        <Button
          className={styles.newsbutton}
          onClick={handOnclick}
          value="technology"
        >
          technology
        </Button>
      </div>

      {newsdata.map((item) => {
        return <SingleNews key={item.title} newsobj={item} />;
      })}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Info:</Modal.Title>
        </Modal.Header>
        <Modal.Body>City is already on list or cannot be found!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
