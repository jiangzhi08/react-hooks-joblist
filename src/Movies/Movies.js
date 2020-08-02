import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Modal, Button, Row, Col } from "react-bootstrap";
import Movie from "./Movie";
import styles from "./Movies.module.css";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [releaseyear, setReleaseyear] = useState("2020");
  const [movieinfo, setMovieinfo] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchMovies = (BASE_URL) => {
    //      const api_key = 914a6dcae52e88ef56ed7a1e0305eb88;
    // 'https://api.themoviedb.org/3/discover/movie?api_key=' +  api_key + '&primary_release_year=2017&sort_by=revenue.desc'

    // https://api.themoviedb.org/3/movie/550?api_key=914a6dcae52e88ef56ed7a1e0305eb88
    // const api = “&api_key=feb6f0eeaa0a72662967d77079850353”;
    // const endpoint = `https://api.themoviedb.org/3/search/movie?query=${search}${api}`;
    // const poster = “https://image.tmdb.org/t/p/w185/wR5HZWdVpcXx9sevV1bQi7rP4op.jpg";

    axios
      .get(BASE_URL)
      .then((res) => {
        // console.log(res.data.page);
        // console.log(res.data.results);
        setMovies(res.data.results);
      })
      .catch((e) => {
        handleShow();
        console.log(e);
      });
  };

  useEffect(() => {
    const BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=914a6dcae52e88ef56ed7a1e0305eb88&primary_release_year=${releaseyear}&sort_by=revenue.desc`;
    fetchMovies(BASE_URL);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const movieDetailClicked = (movieid) => {
    const BASE_URL = `https://api.themoviedb.org/3/movie/${movieid}?api_key=914a6dcae52e88ef56ed7a1e0305eb88`;
    axios
      .get(BASE_URL)
      .then((res) => {
        // console.log(res.data);
        setMovieinfo(res.data);
      })
      .catch((e) => {
        setMovieinfo({ overview: e.message });
        handleShow();
      });

    handleShow();
  };

  const posterBase = `https://image.tmdb.org/t/p/w185`;

  const handleChangeyear = (e) => {
    setReleaseyear(e.target.value);
    const BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=914a6dcae52e88ef56ed7a1e0305eb88&primary_release_year=${e.target.value}&sort_by=revenue.desc`;
    fetchMovies(BASE_URL);
  };

  return (
    <Container className="my-4">
      <Container>
        <Row>
          <Col>
            <h1 className="mb-4">Movies</h1>
          </Col>
          <Col>
            {" "}
            <label className="mx-4">Release Year</label>
            <select
              defaultValue="TX"
              className="form-control"
              style={styles1.select}
              name="city"
              onChange={(e) => handleChangeyear(e)}
              onFocus={(e) => (e.target.selectedIndex = -1)}
            >
              {/* <option selected>Select City</option> */}
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
              <option value="2014">2014</option>
              <option value="2013">2013</option>
              <option value="2012">2012</option>
              <option value="2011">2011</option>
              <option value="2010">2010</option>
              <option value="2009">2009</option>
              <option value="2008">2008</option>
              <option value="2007">2007</option>
              <option value="2006">2006</option>
              <option value="2005">2005</option>
              <option value="2004">2004</option>
              <option value="2003">2003</option>
              <option value="2002">2002</option>
              <option value="2001">2001</option>
              <option value="2000">2000</option>
            </select>
          </Col>
        </Row>
      </Container>

      <Container className={styles.movies}>
        {movies.map((item) => (
          <Movie
            key={item.id}
            poster_path={`${posterBase}${item.poster_path}`}
            title={item.title}
            movieDetailClicked={movieDetailClicked}
            movieid={item.id}
          />
        ))}
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{movieinfo.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{movieinfo.overview}</Modal.Body>
        <Modal.Footer>
          release date: {movieinfo.release_date}
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

var styles1 = {
  select: {
    width: "150px",
    display: "inline-block",
  },
  item: {
    color: "black",

    complete: {
      textDecoration: "line-through",
    },

    due: {
      color: "red",
    },
  },
};
