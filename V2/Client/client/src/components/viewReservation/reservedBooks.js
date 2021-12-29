import React from "react";
import { Card, Badge, Button } from "react-bootstrap";

import "./reservedBooks.scss";

export default function Book(props) {
  const { ISBN, bookCover, title, category, summary, author, publisher } =
    props.book;
  return (
    <Card className="book-box" key={ISBN} style={{ height: "auto" }}>
      <div className="book-ribbon">
        <span></span>
      </div>
      <Card.Img className="vehicle-image" src={bookCover}></Card.Img>
      <span>
        <div className="book-info-badges">
          <Badge pill variant="dark">
            {`${author[0].toUpperCase()}${author.slice(1)}`}
          </Badge>{" "}
          <Badge pill variant="warning" style={{}}>
            ISBN :{`${ISBN}`}
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
