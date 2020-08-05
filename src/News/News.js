import React, { useState, useEffect } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import SingleNews from "./SingleNews";
import styles from "./News.module.css";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/postsActions";
import loaderimg from "../images/loader.gif";

// export default function News() {
const News = ({ dispatch, loading, newsdata, hasErrors }) => {
  // useEffect(() => {
  //   dispatch(fetchPosts("u.s."));
  //   console.log("get here 1 ");
  // }, [dispatch]);

  const [query, setQuery] = useState("u.s.");

  useEffect(() => {
    const BASE_URL = `https://api.nytimes.com/svc/news/v3/content/all/${query}.json?api-key=BE6dEjKhtmw2otf5g6EplSLuNksx8iLI`;
    dispatch(fetchPosts(BASE_URL));
  }, [dispatch, query]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // const fetchNews = (category) => {
  //   // const BASE_URL = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=fe669351939f40d5b385ad6ec93c0df6`;
  //   // const BASE_URL = `https://gnews.io/api/v3/topics/${category}?token=0898d87cbb9f6b0b247b3cdbcafa61af`;
  //   const BASE_URL = `https://api.nytimes.com/svc/news/v3/content/all/${category}.json?api-key=BE6dEjKhtmw2otf5g6EplSLuNksx8iLI`;

  //   // https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=BE6dEjKhtmw2otf5g6EplSLuNksx8iLI
  //   //https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=BE6dEjKhtmw2otf5g6EplSLuNksx8iLI

  //   axios
  //     .get(BASE_URL)
  //     .then((res) => {
  //       setNewsdata(res.data.results);
  //       // console.log(res.data.results);
  //     })
  //     .catch((e) => {
  //       handleShow();
  //       console.log(e);
  //     });
  // };

  // useEffect(() => {
  //   fetchNews("u.s.");
  //   //eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handOnclick = (e) => {
    setQuery(e.target.value);
    // dispatch(fetchPosts(e.target.value));
    // fetchNews(e.target.value);
  };

  const renderPosts = () => {
    if (loading) return <img src={loaderimg} alt="Loading" width="100" />;
    if (hasErrors) return <p>Too many requests. Refresh later please </p>;
    // return posts.map((post) => <h1 key={post.id}>{post.title} </h1>);
    if (newsdata)
      return newsdata.map((item, index) => {
        return <SingleNews key={index} newsobj={item} />;
      });
  };

  return (
    <Container className="my-2">
      {/* <h1 className="mb-4">News</h1> */}
      <div className={styles.newscategary}>
        <Button
          className={styles.newsbutton}
          onClick={handOnclick}
          value="world"
        >
          world
        </Button>
        <Button
          className={styles.newsbutton}
          onClick={handOnclick}
          value="u.s."
        >
          u.s.
        </Button>

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
          value="fashion"
        >
          fashion
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

        <Button
          className={styles.newsbutton}
          onClick={handOnclick}
          value="food"
        >
          food
        </Button>
      </div>

      <section>{renderPosts()}</section>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Info:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Network Error: too many requests, refresh later please ...
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

// Map Redux state to React component props
const mapStateToProps = (state) => ({
  loading: state.posts.loading,
  newsdata: state.posts.posts.results,
  hasErrors: state.posts.hasErrors,
});
// Connect Redux to React
export default connect(mapStateToProps)(News);
