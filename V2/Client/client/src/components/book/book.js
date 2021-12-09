import React from "react";
import { Card, Badge } from "react-bootstrap";

import "./book.scss";

export default function Book(props) {
  const { ISBN, bookCover, title, category, summary, author, publisher } =
    props.book;

  return (
    <Card className="vehicle-box" key={ISBN}>
      <div className="vehicle-ribbon">
        <span>{``}</span>
      </div>
      <Card.Img className="vehicle-image" src={bookCover}></Card.Img>
      <span>
        <div className="vehicle-info-badges">
          <Badge pill variant="dark">
            {`${author[0].toUpperCase()}${author.slice(1)}`}
          </Badge>{" "}
        </div>
        <p className="vehicle-title">{`${title}`}</p>
      </span>
    </Card>
  );
}
