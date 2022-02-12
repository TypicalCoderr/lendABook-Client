import React from "react";
import { Card, Badge, Button } from "react-bootstrap";

import "./reservedBooks.scss";

export default function Movie(props) {
  const { movieId, movieCover, title, category, summary, director, producion, isAdultOnly } =
    props.movie;
  return (
    <Card className="book-box" key={movieId} style={{ height: "auto" }}>
      <div className="book-ribbon">
        <span></span>
      </div>
      <Card.Img className="vehicle-image" src={movieCover}></Card.Img>
      <span>
        <div className="book-info-badges">
          <Badge pill variant="dark">
            {`${director[0].toUpperCase()}${director.slice(1)}`}
          </Badge>{" "}
          <Badge pill variant="warning" style={{}}>
            MovieId :{`${movieId}`}
          </Badge>
        </div>
        <p
          className="book-title"
          style={{ textAlign: "center" }}
        >{`${title}`}</p>
      </span>
    </Card>
  );
}