import React from "react";
import { Card, Badge, Button } from "react-bootstrap";

import "./book.scss";

export default function Book(props) {
  const { ISBN, bookCover, title, category, summary, author, publisher } =
    props.book;
  return (
    <Card className="book-box" key={ISBN} style={{ height: "23rem" }}>
      <div className="book-ribbon">
        <span></span>
      </div>
      <Card.Img className="vehicle-image" src={bookCover}></Card.Img>
      <span>
        <div className="book-info-badges">
          <Badge pill variant="dark">
            {`${author[0].toUpperCase()}${author.slice(1)}`}
          </Badge>{" "}
        </div>
        <p className="book-title">{`${title.substring(0, 35)}`}</p>
        {/* <button type="button" class="btn btn-outline-primary">
          <i class="far fa-star"></i> Add to Favorites
        </button> */}
      </span>
    </Card>
  );
}
