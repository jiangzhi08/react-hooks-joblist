import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Modal, Button } from "react-bootstrap";
import CityWeather from "./CityWeather";
// import styles from "./Recipes.module.css";
import AddForm from "./AddForm";

export default function Weather() {
  // const BASE_URL =
  //   "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=542ffd081e67f4512b705f89d2a611b2";

  // const BASE_URL =
  //   "http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=542ffd081e67f4512b705f89d2a611b2";

  const citiesInitial = [
    "Dallas",
    "Austin",
    "San Antonio",
    "Chicago",
    "New York",
    "San Fransisco",
    "Beijing",
  ];
  const [cities, setCitites] = useState(citiesInitial);

  const [weatherdata, setWeatherdata] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchWeather = (city) => {
      // 1c59674e8d47a6edbaf3feff732e2864
      // 542ffd081e67f4512b705f89d2a611b2
      const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=542ffd081e67f4512b705f89d2a611b2`;
      axios
        .get(BASE_URL)
        .then((res) => {
          setWeatherdata((prev) => [...prev, res.data]);
        })
        .catch((e) => {
          handleShow();
          console.log(e);
        });
    };

    cities.forEach(fetchWeather);
  }, []);

  const onDeleteCity = (id) => {
    setWeatherdata(weatherdata.filter((item) => item.id !== id));
    console.log(id);
  };

  const onClickAddcity = (city) => {
    const find = weatherdata.find((item) => item.name === city);
    if (find) {
      handleShow();
      return;
    }

    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=542ffd081e67f4512b705f89d2a611b2`;
    axios
      .get(BASE_URL)
      .then((res) => {
        setWeatherdata((prev) => [res.data, ...prev]);
      })
      .catch((e) => {
        handleShow();
        console.log(e);
      });

    console.log(city);
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">Weather</h1>
      <AddForm onClickAddcity={onClickAddcity} />
      {/* <SearchForm params={params} onParamChange={handleParamChange} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && (
        <img src={require("./loader.gif")} alt="Loading" width="100" />
      )}
      {error && <h1>error, refreshing page: {error}</h1>} */}
      {weatherdata.map((item) => {
        return (
          <CityWeather
            key={item.id}
            weather={item}
            onDeleteCity={onDeleteCity}
          />
        );
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
