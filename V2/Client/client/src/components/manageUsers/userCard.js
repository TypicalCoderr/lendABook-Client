import React, { useState } from "react";
import { Badge, Card, Modal, Row } from "react-bootstrap";
import dayjs from "dayjs";

import PropTypes from "prop-types";

import "./userCard.scss";

//REDUX
import { connect } from "react-redux";
import { getUser } from "../../redux/actions/dataActions";

function UserCard(props) {
  const [viewCardModalShow, setViewCardModalShow] = useState(false);
  const {
    firstName,
    lastName,
    email,
    id,
    contactNo,
    accountType,
    isVerified,
    isBlacklisted,
    createdAt,
  } = props.user;

  const handleSetUser = (id) => {
    props.getUser(id);
  };

  return (
    <>
      <Card
        onClick={() => handleSetUser(id)}
        style={{ width: "21rem", height: "10rem" }}
      >
        <Card.Body>
          <Card.Title className="user-card-title">{`${firstName} ${lastName}`}</Card.Title>
          <Badge
            pill
            variant={
              isBlacklisted
                ? "danger"
                : !isVerified
                ? "secondary"
                : isVerified
                ? "success"
                : "primary"
            }
            className="user-card-badge"
          >
            {isBlacklisted
              ? "Blacklisted"
              : !isVerified
              ? "Not verified"
              : isVerified
              ? "verified"
              : "Verified"}
          </Badge>
          <Card.Text>{email}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{`Registered on ${dayjs(createdAt)
            .format("DD/MM/YYYY h:mm:ss A [GMT]ZZ", {
              timeZone: "Asia/Colombo",
            })
            .toString()}`}</small>
        </Card.Footer>
      </Card>
    </>
  );
}

UserCard.propTypes = {
  getUser: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  getUser,
};

export default connect(null, mapActionsToProps)(UserCard);
