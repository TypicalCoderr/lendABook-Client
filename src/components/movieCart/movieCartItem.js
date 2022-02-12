import React from "react";
import { Card } from "react-bootstrap";

import "./movieCartItem.scss";

const MovieCartItem = ({ item, removeHandler }) => {
  return (
    <Card className="cartitem" style={{ height: "150px" }}>
      <img
        src={item.movieCover}
        style={{ height: "120px", marginLeft: "20px" }}
      />

      <Card.Text>{item.title}</Card.Text>
      {/* <Link to={`/product/${item.product}`} className="cartItem__name">
        
      </Link> */}
      <p className="cartitem__price"> </p>

      <a
        className="cartItem__deleteBtn"
        onClick={() => removeHandler(item.movieId)}
      >
        <i class="far fa-trash-alt"></i>
      </a>
    </Card>
  );
};

export default MovieCartItem;
