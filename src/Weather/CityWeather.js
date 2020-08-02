import React from "react";
import { Card, Badge, Button } from "react-bootstrap";

export default function CityWeather({ weather, onDeleteCity }) {
  const celsiustofahrenheit = (temp) => {
    const fa = (Math.round(temp - 273) * 9) / 5 + 32;
    return fa;
  };

  const convertToDate = (num) => {
    const json = `{"date_created":"${num}"}`;
    var myObj = JSON.parse(json);
    const myDate = new Date(1000 * myObj.date_created);
    return myDate.toLocaleString();
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>
              {weather.name} -{" "}
              <span className="text-muted font-weight-light">
                {weather.weather[0].main}
              </span>
              <Button
                className="float-right remove-btn"
                height="10px"
                color="danger"
                size="sm"
                onClick={() => onDeleteCity(weather.id)}
              >
                &times;
              </Button>
            </Card.Title>
            <Card.Subtitle className="text-muted mb-2">
              {/* {new Date("2020-03-02").toLocaleDateString()} */}
              {weather.weather[0].description}
            </Card.Subtitle>
            <Card.Title>
              {celsiustofahrenheit(weather.main.temp)} °F -{" "}
              <span className="text-muted font-weight-light">
                Feel like {celsiustofahrenheit(weather.main.feels_like)} °F -{" "}
              </span>
              <span className="text-muted font-weight-light">
                High: {celsiustofahrenheit(weather.main.temp_max)} °F -{" "}
              </span>
              <span className="text-muted font-weight-light">
                Low: {celsiustofahrenheit(weather.main.temp_min)} °F
              </span>
            </Card.Title>

            <Card.Title>Wind: {weather.wind.speed} mph</Card.Title>
            <Card.Title>Humidity: {weather.main.humidity} %</Card.Title>

            <Badge variant="secondary" className="mr-2">
              sunrise: {convertToDate(weather.sys.sunrise)}
            </Badge>
            <Badge variant="secondary">
              sunset: {convertToDate(weather.sys.sunset)}
            </Badge>

            <div style={{ wordBreak: "break-all" }}>
              {/* <ReactMarkDown source={"job.how_to_apply"} /> */}
            </div>
          </div>
        </div>

        {/* <Card.Text>
          <Button variant="primary" onClick={() => setOpen((prev) => !prev)}>
            {open && "Hide Details"}
            {!open && "View Details"}
          </Button>
        </Card.Text>
        <Collapse in={open}>
        </Collapse> */}
      </Card.Body>
    </Card>
  );
}
