import React, { useState, useEffect } from "react";
import { Button, Badge } from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

//REDUX
import { connect } from "react-redux";

function MovieReservationRow(props) {
  const [status, setStatus] = useState("pending");
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    if (reservation) setStatus(reservation.status);
  }, []);

  useEffect(() => {
    if (props.reservation) {
      setReservation(props.reservation);
      setStatus(props.reservation.status);
    }
  }, [props.reservation]);

  const { onView } = props;

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

  return (
    <>
      {reservation && (
        <tr>
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
          <td>{reservation.charge}</td>
          <td>{statusMarkup}</td>
        </tr>
      )}
    </>
  );
}

MovieReservationRow.propTypes = {
    reservation: PropTypes.object.isRequired,
  };
  
  const mapActionsToProps = {};
  
  export default connect(null, mapActionsToProps)(MovieReservationRow);
