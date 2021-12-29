import React, { useState, useEffect } from "react";
import { Button, Badge } from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

//REDUX
import { connect, useSelector } from "react-redux";
import {
  changeMovieReservationStatus,
  getAllMovieReservations,
} from "../../redux/actions/dataActions";
import { getUser } from "../../redux/actions/dataActions";

function ReservationMovieRow(props) {
  const [status, setStatus] = useState("pending");
  const [reservation, setReservation] = useState(null);

  // Get reservation status when component loads
  useEffect(() => {
    if (reservation) setStatus(reservation.status);
    // eslint-disable-next-line
  }, []);

  // When reservation object changes change state for re-render
  useEffect(() => {
    if (props.reservation) {
      setReservation(props.reservation);
      setStatus(props.reservation.status);
    }
  }, [props.reservation]);

  const { onView, onCustomerView } = props;

  const handleChangeStatus = (status) => {
    props.changeMovieReservationStatus(reservation.id, status);
    setStatus(status);
  };

  let statusMarkup =
    status === "pending" ? (
      <Badge pill variant="secondary">
        Pending Collection
      </Badge>
    ) : status === "collected" ? (
      <Badge pill variant="warning">
        Collected
      </Badge>
    ) : (
      <Badge pill variant="success">
        Returned
      </Badge>
    );

  //Dynamic markup for actions
  let actionMarkup =
    status === "pending" ? (
      <Button
        variant="outline-info"
        size="sm"
        onClick={() => handleChangeStatus("collected")}
      >
        Set Collected
      </Button>
    ) : status === "collected" ? (
      <Button
        variant="outline-success"
        size="sm"
        onClick={() => handleChangeStatus("returned")}
      >
        Set Returned
      </Button>
    ) : null;

  return (
    <>
      {reservation && (
        <tr>
          <td>{reservation.id}</td>
          <td>
            <Button
              variant="outline-primary"
              size="sm"
              style={{ marginRight: 5 }}
              onClick={() => onView(reservation)}
            >
              Reserved Movies
            </Button>
          </td>
          <td>
            {dayjs(reservation.reserveDate)
              .format("DD/MM/YYYY", {
                timeZone: "Asia/Colombo",
              })
              .toString()}
          </td>
          <td>
            {dayjs(reservation.returnDate)
              .format("DD/MM/YYYY", {
                timeZone: "Asia/Colombo",
              })
              .toString()}
          </td>
          <td>
            {/* {reservation && reservation.user && reservation.user.firstName}{" "}
            {reservation && reservation.user && reservation.user.lastName} */}
            <Button
              variant="outline-primary"
              size="sm"
              style={{ marginRight: 0 }}
              onClick={() => onCustomerView(reservation.UserId)}
            >
              View Customer Details
            </Button>
          </td>
          <td>{reservation.charge} LKR</td>
          <td>{statusMarkup}</td>
          <td>
            {/* <Button
              variant="outline-primary"
              size="sm"
              style={{ marginRight: 5 }}
              onClick={() => onView(reservation)}
            >
              View
            </Button> */}
            {actionMarkup}
          </td>
        </tr>
      )}
    </>
  );
}

ReservationMovieRow.propTypes = {
    reservation: PropTypes.object.isRequired,
    changeMovieReservationStatus: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
  };
  
  const mapActionsToProps = {
    changeMovieReservationStatus,
    getAllMovieReservations,
  };
  
  const mapStateToProps = (state) => ({
    getUser,
  });
  
  export default connect(mapStateToProps, mapActionsToProps)(ReservationMovieRow);