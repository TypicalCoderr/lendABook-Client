import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import ReservationMovieRow from "./reservationMovieRow";
import ViewReservationMovieModal from "../viewReservation/viewReservationMovieModal";
import ViewReservationUserModal from "../viewReservation/viewReservationUserModal";

import "./manageReservation.scss";

//REDUX
import { connect } from "react-redux";
import { getAllMovieReservations } from "../../redux/actions/dataActions";
import { getUser } from "../../redux/actions/dataActions";

function ManageMovieReservations(props) {
  const [modalShow, setModalShow] = useState(false);
  const [userModalShow, setUserModalShow] = useState(false);
  const [reservation, setReservationObject] = useState({});
  const [reservationPool, setReservationPool] = useState([]);

  const setReservation = (reservation) => {
    setReservationObject(reservation);
    setModalShow(true);
  };

  //Get rent information when component loads
  useEffect(() => {
    props.getAllMovieReservations();
    setReservationPool(reservations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCustomer = (UserId) => {
    setUserModalShow(true);
    props.getUser(UserId);
  };

  //Destructure props
  const {
    data: { reservations, loading },
  } = props;

  //Set reservation object on component load
  useEffect(() => {
    if (reservations) {
      setReservationPool(reservations);
    }
  }, [reservations]);

  // Handle status change of reservation
  const changeStatus = (_status) => {
    const allReservations = reservations.map(
      (reservation_obj) => reservation_obj
    );
    let result;
    if (!(_status.toLowerCase() === "all")) {
      result = allReservations.filter((item) => {
        if (item.status.toLowerCase() === _status.toLowerCase()) return item;
        else return null;
      });
    } else result = allReservations;
    setReservationPool(result);
  };

  //Map reservation data into components
  let reservationMarkup = reservationPool.map((reservation) => (
    <ReservationMovieRow
      key={reservation.id}
      reservation={reservation}
      onView={setReservation}
      onCustomerView={handleCustomer}
    />
  ));

  //Flatten object attributes to avoid nested objects when filtering
  const flatten = (object) => {
    return Object.assign(
      {},
      ...(function _flatten(objectBit, path = "") {
        return [].concat(
          ...Object.keys(objectBit).map((key) =>
            typeof objectBit[key] === "object"
              ? _flatten(objectBit[key], `${key}`)
              : { [`${key}`]: objectBit[key] }
          )
        );
      })(object)
    );
  };

  //Search for reservation
  const search = (input) => {
    const inputs = input.toLowerCase().split(" ");
    const allReservations = reservations.map(
      (reservation_obj) => reservation_obj
    );

    //Fields to be searched
    const searchKeys = ["id", "reserveDate", "returnDate", "charge"];
    let result = [];
    if (inputs.length === 0 || inputs[0] === "") {
      result = allReservations;
    } else {
      inputs.forEach((word) => {
        allReservations.filter((reservation_obj) => {
          let obj_clone = { ...reservation_obj };
          let flat_obj = flatten(obj_clone);
          return Object.keys(flat_obj).some((key) => {
            if (key === "reserveDate" || key === "returnDate")
              flat_obj[key] = dayjs(flat_obj[key])
                .format("DD/MM/YYYY", { timeZone: "Asia/Colombo" })
                .toString();
            if (searchKeys.includes(key)) {
              if (
                (word.length > 0 &&
                  flat_obj[key].toString().toLowerCase().includes(word)) ||
                (word.length > 0 && flat_obj[key] === word)
              ) {
                if (flat_obj) result.push(reservation_obj);
              }
            }
            return null;
          });
        });
      });
    }
    result = [...new Set(result)];
    setReservationPool(result);
  };

  return (
    <div className="manage-equipment">
      <Card style={{ width: "87rem", height: "8rem", marginBottom: 20 }}>
        <Card.Body>
          <Card.Title>Search Movie Reservations</Card.Title>
          <Card.Body>
            <Row>
              <Col xs={5}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className="fas fa-search"></i>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Search for reservations"
                    aria-label="Search for reservations"
                    aria-describedby="basic-addon2"
                    onChange={(e) => search(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col xs={7}>
                <Button
                  className="search-user-button"
                  variant="outline-primary"
                  onClick={() => {
                    changeStatus("all");
                  }}
                >
                  All
                </Button>{" "}
                <Button
                  className="search-user-button"
                  variant="outline-secondary"
                  onClick={() => {
                    changeStatus("pending");
                  }}
                >
                  Pending
                </Button>{" "}
                <Button
                  className="search-user-button"
                  variant="outline-warning"
                  onClick={() => {
                    changeStatus("collected");
                  }}
                >
                  Collected
                </Button>{" "}
                <Button
                  className="search-user-button"
                  variant="outline-success"
                  onClick={() => {
                    changeStatus("returned");
                  }}
                >
                  Returned
                </Button>{" "}
              </Col>
            </Row>
          </Card.Body>
        </Card.Body>
      </Card>

      <Card style={{ width: "87rem", height: "auto" }}>
        <Card.Body>
          <Table
            striped
            bordered
            hover
            className="manage-equipment-table"
            style={{ width: "84.5rem" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Movie/ Movies</th>
                <th>reserve Date</th>
                <th>return Date</th>
                <th>Customer</th>
                <th>Reservation Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {!loading && reservationPool.length > 0 ? (
                reservationMarkup
              ) : reservationPool.length === 0 && !loading ? (
                <tr>
                  <td colSpan="8">
                    <Alert variant="warning">No reservations found!</Alert>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="8">Loading!</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      {modalShow && (
        <ViewReservationMovieModal
          reservation={reservation}
          show={modalShow}
          onHide={() => setModalShow(false)}
          manage={true}
        />
      )}
      {userModalShow && (
        <ViewReservationUserModal
          reservation={reservation}
          show={userModalShow}
          onHide={() => setUserModalShow(false)}
          manage={true}
        />
      )}
    </div>
  );
}

ManageMovieReservations.propTypes = {
  getAllMovieReservations: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getAllMovieReservations,
  getUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ManageMovieReservations);
