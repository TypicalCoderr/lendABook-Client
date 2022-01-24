import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Card,
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
import "../manageBooks/manageBooks.scss";

// import BooksPurchaseCard from "./BooksPurchaseCard";
import BooksPurchaseModal from "./BooksPurchaseModal";

//redux
import { connect } from "react-redux";
import { getCompanyPurchasedBooks } from "../../redux/actions/dataActions";

function CompanyBookPurchases(props) {
  const [_books, setBooks] = useState([]);
  const [selectBook, setSelectBook] = useState(null);
  const [bookPool, setBookPool] = useState([]);
  const [category, setCategory] = useState([]);
  const [bookModalShow, setBookModalShow] = React.useState(false);

  const {
    data: { bookPurchases, loading },
  } = props;

  useEffect(() => {
    props.getCompanyPurchasedBooks();
  }, []);

  useEffect(() => {
    if (bookPurchases) {
      setBooks(bookPurchases);
      setBookPool(bookPurchases);
    }
  }, [bookPurchases]);

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
      onClick={() => handleBookClick(book.ISBN, book)}
    >
      <Image
        variant="top"
        src="http://localhost:3001/books/default_book.png"
        className="book-card-image"
        style={{ marginLeft: "5rem" }}
      />
      {/* <img src="http://localhost:3001/books/default_book.png" /> */}
      <Badge
        pill
        className="book-card-badge"
        style={{ marginLeft: "4rem" }}
        variant={book.isNewBook ? "success" : "warning"}
      >
        {book.isNewBook ? "New" : "Copies"}
      </Badge>
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

  const setAllBooks = () => {
    setCategory(0);
    const booksCopy = bookPurchases.map((booksPurchase) => booksPurchase);
    setBookPool(booksCopy);
    setBooks(booksCopy);
  };

  const setNewBooks = () => {
    setCategory(1);
    const booksCopy = bookPurchases.map((booksPurchase) => booksPurchase);
    const result = booksCopy.filter((item) => {
      return item.isNewBook;
    });
    setBookPool(result);
    setBooks(result);
  };

  const setNewCopies = () => {
    setCategory(2);
    const booksCopy = bookPurchases.map((booksPurchase) => booksPurchase);
    const result = booksCopy.filter((item) => {
      return !item.isNewBook;
    });
    setBookPool(result);
    setBooks(result);
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

  console.log(props);

  return (
    <div>
      <Card style={{ width: "87rem", height: "10rem" }}>
        <Card.Body>
          <Card.Title className="search-card-title">
            Search Purchase Books
          </Card.Title>
          <Row>
            <Col>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <i className="fas fa-search"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>

                <FormControl
                  placeholder="Search for a user"
                  aria-label="Search for a user"
                  aria-describedby="basic-addon1"
                  onChange={(e) => search(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col xs={7}>
              <Button
                className="search-user-button"
                variant="outline-primary"
                active={category === 0}
                onClick={setAllBooks}
              >
                All Books
              </Button>{" "}
              <Button
                className="search-user-button"
                variant="outline-success"
                active={category === 1}
                onClick={setNewBooks}
              >
                New Books
              </Button>{" "}
              <Button
                className="search-user-button"
                variant="outline-warning"
                active={category === 2}
                onClick={setNewCopies}
              >
                New Copies
              </Button>{" "}
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {!loading && booksMarkup.length > 0 ? (
        chunkedBooksMarkup.map((chunk, index) => (
          <CardColumns key={index} style={{ width: "87rem" }}>
            {" "}
            {chunk}{" "}
          </CardColumns>
        ))
      ) : booksMarkup.length === 0 && !loading ? (
        <Alert variant="warning">No Books to show!</Alert>
      ) : (
        <p>Loading...</p>
      )}

      <BooksPurchaseModal
        book={props}
        show={bookModalShow}
        onBookClick={selectBook}
        onHide={() => setBookModalShow(false)}
      />
    </div>
  );
}

CompanyBookPurchases.propTypes = {
  getCompanyPurchasedBooks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getCompanyPurchasedBooks,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CompanyBookPurchases);
