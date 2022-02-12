import React, { useEffect, useState } from "react";
import {
  Container,
  CardColumns,
  InputGroup,
  FormControl,
  Row,
  Col,
  Dropdown,
  Button,
  Alert,
} from "react-bootstrap";

import ReserveNow from "../../components/reserve_now/reserve_now";
import Navbar from "../../components/navbar/navbar";
import Book from "../../components/book/book";
import ReserveBookModal from "../../components/reserveBooks/reserveBookModal";
import Footer from "../../components/footer/footer";

import "./books.scss";

import { connect, useSelector } from "react-redux";
import { getBook } from "../../redux/actions/dataActions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BOOK_CATRGORIES } from "../../util/consts";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Books(props) {
  const [_books, setBooks] = useState([]);
  const [bookPool, setBookPool] = useState([]);
  const [category, setCategory] = useState("Category");
  const [bookModalShow, setBookModalShow] = React.useState(false);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.length;
  };

  const {
    data: { books, loading },
  } = props;

  useEffect(() => {
    if (books) {
      setBooks(books);
      setBookPool(books);
    }
  }, [books]);

  const handleBookClick = (ISBN) => {
    if (!props.isBlacklisted) {
      setBookModalShow(true);
    }
    if (props.isVerified && !props.isBlacklisted) {
      props.getBook(ISBN);
    }
  };

  const chunk = (arr, size) => {
    let clone = [...arr];
    let result = [];
    while (clone.length) {
      result.push(clone.splice(0, size));
    }
    return result;
  };

  let booksMarkup =
    _books.length > 0 &&
    _books.map((book) => (
      <div key={book.ISBN} onClick={() => handleBookClick(book.ISBN)}>
        <Book book={book}></Book>
      </div>
    ));

  let chunkedBooksMarkup = booksMarkup.length > 0 ? chunk(booksMarkup, 3) : "";

  const search = (input) => {
    if (books.length > 0) {
      const bookCopy = bookPool.map((book) => book);
      const inputs = input.toLowerCase().split(" ");
      const searchKeys = ["title", "author", "summary"];
      let booksArray = [];
      if (inputs.length === 1 && inputs[0] === "") {
        booksArray = bookCopy;
      } else {
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
      const result = [...new Set(booksArray)];
      setBooks(result);
    }
  };

  const setValue = (type, name, value) => {
    if (books.length > 0) {
      handleReset();

      if (type === "category") setCategory(name);

      const booksCopy = books.map((book) => book);
      const result = booksCopy.filter((item) => {
        return item[type] === value;
      });

      setBooks(result);
      setBookPool(result);
    }
  };

  const handleReset = () => {
    //Reset dropdown text
    setCategory("Category");

    //Reset state
    setBooks(books);
    setBookPool(books);
  };

  const categoryDropdownMarkup = BOOK_CATRGORIES.map((category) => (
    <Dropdown.Item
      onSelect={() => setValue("category", category.name, category.id)}
    >
      {category.name}
    </Dropdown.Item>
  ));

  return (
    <div className="top_image-books">
      <Navbar />
      <ToastContainer />
      <Container style={{ textAlign: "center" }}>
        {/* Alert message to be shown if user has not yet uploaded ID images */}
        <Alert
          variant="danger"
          className="not-verified-message"
          hidden={
            !props.authenticated ||
            props.role === "admin" ||
            props.userImageURL ||
            props.isVerified
          }
        >
          {`Hello ${props.firstName}! `}
          You are <b>not verified</b>.{" "}
          <a href="/uploadImages">
            Click here to <b>upload verification images</b>
          </a>
        </Alert>
        <Alert
          variant="danger"
          className="not-verified-message"
          hidden={!props.isBlacklisted}
        >
          You have been <b>blacklisted</b>. You will not be able to reserve
          books.
        </Alert>

        <h2 className="title">Reserve Books</h2>
        <p className="description">Explore books with best lending charges </p>

        <ReserveNow history={props.history} />

        <Row className="book-search">
          <Col md={4} style={{ paddingRight: 0, marginRight: -60 }}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="fas fa-search"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Find books"
                aria-label="Find book"
                aria-describedby="basic-addon2"
                onChange={(e) => search(e.target.value)}
              />
            </InputGroup>
          </Col>

          <Col md={4}>
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-secondary"
                id="dropdown-basic"
                style={{ width: "55%" }}
              >
                {category}
              </Dropdown.Toggle>
              <Dropdown.Menu>{categoryDropdownMarkup}</Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={2} style={{ marginLeft: -120, marginRight: 160 }}>
            <Button
              onClick={handleReset}
              variant="outline-danger"
              style={{ width: "70%" }}
            >
              <span>
                <i className="fas fa-times reset-icon"></i>{" "}
              </span>
              Reset
            </Button>
          </Col>
          <Col md={2}>
            <Link
              variant="outline-primary"
              style={{ width: "100%" }}
              to="/cart-books"
              hidden={!props.authenticated}
            >
              <Button renderAs="button" variant="outline-primary">
                <span>
                  <i className="fas fa-cart-plus" aria-hidden="true">
                    {" "}
                  </i>{" "}
                </span>
                Book Cart
                <div className="item_count">{getCartCount()}</div>
              </Button>
            </Link>
          </Col>
        </Row>
        {!loading && (_books.length === 0 || Object.keys(_books).length === 0) && (
          <Alert
            variant="warning"
            className="no-vehicle-alert"
            style={{ marginBottom: "10rem" }}
          >
            No books found! Try changing the reservation dates.
          </Alert>
        )}
        {!loading &&
          _books.length > 0 &&
          chunkedBooksMarkup.map((chunk) => (
            <CardColumns style={{ marginTop: 20 }}>{chunk}</CardColumns>
          ))}
      </Container>
      <ReserveBookModal
        history={props.history}
        isVerified={props.isVerified}
        show={bookModalShow}
        onHide={() => setBookModalShow(false)}
      />
      <Footer />
    </div>
  );
}

Books.propTypes = {
  getBook: PropTypes.func.isRequired,
  user: PropTypes.object,
  subscription: PropTypes.object,
};

const mapStateToProps = (state) => ({
  data: state.data,
  firstName: state.user.firstName,
  isVerified: state.user.isVerified,
  isBlacklisted: state.user.isBlacklisted,
  userImageURL: state.user.userImageURL,
  authenticated: state.user.authenticated,
  role: state.user.role,
  getBook: PropTypes.func.isRequired,
  books: state.data.books,
  subscription: state.user.subscription,
});

const mapActionsToProps = {
  getBook,
};

export default connect(mapStateToProps, mapActionsToProps)(Books);
