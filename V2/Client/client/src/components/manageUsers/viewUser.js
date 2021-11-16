import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import {
  Card,
  Row,
  Col,
  Badge,
  ListGroup,
  Button,
  ButtonGroup,
  Modal,
  Alert,
  Container,
} from "react-bootstrap";

import { connect } from "react-redux";

import "./viewUser.scss";

function ViewUser(props) {
  const {
    UI: { loading },
    user,
  } = props;

  const [isVerified, setIsVerified] = useState(false);
  return (
    <Fragment>
      {loading ? (
        <p>loading</p>
      ) : user ? (
        <Card className="view-user-card">
          <Card.Body>
            <Row>
              <Col xs={3}>
                {/* <Card.Img
                    variant="top"
                    src={image}
                    className="view-user-img"
                  /> */}
              </Col>
              <Col>
                <Card.Title className="view-user-name">
                  {`${user.firstName}{" "} ${user.lastName}`}
                </Card.Title>
                <Card.Text className="view-user-email">{user.email}</Card.Text>
                {/* {isVerified && (
                    <Badge
                      pill
                      variant="primary"
                      className="view-user-pill-badge"
                    >
                      Verified
                    </Badge>
                  )}
                  {isPremium && (
                    <Badge
                      pill
                      variant="success"
                      className="view-user-pill-badge"
                    >
                      Premium
                    </Badge>
                  )}
                  {isBlacklisted && (
                    <Badge
                      pill
                      variant="danger"
                      className="view-user-pill-badge"
                    >
                      Blacklisted
                    </Badge>
                  )} */}
              </Col>
            </Row>
            <hr />
          </Card.Body>
          <Card.Footer>
            {" "}
            <small className="text-muted">
              {`Registered on ${dayjs(user.createdAt)
                .format("DD/MM/YYYY h:mm:ss A [GMT]ZZ", {
                  timeZone: "Asia/Colombo",
                })
                .toString()}`}
            </small>
          </Card.Footer>
        </Card>
      ) : (
        <Alert variant="warning"> No user selected</Alert>
      )}
    </Fragment>
  );
}

ViewUser.propTypes = {
  user: PropTypes.object,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.data.user,
  UI: state.UI,
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(ViewUser);
