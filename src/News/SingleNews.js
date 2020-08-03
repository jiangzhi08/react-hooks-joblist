import React from "react";
import { Card } from "react-bootstrap";

export default function SingleNews({ newsobj }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>
              <a href={newsobj.url}>{newsobj.title}</a>
            </Card.Title>
            <Card.Subtitle className="text-muted mb-2">
              {newsobj.byline} -{" "}
              <span className="text-muted font-weight-light">
                {new Date(newsobj.created_date).toLocaleDateString()}
              </span>
            </Card.Subtitle>

            <Card.Text>{newsobj.abstract}</Card.Text>
            {/* <div style={{ wordBreak: "break-all" }}>
              <a href={newsobj.url}>news link</a>
            </div> */}
          </div>
          <img
            className="d-none d-md-block"
            width="200"
            alt={newsobj.source}
            // src={newsobj.thumbnail_standard}
            src={newsobj.multimedia ? newsobj.multimedia[2].url : null}
          />
        </div>
      </Card.Body>
    </Card>
  );
}
