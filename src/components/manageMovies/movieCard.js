import React from "react";
import { Badge, Card, Image } from "react-bootstrap";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getMovie }  from "../../redux/actions/dataActions";

function MovieCard(props) {
    const {movieId, isAvailable, movieCover, title, director} = props.movie;

    const handleSetMovie = (movieId) => {
        props.getMovie(movieId);
      };

      return (
        <Card className="book-card" onClick={() => handleSetMovie(movieId)}>
        <Image variant="top" src={movieCover} className="book-card-image" />
        {/* <img src={bookCover}/> */}
        <Badge
          pill
          className="book-card-badge"
          variant={isAvailable ? "success" : "danger"}
        >
          {isAvailable ? "Available" : "Reservered"}
        </Badge>
        <Card.Body>
          <Badge variant="secondary">Title</Badge>
          <span>
            {"	"}
            {title.substring(0, 25)}
          </span>
          <br />
          <Badge variant="secondary">Author</Badge>
          <span>
            {"	"}
            {director}
          </span>
        </Card.Body>
      </Card>
      );
}

MovieCard.propTypes = {
    getMovie: PropTypes.func.isRequired,
  };
  
  const mapActionsToProps = {
    getMovie,
  };
  
  export default connect(null, mapActionsToProps)(MovieCard);