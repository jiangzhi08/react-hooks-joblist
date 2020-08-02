import React from "react";
import { Card } from "react-bootstrap";

export default function Joke({ jokecontent }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Subtitle className="text-muted mb-2">{jokecontent}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}
