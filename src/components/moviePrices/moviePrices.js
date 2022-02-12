import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Table,
  Card,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Alert,
  Image,
  Badge,
} from "react-bootstrap";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getMoviePrices } from "../../redux/actions/dataActions";

import "./moviePrices.scss";

function MoviePrices(props) {
  const [pricePool, setPricePool] = useState([]);
  const [allPrices, setAllPrices] = useState([]);
  const [allPricesConst, setAllPricesConst] = useState([]);

  let now = dayjs();

  //Destructure props
  const {
    data: { videoPrices, loading },
  } = props;

  //Get price information when component loads
  useEffect(() => {
    props.getMoviePrices();
  }, []);

  useEffect(() => {
    if (videoPrices) {
      setPricePool(videoPrices);

      let _prices = [];

      videoPrices.forEach((element) => {
        // console.log(element);

        _prices.push({ ...element });
      });
      setAllPrices(_prices);
      setAllPricesConst(_prices);
    }
  }, [videoPrices]);

  //Markup for competitive prices
  const pricesMarkup = allPrices.map((element, index) => (
    <tr>
      <td style={{ textAlign: "left" }} key={index}>
        <Row style={{ height: "12rem" }}>
          <Col xs={4}>
            <Image
              src={element.img}
              style={{ height: "11rem", width: "7rem" }}
            />
          </Col>
          <Col xs={8}>{element.title} </Col>
        </Row>
      </td>
      <td>{`${element.price ? element.price : "Not given"}`}</td>
      <td>
        <Button href={element.link}>View</Button>
      </td>
    </tr>
  ));

  //Search prices from name or type
  const search = (input) => {
    const pricesCopy = allPricesConst.map((videoPrice) => videoPrice);
    const inputs = input.toLowerCase().split(" ");
    const searchKeys = ["price", "title"];
    let pricesArray = [];
    if (inputs.length === 1 && inputs[0] === "") {
      pricesArray = pricesCopy;
    } else {
      inputs.forEach((word) => {
        pricesCopy.filter((item) => {
          return Object.keys(item).some((key) => {
            if (searchKeys.includes(key)) {
              if (word.length > 0 && item[key].toLowerCase().includes(word))
                if (item) pricesArray.push(item);
            }
            return null;
          });
        });
      });
    }
    const result = [...new Set(pricesArray)];
    setAllPrices(result);
  };

  //Filter prices with type
  const filter = (filter_type) => {
    const pricesCopy = allPricesConst.map((price) => price);
    if (filter_type === "all") {
      setAllPrices(pricesCopy);
    } else {
      const filtered = pricesCopy.filter(
        (element) => element.type === filter_type
      );
      setAllPrices(filtered);
    }
  };

  return (
    <div className="manage-equipment">
      <Card style={{ width: "80rem", height: "8rem" }}>
        <Card.Body>
          <Card.Title>Search Competitive Pricing</Card.Title>
          <Card.Body>
            <Row>
              <Col xs={12}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className="fas fa-search"></i>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Search for prices"
                    aria-label="Search for prices"
                    aria-describedby="basic-addon2"
                    onChange={(e) => search(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card.Body>
      </Card>

      <Card style={{ width: "80rem", height: "auto" }}>
        {!loading && allPrices.length > 0 ? (
          <a
            href="https://play.google.com/store/movies/collection/cluster?clp=0g5RChQKDm1vdmVyc19zaGFrZXJzEAcYBDI3CjF0b3BfZGV2aWNlX2ZlYXR1cmVkX01PVklFX21vdmVyc19zaGFrZXJzXzQtNy00LTYzEAwYBDgB:S:ANO1ljJfTG0&gsr=ClTSDlEKFAoObW92ZXJzX3NoYWtlcnMQBxgEMjcKMXRvcF9kZXZpY2VfZmVhdHVyZWRfTU9WSUVfbW92ZXJzX3NoYWtlcnNfNC03LTQtNjMQDBgEOAE%3D:S:ANO1ljJCC8A"
            target="_blank"
            className="price-link"
            style={{ textAlign: "right", padding: "10px" }}
          >
            Prices gathered from google play movies{" "}
            {now.format("YYYY-MM-DD HH:mm")}
          </a>
        ) : null}
        <Card.Body>
          <Table striped bordered hover className="manage-equipment-table">
            <thead>
              <tr>
                <th>Movie Title</th>
                <th>Lend Price</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {!loading && allPrices.length > 0 ? (
                pricesMarkup
              ) : allPrices.length === 0 && !loading ? (
                <tr>
                  <td colSpan={5}>
                    <Alert variant="danger">No prices found!</Alert>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={5}>
                    <Alert variant="warning">Loading movie prices!</Alert>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

MoviePrices.propTypes = {
  getMoviePrices: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getMoviePrices,
};

export default connect(mapStateToProps, mapActionsToProps)(MoviePrices);
