import React from "react";
import { Badge, Card, Image } from "react-bootstrap";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getBook } from "../../redux/actions/dataActions";

import "./bookCard.scss";

function BookCard(props) {
  const { id, ISBN, isAvailable, bookCover, title } = props.book;

  const handleSetBook = (id) => {
    props.getBook(id);
  };

  return (
    <Card className="vehicle-card" onClick={() => handleSetBook(id)}>
      <Image variant="top" src={bookCover} className="vehicle-card-image" />
      {/* <img src={bookCover}/> */}
      <Badge
        pill
        className="vehicle-card-badge"
        variant={isAvailable ? "success" : "danger"}
      >
        {isAvailable ? "Available" : "Unavailable"}
      </Badge>
      <Card.Body>
        <Badge variant="secondary">Number</Badge>
        <span>
          {"	"}
          {ISBN}
        </span>
        <br />
        <Badge variant="secondary">Book</Badge>
        <span>
          {"	"}
          {title}
        </span>
      </Card.Body>
    </Card>
  );
}

BookCard.propTypes = {
  getBook: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  getBook,
};

export default connect(null, mapActionsToProps)(BookCard);
