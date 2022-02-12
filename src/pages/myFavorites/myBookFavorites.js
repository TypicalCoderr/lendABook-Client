import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  CardColumns,
  Badge,
  InputGroup,
  FormControl,
  Row,
  Col,
  Dropdown,
  Button,
  Alert,
} from "react-bootstrap";
import Navbar from "../../components/navbar/navbar";
import "./myFavorites.scss";
import Footer from "../../components/footer/footer";

import { getMyBookFavorites } from "../../redux/actions/dataActions";

//REDUX
import { connect } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getBook } from "../../redux/actions/dataActions";
import ViewFavorite from "../../components/myFavorites/viewFavorite";

import { BOOK_CATRGORIES } from "../../util/consts";
import PropTypes from "prop-types";

function MyBookFavorites(props) {
  const [_books, setBooks] = useState([]);
  const [bookPool, setBookPool] = useState([]);
  const [category, setCategory] = useState("Category");
  const [bookModalShow, setBookModalShow] = React.useState(false);

  useEffect(() => {
    props.getMyBookFavorites();
  }, []);

  const {
    data: { bookFavorites, loading },
    user: { id },
  } = props;

  useEffect(() => {
    if (bookFavorites) {
      setBooks(bookFavorites);
      setBookPool(bookFavorites);
    }
  }, [bookFavorites]);

  //   const handleBookClick = (ISBN) => {
  //     if (!props.isBlacklisted) {
  //       setBookModalShow(true);
  //     }
  //     if (props.isVerified && !props.isBlacklisted) {
  //       props.getBook(ISBN);
  //     }
  //   };

  const handleBookClick = (ISBN) => {
    if (!props.isBlacklisted) {
      setBookModalShow(true);
    }
    if (props.isVerified && !props.isBlacklisted) {
      props.getBook(ISBN);
    }
  };

  let booksMarkup = _books.map((book) => (
    <Card
      className="book-card"
      key={book.ISBN}
      style={{ height: "25rem" }}
      onClick={() => handleBookClick(book.ISBN)}
    >
      <Card.Img className="vehicle-image" src={book.bookCover}></Card.Img>
      {/* <img src="http://localhost:3001/books/default_book.png" /> */}
      {/* <Badge
        pill
        className="book-card-badge"
        style={{ marginLeft: "4rem" }}
        variant={book.isNewBook ? "success" : "warning"}
      >
        {book.isNewBook ? "New" : "Copies"}
      </Badge> */}
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

  const chunk = (arr, size) => {
    let clone = [...arr];
    let result = [];
    while (clone.length) {
      result.push(clone.splice(0, size));
    }
    return result;
  };

  let chunkedBooksMarkup = chunk(booksMarkup, 3);

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

        <h2 className="title">My Favorites</h2>
        <p className="description">
          {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "} */}
        </p>
        <Alert variant="light" className="user-card" align="end"></Alert>

        {!loading && (_books.length === 0 || Object.keys(_books).length === 0) && (
          <Alert
            variant="warning"
            className="no-vehicle-alert"
            style={{ marginBottom: "10rem" }}
          >
            No book favorites yet!.
          </Alert>
        )}
        {!loading &&
          _books.length > 0 &&
          chunkedBooksMarkup.map((chunk) => (
            <CardColumns style={{ marginTop: 20 }}>{chunk}</CardColumns>
          ))}
      </Container>
      <ViewFavorite
        history={props.history}
        isVerified={props.isVerified}
        show={bookModalShow}
        onHide={() => setBookModalShow(false)}
      />
      <Footer />
    </div>
  );
}

MyBookFavorites.propTypes = {
  getBook: PropTypes.func.isRequired,
  user: PropTypes.object,
  getMyBookFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
  isVerified: state.user.isVerified,
  isBlacklisted: state.user.isBlacklisted,
  userImageURL: state.user.userImageURL,
  authenticated: state.user.authenticated,
  role: state.user.role,
  getBook: PropTypes.func.isRequired,
  books: state.data.books,
});

const mapActionsToProps = {
  getBook,
  getMyBookFavorites,
};

export default connect(mapStateToProps, mapActionsToProps)(MyBookFavorites);
