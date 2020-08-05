import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Modal, Row, Col } from "react-bootstrap";
import Movie from "./Movie";
import styles from "./Movies.module.css";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/postsActions";
import loaderimg from "../images/loader.gif";
import MoviesPagination from "./MoviesPagination";

const Movies = ({ dispatch, loading, movies, total_pages, hasErrors }) => {
  const [releaseyear, setReleaseyear] = useState("2020");
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  useEffect(() => {
    // const BASE_URL = `https://api.nytimes.com/svc/news/v3/content/all/${query}.json?api-key=BE6dEjKhtmw2otf5g6EplSLuNksx8iLI`;
    // const BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=914a6dcae52e88ef56ed7a1e0305eb88&primary_release_year=${query}&page=${page}&sort_by=revenue.desc`;
    const BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=914a6dcae52e88ef56ed7a1e0305eb88&primary_release_year=${releaseyear}&page=${page}`;

    dispatch(fetchPosts(BASE_URL));
  }, [dispatch, releaseyear, page]);

  const [movieinfo, setMovieinfo] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const fetchSearchMovies = (BASE_URL) => {
  //   axios
  //     .get(BASE_URL)
  //     .then((res) => {
  //       // console.log(res.data.page);
  //       // console.log(res.data.results);
  //       setMovies(res.data.results);
  //     })
  //     .catch((e) => {
  //       handleShow();
  //       console.log(e);
  //     });
  // };

  // useEffect(() => {
  //   const BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=914a6dcae52e88ef56ed7a1e0305eb88&primary_release_year=${releaseyear}&sort_by=revenue.desc`;
  //   fetchMovies(BASE_URL);
  //   //eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
    setPage(1);
    // setReleaseyear(e.target.value);
    // const BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=914a6dcae52e88ef56ed7a1e0305eb88&primary_release_year=${e.target.value}&sort_by=revenue.desc`;
    // fetchMovies(BASE_URL);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    const BASE_URL = `https://api.themoviedb.org/3/search/movie?api_key=914a6dcae52e88ef56ed7a1e0305eb88&query=${search}`;
    dispatch(fetchPosts(BASE_URL));
  };

  const renderPosts = () => {
    if (loading) return <img src={loaderimg} alt="Loading" width="100" />;
    if (hasErrors) return <p>Too many requests. Refresh later please </p>;
    // return posts.map((post) => <h1 key={post.id}>{post.title} </h1>);
    if (movies)
      return movies.map((item) => (
        <Movie
          key={item.id}
          poster_path={`${posterBase}${item.poster_path}`}
          title={item.title}
          movieDetailClicked={movieDetailClicked}
          movieid={item.id}
        />
      ));
  };

  return (
    <Container className="my-4">
      <Container>
        <Row>
          {/* <Col>
            <h1 className="mb-4">Movies</h1>
          </Col> */}
          <Col>
            <form className={styles.search_form} onSubmit={getSearch}>
              <input
                className={styles.search_bar}
                type="text"
                value={search}
                onChange={updateSearch}
              />
              <button className={styles.search_button} type="submit">
                Search
              </button>
            </form>
          </Col>
        </Row>
        <Row>
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
          <Col>
            <MoviesPagination
              page={page}
              setPage={setPage}
              total_pages={total_pages}
            />
          </Col>
        </Row>
      </Container>

      <Container className={styles.movies}>{renderPosts()}</Container>
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
};

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

// Map Redux state to React component props
const mapStateToProps = (state) => ({
  loading: state.posts.loading,
  total_pages: state.posts.posts.total_pages,
  movies: state.posts.posts.results,
  hasErrors: state.posts.hasErrors,
});
// Connect Redux to React
export default connect(mapStateToProps)(Movies);
