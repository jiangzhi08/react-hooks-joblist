import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Modal, Button } from "react-bootstrap";
import USHistoric from "./USHistoric";

export default function COVID() {
  const [covidUSHistoricdata, setCovidUSHistoricdata] = useState([]);
  const [covidStateHistoricdata, setCovidStateHistoricdata] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [usselected, setUsselected] = useState(true);
  const [statename, setStatename] = useState("TX");

  const fetchCovidStateHistoric = (statename) => {
    const BASE_URL = `https://covidtracking.com/api/v1/states/${statename.toLowerCase()}/daily.json`;
    axios
      .get(BASE_URL)
      .then((res) => {
        // console.log(res.data);
        setCovidStateHistoricdata(res.data.reverse());
      })
      .catch((e) => {
        handleShow();
        console.log(e);
      });
  };

  useEffect(() => {
    const fetchCovidUSHistoric = () => {
      const BASE_URL = `https://covidtracking.com/api/v1/us/daily.json`;
      axios
        .get(BASE_URL)
        .then((res) => {
          // console.log(res.data);
          setCovidUSHistoricdata(res.data.reverse());
        })
        .catch((e) => {
          handleShow();
          console.log(e);
        });
    };

    fetchCovidUSHistoric();
    fetchCovidStateHistoric(statename);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSeceltInputChange = (event) => {
    setUsselected(false);
    setStatename(event.target.value);
    fetchCovidStateHistoric(event.target.value);
  };
  return (
    <Container className="my-4">
      <h1 className="mb-4">
        Covid
        <Button
          className="mx-5 mt-2"
          variant={usselected ? "primary" : "secondary"}
          onClick={() => setUsselected(true)}
        >
          US
        </Button>
        {/* <Button
          variant={usselected ? "secondary" : "primary"}
          onClick={() => setUsselected(false)}
        >
          TX
        </Button> */}
        <select
          defaultValue="TX"
          className="form-control"
          style={styles.select}
          name="city"
          onChange={handleSeceltInputChange}
          onFocus={(e) => (e.target.selectedIndex = -1)}
        >
          {/* <option selected>Select City</option> */}
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
      </h1>

      <USHistoric
        covidUSHistoricdata={
          usselected ? covidUSHistoricdata : covidStateHistoricdata
        }
        statename={usselected ? "US" : statename}
      />

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

var styles = {
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
