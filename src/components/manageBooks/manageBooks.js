import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Card,
  Button,
  Col,
  Row,
  FormControl,
  Dropdown,
  Container,
  Alert,
} from "react-bootstrap";
import PropTypes from "prop-types";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./manageBooks.scss";
//components
import BookCard from "./bookCard";
import AddBookModal from "./addBookModal";

//redux
import { connect } from "react-redux";
import { getAllBooks } from "../../redux/actions/dataActions";

import { BOOK_CATRGORIES } from "../../util/consts";

function ManageBooks(props) {
  const [_books, setBooks] = useState([]);
  const [bookPool, setBookPool] = useState([]);
  const [addBookShow, setAddBookShow] = useState(false);
  const [category, setCategory] = useState("Category");
  const [available, setAvailability] = useState("Availability");

  const {
    data: { books, loading },
  } = props;

  //When component is initiated, get all books from the backend
  useEffect(() => {
    props.getAllBooks();
  }, []);

  //When books list passed from props are updated, update state variables
  useEffect(() => {
    if (books) {
      setBooks(books);
      setBookPool(books);
    }
  }, [books]);

  //Function to create listof books cards from book list in state
  let booksMarkup = _books.map((book) => (
    <BookCard key={book.ISBN} book={book} />
  ));

  //Function to change displayed books when category is set
  const setValue = (type, name, value) => {
    handleReset();

    //Depending on category update state
    if (type === "category") setCategory(name);
    else if (type === "isAvailable") setAvailability(name);

    //Filter book list
    const booksCopy = books.map((book) => book);
    const result = booksCopy.filter((item) => {
      return item[type] === value;
    });

    //Set as state to re-render book cards
    setBooks(result);
    setBookPool(result);
  };

  //Function to search through books
  const search = (input) => {
    //Get a copy of state
    const bookCopy = bookPool.map((book) => book);

    //Array of search string after splitting by spaces
    const inputs = input.toLowerCase().split(" ");

    //Book ISBN, title and author will be searched through
    const searchKeys = ["title", "author"];
    let booksArray = [];

    //If search criteria is null reset books to display all books
    if (inputs.length === 1 && inputs[0] === "") {
      booksArray = bookCopy;
    }
    //If search criteria is entered
    else {
      //Filter through book list to find matches
      inputs.forEach((word) => {
        bookCopy.filter((item) => {
          // eslint-disable-next-line array-callback-return
          return Object.keys(item).some((key) => {
            if (searchKeys.includes(key)) {
              if (word.length > 0 && item[key].toLowerCase().includes(word))
                if (item) booksArray.push(item);
            }
          });
        });
      });
    }

    //Remove duplicates and set state to be dispayed
    const result = [...new Set(booksArray)];
    setBooks(result);
  };

  // Dropdown select for category
  const categoryDropdownMarkup = BOOK_CATRGORIES.map((category, index) => (
    <Dropdown.Item
      key={index}
      onSelect={() => setValue("category", category.name, category.id)}
    >
      {category.name}
    </Dropdown.Item>
  ));

  const handleReset = () => {
    //Reset dropdown text

    setAvailability("Availability");
    setCategory("Category");

    //Reset state
    setBooks(books);
    setBookPool(books);
  };

  return (
    <div>
      <ToastContainer style={{ width: "30rem" }} />
      <Card
        className="search-box-users"
        style={{ width: "67rem", height: "8rem" }}
      >
        <Card.Body>
          <Card.Title className="search-box-books">Search Books</Card.Title>
          <Row>
            <Col xs={5}>
              <InputGroup>
                <InputGroup.Text>
                  <i className="fas fa-search"></i>
                </InputGroup.Text>
                <FormControl
                  placeholder="Search for books"
                  aria-label="Search for books"
                  aria-describedby="basic-addon2"
                  onChange={(e) => search(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col xs={7}>
              <Row>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-secondary"
                      id="dropdown-basic"
                      style={{ width: "100%" }}
                    >
                      {category}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>{categoryDropdownMarkup}</Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="danger"
                      id="dropdown-basic"
                      style={{ width: "100%" }}
                    >
                      {available}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onSelect={() =>
                          setValue("isAvailable", "Available", true)
                        }
                      >
                        Available
                      </Dropdown.Item>
                      <Dropdown.Item
                        onSelect={() =>
                          setValue("isAvailable", "Reserved", false)
                        }
                      >
                        Unavailable
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col xs={5}>
                  <Button
                    variant="outline-secondary"
                    style={{ width: "50%" }}
                    onClick={handleReset}
                  >
                    <span>
                      <i className="fas fa-times reset-icon"></i>
                    </span>
                    Reset
                  </Button>
                </Col>
              </Row>
              <Row></Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Row>
        <Col lg={4}>
          <Card className="book-card">
            <Card.Img
              variant="top"
              src="http://localhost:3001/books/default_book.png"
            />
            <Card.Body>
              <Button
                variant="info"
                className="vehicle-card-button"
                onClick={() => setAddBookShow(true)}
              >
                <span>
                  <i className="fas fa-plus-square fa-plus-square-add"></i>
                  Add Book
                </span>
              </Button>
            </Card.Body>
          </Card>
        </Col>
        {/* {loading ? (
          <p>Loading...</p>
        ) : (
          booksMarkup.map((card, index) => (
            <Col lg={4} md={4} sm={4} key={index}>
              {" "}
              {card}{" "}
            </Col>
          ))
        )} */}
        {!loading && booksMarkup.length > 0 ? (
          booksMarkup.map((card, index) => (
            <Col lg={4} md={4} sm={4} key={index}>
              {" "}
              {card}{" "}
            </Col>
          ))
        ) : booksMarkup.length === 0 && !loading ? (
          <Alert variant="warning">No Books to show!</Alert>
        ) : (
          <p>Loading...</p>
        )}
      </Row>
      <AddBookModal show={addBookShow} onHide={() => setAddBookShow(false)} />
    </div>
  );
}

ManageBooks.propTypes = {
  getAllBooks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getAllBooks,
};

export default connect(mapStateToProps, mapActionsToProps)(ManageBooks);
