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

import { setVerified } from "../../redux/actions/dataActions";
import { setBlacklisted } from "../../redux/actions/dataActions";

function ViewUser(props) {
  const {
    UI: { loading },
    user,
  } = props;

  const [isVerified, setIsVerified] = useState(false);
  const [isBlacklisted, setIsBlacklisted] = useState(false);
  const [userImageModalShow, setUserImageModalShow] = useState(false);
  const [viewUserModalShow, setViewUserModalShow] = useState(false);

  useEffect(() => {
    if (user) {
      setIsVerified(user.isVerified);
      setBlacklisted(user.setBlacklisted);
    }
  }, [user]);

  const handleSetVerified = () => {
    props.setVerified(user.id);
    const _verified = isVerified;
    setIsVerified(!_verified);
  };

  const handleSetBlacklisted = () => {
    props.setBlacklisted(user.id);
    const _blacklisted = isBlacklisted;
    setIsBlacklisted(!_blacklisted);
  };
  return (
    <Fragment>
      {loading ? (
        <p>loading</p>
      ) : user ? (
        <>
          <Card className="view-user-card" style={{ width: "25rem" }}>
            <Card.Body>
              <Row>
                <Col xs={3}>
                  <Card.Img
                    variant="top"
                    src={user.userImageURL}
                    className="view-user-img"
                  />
                </Col>
                <Col>
                  <Card.Title className="view-user-name">
                    {`${user.firstName} ${user.lastName}`}
                  </Card.Title>
                  <Card.Text className="view-user-email">
                    {user.email}
                  </Card.Text>
                  {isVerified && (
                    <Badge
                      pill
                      variant="primary"
                      className="view-user-pill-badge"
                    >
                      Verified
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
                  )}
                </Col>
              </Row>
              <hr />
              <ListGroup>
                <ListGroup.Item variant="light">
                  <Badge variant="secondary"> Email </Badge>
                  <span> {user.email}</span>
                </ListGroup.Item>
                <ListGroup.Item variant="light">
                  <Badge variant="secondary">Contact number</Badge>
                  <span> {user.contactNo}</span>
                </ListGroup.Item>
                <ListGroup.Item variant="light">
                  <Badge variant="secondary">Date of birth</Badge>
                  <span> {user.age}</span>
                </ListGroup.Item>
                <ListGroup.Item variant="light">
                  <Badge variant="secondary">Subsciption Type</Badge>
                  <span> {user.accountType}</span>
                </ListGroup.Item>
              </ListGroup>

              <ButtonGroup vertical className="view-user-image-options">
                <Button
                  variant="outline-info"
                  disabled={!user.userImageURL}
                  onClick={() => setUserImageModalShow(true)}
                >
                  {user.userImageURL
                    ? "View User Image"
                    : "User image not uploaded"}
                </Button>
              </ButtonGroup>
              <ButtonGroup vertical className="view-user-image-options">
                <Button
                  variant={isVerified ? "outline-secondary" : "outline-info"}
                  onClick={handleSetVerified}
                >
                  {isVerified ? "Remove Verified" : "Set Verified"}
                </Button>
                <Button
                  variant={isBlacklisted ? "danger" : "outline-danger"}
                  onClick={handleSetBlacklisted}
                >
                  {isBlacklisted ? "Remove Blacklisted" : "Set Blacklisted"}
                </Button>
              </ButtonGroup>
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

          <Modal
            show={userImageModalShow}
            onHide={() => setUserImageModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className="view-user-modal-body">
              <img
                src={user.userImageURL}
                alt=""
                style={{ objectFit: "contain", width: 400 }}
              />
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <Alert variant="warning"> No user selected</Alert>
      )}
      ;
    </Fragment>
  );
}

ViewUser.propTypes = {
  user: PropTypes.object,
  UI: PropTypes.object.isRequired,
  setVerified: PropTypes.object.isRequired,
  setBlacklisted: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.data.user,
  UI: state.UI,
});

const mapActionsToProps = {
  setVerified,
  setBlacklisted,
};

export default connect(mapStateToProps, mapActionsToProps)(ViewUser);
