import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  Alert,
  Badge,
  ListGroup,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import { connect } from "react-redux";

import "./viewBook.scss";

function ViewBook(props) {
  const {
    UI: { loading },
    book,
  } = props;

  return loading ? (
    <p>Loading...</p>
  ) : book ? (
    <div>
      <Card className="view-user-card">
        <Card.Body>
          <Card.Img
            variant="top"
            src={props.bookCover}
          />

          <hr />

          <ListGroup>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">NIC number</Badge>
              <span> Name</span>
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">Driver's license number</Badge>
              <span> Blame</span>
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">Contact number</Badge>
              <span> Flame</span>
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">Date of birth</Badge>
              <span> Game</span>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>

        <Card.Footer>
          {" "}
          <small className="text-muted">
            {/* {`Registered on ${dayjs(user.createdAt).toString()}`} */}
          </small>
        </Card.Footer>
      </Card>
    </div>
  ) : (
    <Alert variant="warning">No vehicle selected</Alert>
  );
}

ViewBook.propTypes = {
  book: PropTypes.object,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  book:state.data.book,
  UI: state.UI,
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(ViewBook);
