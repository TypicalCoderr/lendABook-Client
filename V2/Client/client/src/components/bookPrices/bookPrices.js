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
import { getBookPrices } from "../../redux/actions/dataActions";

import "./bookPrices.scss";

function BookPrices(props) {
  const [pricePool, setPricePool] = useState([]);
  const [allPrices, setAllPrices] = useState([]);
  const [allPricesConst, setAllPricesConst] = useState([]);

  let now = dayjs();

  //Destructure props
  const {
    data: { bookPrices, loading },
  } = props;

  //Get price information when component loads
  useEffect(() => {
    props.getBookPrices();
  }, []);

  useEffect(() => {
    if (bookPrices) {
      setPricePool(bookPrices);

      let _prices = [];

      bookPrices.forEach((element) => {
        console.log(element);

        _prices.push({ ...element });
      });
      setAllPrices(_prices);
      setAllPricesConst(_prices);
    }
  }, [bookPrices]);

  //Markup for dynamic filter buttons
  //   const filterMarkup = pricePool.map((element, index) => (
  //     <Button
  //       className="search-user-button prices-filter-button"
  //       variant="outline-primary"
  //       key={index}
  //       onClick={() => filter(element.type)}
  //     >
  //       {element.type}
  //     </Button>
  //   ));

  //Markup for competitive prices
  const pricesMarkup = allPrices.map((element, index) => (
    <tr>
      <td style={{ textAlign: "left" }} key={index}>
        <Row style={{ height: "10rem" }}>
          <Col xs={4}>
            <Image
              src={element.img}
              style={{ height: "10rem", width: "7rem" }}
            />
          </Col>
          <Col xs={8}>{element.title}</Col>
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
    const pricesCopy = allPricesConst.map((bookPrice) => bookPrice);
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
              {/* <Col xs={9}>
                {!loading && pricePool.length > 0 ? (
                  <>
                    <Button
                      className="search-user-button prices-filter-button"
                      variant="outline-primary"
                      onClick={() => filter("all")}
                    >
                      All
                    </Button>
                    {filterMarkup}
                  </>
                ) : pricePool.length === 0 && !loading ? null : (
                  <tr>
                    <Alert variant="warning">Loading Books!</Alert>
                  </tr>
                )}
              </Col> */}
            </Row>
          </Card.Body>
        </Card.Body>
      </Card>

      <Card style={{ width: "80rem", height: "auto" }}>
        {!loading && allPrices.length > 0 ? (
          <a
            href="https://play.google.com/store/books/collection/cluster?clp=sgInCh8KGXByb21vdGlvbl8xMDAyMWFiX2R5bmFtaWMQRBgBIgQIBQgs:S:ANO1ljJ93fk&gsr=CiqyAicKHwoZcHJvbW90aW9uXzEwMDIxYWJfZHluYW1pYxBEGAEiBAgFCCw%3D:S:ANO1ljJCLsc&hl=en_US&gl=US"
            target="_blank"
            className="price-link"
            style={{ textAlign: "right", padding: "10px" }}
          >
            Prices gathered from google play books on{" "}
            {now.format("YYYY-MM-DD HH:mm")}
          </a>
        ) : null}
        <Card.Body>
          <Table striped bordered hover className="manage-equipment-table">
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Price</th>
                <th>Action</th>
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
                    <Alert variant="warning">Loading book prices!</Alert>
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

BookPrices.propTypes = {
  getBookPrices: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getBookPrices,
};

export default connect(mapStateToProps, mapActionsToProps)(BookPrices);
