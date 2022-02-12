import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Card,
  Form,
  Button,
  Col,
  CardColumns,
  Row,
  FormControl,
  Dropdown,
  Badge,
  Image,
  Container,
  Alert,
} from "react-bootstrap";
import PropTypes from "prop-types";

import { getAPIbooks } from "../../redux/actions/dataActions";

import "../manageBooks/manageBooks.scss";

import { connect } from "react-redux";

function SearchBooks(props) {
  const [_books, setBooks] = useState([]);
  const [bookPool, setBookPool] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [addBookShow, setAddBookShow] = useState(false);
  const [category, setCategory] = useState("Category");
  const [available, setAvailability] = useState("Availability");

  const {
    data: { APIResult, loading },
  } = props;

  //When component is initiated, get all books from the backend
  useEffect(() => {
    props.getAPIbooks();
  }, []);

  //When books list passed from props are updated, update state variables
  useEffect(() => {
    if (APIResult) {
      setBooks(APIResult);
      setBookPool(APIResult);
    }
  }, [APIResult]);

  let booksMarkup = _books.map((book) => (
    <Card
      className="book-card"
      //   key={book && book.volumeInfo}
      //   onClick={() => handleBookClick(book.ISBN, book)}
    >
      <Image
        variant="top"
        src={
          book &&
          book.volumeInfo &&
          book.volumeInfo.imageLinks &&
          book.volumeInfo.imageLinks.thumbnail
        }
        className="book-card-image"
        style={{ marginLeft: "8rem" }}
      />
      <Card.Body>
        <Badge variant="secondary">Title</Badge>
        <span>
          {"	"}
          {book && book.volumeInfo && book.volumeInfo.title.substring(0, 45)}
        </span>
        <br />
        <Badge variant="secondary">published on</Badge>
        <span>
          {"	"}
          {book && book.volumeInfo && book.volumeInfo.publishedDate}
        </span>
      </Card.Body>
    </Card>
  ));

  //Divide cards into arrays of given size
  const chunk = (arr, size) => {
    let clone = [...arr];
    let result = [];
    while (clone.length) {
      result.push(clone.splice(0, size));
    }
    return result;
  };

  let chunkedBooksMarkup = chunk(booksMarkup, 3);

  const handleChange = (e) => {
    const key = e.target.value;
    setSearchKey(key);
  };

  const search = (e) => {
    //Array of search string after splitting by spaces
    e.preventDefault();

    const inputs = searchKey.toLowerCase().split(" ");
    props.getAPIbooks(inputs);
  };

  return (
    <div>
      <Card style={{ width: "87rem", height: "6rem" }}>
        <Card.Body>
          <Card.Title className="search-card-title">Find Books</Card.Title>
        </Card.Body>
        <Row>
          <Col>
            <Form onSubmit={search}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <i className="fas fa-search"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>

                <FormControl
                  name="searchKey"
                  placeholder="Search Books from Google Book API"
                  aria-label="Search Books from Google Book API"
                  aria-describedby="basic-addon1"
                  onChange={handleChange}
                />
                <Button type="submit">Search</Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </Card>
      {!loading && booksMarkup.length > 0 ? (
        chunkedBooksMarkup.map((chunk, index) => (
          <CardColumns key={index} style={{ width: "87rem" }}>
            {" "}
            {chunk}{" "}
          </CardColumns>
        ))
      ) : booksMarkup.length === 0 && !loading ? (
        <Alert variant="warning" style={{ width: "87rem" }}>
          No Books to show!
        </Alert>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

SearchBooks.propTypes = {
  getAPIbooks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getAPIbooks,
};

export default connect(mapStateToProps, mapActionsToProps)(SearchBooks);
