import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

//CSS
import "./movie_dates.scss";

//REDUX
import { connect } from "react-redux";
import { setMovieDates } from "../../redux/actions/dataActions";

function Movie_dates(props) {
  const [reserveDate, setReserveDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [errors, setErrors] = useState({});

  //When errors are updated the component is re-rendered to display errors
  useEffect(() => {
    props.UI.errors ? setErrors(props.UI.errors.error) : setErrors({});
  }, [props.UI.errors]);

  useEffect(() => {
    if (props.dates) {
      setReserveDate(props.dates.reserveDate);
      setReserveDate(props.dates.returnDate);
    }
  }, []);

  //create the minimum reserve date

  const minDate = () => {
    const now = dayjs();

    return now.add(1, "day").format("YYYY-MM-DD");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = { reserveDate, returnDate };
    props.setMovieDates(data, props.history);
  };

  return (
    <div className="box">
      <form onSubmit={handleFormSubmit}>
        <Row>
          <Col>
            <p>Reservation Date</p>
            <input
              className="rent-now-input"
              type="date"
              required
              value={reserveDate}
              min={minDate()}
              onChange={(e) => setReserveDate(e.target.value)}
            ></input>
          </Col>
          <Col>
            <p>Return Date</p>
            <input
              className="rent-now-input"
              type="date"
              required
              min={minDate()}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            ></input>
          </Col>
          <Col className="col-button">
            <Button variant="primary" className="search-button" type="submit">
              Search
            </Button>
          </Col>
        </Row>
        <p className="error-text-rent" hidden={!errors}>
          {errors.message}
        </p>
      </form>
    </div>
  );
}

Movie_dates.propTypes = {
  setMovieDates: PropTypes.func.isRequired,
  dates: PropTypes.object,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  dates: state.data.dates,
  UI: state.UI,
});

const mapActionsToProps = {
  setMovieDates,
};

export default connect(mapStateToProps, mapActionsToProps)(Movie_dates);
