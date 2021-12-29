import React, { Fragment, useState, useEffect } from "react";
import {
  Button,
  Badge,
  Card,
  Modal,
  Row,
  Table,
  Image,
  Col,
} from "react-bootstrap";
import dayjs from "dayjs";

import PropTypes from "prop-types";

// import "./userCard.scss";

//REDUX
import { connect } from "react-redux";
import { getUser } from "../../redux/actions/dataActions";

function ViewReservationUserModal(props) {
  const {
    data: { user },
  } = props;

  //   useEffect(() => {
  //     props.getUser(reservation.UserId);
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  const newProps = { ...props };

  return (
    <Modal
      {...newProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="rent-vehicle-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Customer Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="rent-vehicle-body">
          {/* {_books.length > 0 &&
            chunkedBooksMarkup.map((chunk) => (
              <CardColumns style={{ marginTop: "20px", width: "60rem" }}>
                {chunk}
              </CardColumns>
            ))} */}

          <Row>
            <Col xs={5}>
              <div className="book-info-badges">
                {user && user.isVerified && (
                  <Badge
                    pill
                    variant="success"
                    className="view-user-pill-badge"
                  >
                    Verified
                  </Badge>
                )}

                {user && user.isBlacklisted && (
                  <Badge pill variant="danger" className="view-user-pill-badge">
                    Blacklisted
                  </Badge>
                )}
              </div>

              <Image
                className="vehicle-image"
                src={user && user.userImageURL}
                style={{}}
              />
            </Col>
            <Col sx={7} style={{ marginTop: "2rem" }}>
              <Table striped bordered hover>
                <tbody className="rent-vehicle-table">
                  <tr>
                    <td>
                      <Badge pill variant="dark" className="fst-italic">
                        Name
                      </Badge>
                      {"  "}
                      {user && user.firstName} {user && user.lastName}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <Badge pill variant="dark" className="fst-italic">
                        Email
                      </Badge>
                      {"  "}
                      {user && user.email}{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <Badge pill variant="dark" className="fst-italic">
                        Date of birth
                      </Badge>
                      {"  "}
                      {user && user.dateOfBirth}{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <Badge pill variant="dark" className="fst-italic">
                        Contact No
                      </Badge>
                      {"  "}+{user && user.contactNo}{" "}
                    </td>
                  </tr>
                  <tr className="text-muted text-center">
                    <td>
                      {"  "}
                      {`Registered on ${dayjs(user && user.createdAt)
                        .format("DD/MM/YYYY h:mm:ss A [GMT]ZZ", {
                          timeZone: "Asia/Colombo",
                        })
                        .toString()}`}{" "}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        {/* {edited && (
          <Button variant="primary" onClick={handleEdit} disabled={UI.loading}>
            Update Reservation
          </Button>
        )} */}
      </Modal.Footer>
    </Modal>
  );
}

ViewReservationUserModal.propTypes = {
  reservation: PropTypes.object.isRequired,
};

const mapActionsToProps = {};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.data.user,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ViewReservationUserModal);
