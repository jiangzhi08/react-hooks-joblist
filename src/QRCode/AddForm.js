import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";

export default function AddForm({ generateQR }) {
  const [cityname, setCityname] = useState(
    "https://awesome-darwin-99824f.netlify.app/"
  );

  const handleOnClick = (e) => {
    e.preventDefault();
    generateQR(cityname);
  };

  return (
    <form className="mb-2" onSubmit={(e) => handleOnClick(e)}>
      <label>URL or Text</label>
      <input
        className="ml-2"
        type="text"
        style={{ width: "60%" }}
        value={cityname}
        onChange={(e) => {
          setCityname(e.target.value);
        }}
      />
      <Button variant="btn btn-primary" className="ml-2" type="submit">
        QR Code Generator
      </Button>
    </form>
  );
}
