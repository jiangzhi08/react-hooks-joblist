import React, { useState } from "react";
import { Button } from "react-bootstrap";

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
      <div>
        <label className="ml-2">Enter URL or Text to generate QR Code</label>
      </div>

      <div>
        <input
          className="ml-2"
          type="text"
          style={{ width: "80%" }}
          value={cityname}
          onChange={(e) => {
            setCityname(e.target.value);
          }}
        />
      </div>
      <Button variant="btn btn-primary" className="ml-2 my-2" type="submit">
        QR Code Generator
      </Button>
    </form>
  );
}
