import React, { useState } from "react";
import { Button } from "react-bootstrap";

export default function AddForm({ onClickAddcity }) {
  const [cityname, setCityname] = useState("");

  const handleOnClick = (e) => {
    e.preventDefault();
    onClickAddcity(cityname);
  };

  return (
    <form className="mb-2" onSubmit={(e) => handleOnClick(e)}>
      <label>City</label>
      <input
        className="ml-2"
        type="text"
        value={cityname}
        onChange={(e) => {
          setCityname(e.target.value);
        }}
      />
      <Button variant="btn btn-primary" className="ml-2" type="submit">
        Add City
      </Button>
    </form>
  );
}
