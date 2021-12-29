//MODULE IMPORT
import React, { useEffect, useState } from "react";
import { Container, Alert, Table, Card } from "react-bootstrap";
import PropTypes from "prop-types";
//CSS IMPORT
import "./myReservation.scss";

import Navbar from "../../components/navbar/navbar";
import BookReservationRow from "../../components/myReservationTable/myReservationRow";
import ViewReservationModal from "../../components/viewReservation/viewReservationModal";
import Footer from "../../components/footer/footer";

//REDUX
import { connect } from "react-redux";
import {
  getMyBookReservations,
} from "../../redux/actions/dataActions";

function MyBookReservations(props) {
  const [activeBookReservations, setActiveBookReservations] = useState([]);
  const [previousBookReservations, setPreviousBookReservations] = useState([]);

  const [reservation, setReservationObject] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const setReservation = (reservation) => {
    setReservationObject(reservation);
    setModalShow(true);
  };

  useEffect(() => {
    props.getMyBookReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Destructure props
  const {
    data: { reservations, loading },
  } = props;

  useEffect(() => {
    if (reservations) {
      setActiveBookReservations(
        reservations.filter((e) => e.status !== "returned")
      );
      setPreviousBookReservations(
        reservations.filter((e) => e.status === "returned")
      );
    }
  }, [reservations]);

  const activeReservationBookMarkup = activeBookReservations.map(
    (reservation) => (
      <BookReservationRow
        key={reservation.id}
        reservation={reservation}
        onView={setReservation}
      />
    )
  );

  const previousReservationBookMarkup = previousBookReservations.map(
    (reservation) => (
      <BookReservationRow
        key={reservation.id}
        reservation={reservation}
        onView={setReservation}
      />
    )
  );

  return (
    <>
      <div className="my_rents_image">
        <Navbar />
        <Container style={{ textAlign: "center" }}>
          <h2 className="title" style={{ marginTop: 80 }}>
            Book Reservations
          </h2>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
          </p>
        </Container>
      </div>
      <Container>
        <h2 className="rent-title" style={{ marginTop: 80 }}>
          Active Reservations
        </h2>
        <Card style={{ width: "70rem", height: "auto" }}>
          <Card.Body>
            <Table striped bordered hover className="manage-equipment-table">
              <thead>
                <tr>
                  <th>Book / Books</th>
                  <th>Reserve Date</th>
                  <th>Return Date</th>
                  <th>Charge</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {!loading && activeBookReservations.length > 0 ? (
                  activeReservationBookMarkup
                ) : activeBookReservations.length === 0 && !loading ? (
                  <tr>
                    <td colSpan="8">
                      <Alert variant="warning">
                        You have no active reservations!
                      </Alert>
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
        <h5 className="rent-title" style={{ marginTop: 80 }}>
          Previous Reservations
        </h5>
        <Card style={{ marginBottom: 20, width: "70rem", height: "auto" }}>
          <Card.Body>
            <Table striped bordered hover className="manage-equipment-table">
              <thead>
                <tr>
                  <th>Book / Books</th>
                  <th>Reserve Date</th>
                  <th>Return Date</th>
                  <th>Charge</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {!loading && previousBookReservations.length > 0 ? (
                  previousReservationBookMarkup
                ) : previousBookReservations.length === 0 && !loading ? (
                  <tr>
                    <td colSpan="8">
                      <Alert variant="warning">
                        You have no previous reservations!
                      </Alert>
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
      </Container>
      <Footer />
      {modalShow && (
        <ViewReservationModal
          reservation={reservation}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
    </>
  );
}

MyBookReservations.propTypes = {
  getMyBookReservations: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getMyBookReservations,
};

export default connect(mapStateToProps, mapActionsToProps)(MyBookReservations);
