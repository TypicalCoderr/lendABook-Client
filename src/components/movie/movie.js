import React from "react";
import { Card, Badge, Button } from "react-bootstrap";

import "./movie.scss";

export default function Movie(props) {
  const { movieId, movieCover, title, category, director } = props.movie;

  return (
    <Card className="book-box" key={movieId} style={{ height: "23rem" }}>
      <div className="book-ribbon">
        <span></span>
      </div>
      <Card.Img className="vehicle-image" src={movieCover}></Card.Img>
      <span>
        <div className="book-info-badges">
          <Badge pill variant="dark">
            {`${director[0].toUpperCase()}${director.slice(1)}`}
          </Badge>{" "}
        </div>
        <p className="book-title">{`${title}`}</p>
        {/* <button type="button" class="btn btn-outline-primary">
          <i class="far fa-star"></i> Add to Favorites
        </button> */}
      </span>
    </Card>
  );
}
