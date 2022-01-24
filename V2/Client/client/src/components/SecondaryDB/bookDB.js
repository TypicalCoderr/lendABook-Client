import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Card,
  Badge,
  Button,
  Col,
  Row,
  FormControl,
  Dropdown,
  Container,
  Alert,
} from "react-bootstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getExternalBooks } from "../../redux/actions/dataActions";

import { BOOK_CATRGORIES } from "../../util/consts";

import ViewBookModal from "./ViewBookModal";

// import BookCard from "./bookCard";

function BookDB(props) {
  const [_books, setBooks] = useState([]);
  const [bookPool, setBookPool] = useState([]);
  const [category, setCategory] = useState("Category");
  const [selectBook, setSelectBook] = useState(null);
  const [bookModalShow, setBookModalShow] = React.useState(false);

  const {
    data: { externalDB, loading },
  } = props;

  useEffect(() => {
    props.getExternalBooks();
  }, []);

  useEffect(() => {
    if (externalDB) {
      setBooks(externalDB);
      setBookPool(externalDB);
    }
  }, [externalDB]);

  const handleBookClick = (ISBN, book) => {
    if (_books.some((book) => book.ISBN == ISBN)) {
      setSelectBook(book);
      setBookModalShow(true);
    }
  };

  let booksMarkup = _books.map((book) => (
    <Card
      className="book-card"
      key={book.ISBN}
      style={{ height: "25rem" }}
      onClick={() => handleBookClick(book.ISBN, book)}
    >
      <Card.Img className="vehicle-image" src={book.bookCover}></Card.Img>

      <Card.Body>
        <Badge variant="secondary">Title</Badge>
        <span>
          {"	"}
          {book.title.substring(0, 35)}
        </span>
        <br />
        <Badge variant="secondary">Author</Badge>
        <span>
          {"	"}
          {book.author.substring(0, 35)}
        </span>
      </Card.Body>
    </Card>
  ));

  const setValue = (type, name, value) => {
    handleReset();

    //Depending on category update state
    if (type === "category") setCategory(name);

    //Filter book list
    const booksCopy = externalDB.map((book) => book);
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

    setCategory("Category");

    //Reset state
    setBooks(externalDB);
    setBookPool(externalDB);
  };

  return (
    <div>
      <ToastContainer style={{ width: "30rem" }} />
      <Card
        className="search-box-users"
        style={{ width: "96rem", height: "8rem" }}
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
      <ViewBookModal
        book={props}
        show={bookModalShow}
        _book={selectBook}
        onHide={() => setBookModalShow(false)}
      />
    </div>
  );
}

BookDB.propTypes = {
  getExternalBooks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getExternalBooks,
};

export default connect(mapStateToProps, mapActionsToProps)(BookDB);
