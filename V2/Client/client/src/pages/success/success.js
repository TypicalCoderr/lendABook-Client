import React from "react";

import Navbar from "../../components/navbar/navbar";

import { connect } from "react-redux";
import { Button, Container } from "react-bootstrap";

function Success(props) {
  return (
    <div className="top_image-success">
      <Navbar />

      <Container style={{ textAlign: "center" }}>
        <h2 className="success-title">Successfully Reserved books!</h2>
        <p className="success-description">
          Fringilla ut morbi tincidunt augue interdum velit euismod in
          pellentesque. At risus viverra adipiscing at in tellus integer. Id
          aliquet lectus proin nibh nisl condimentum id venenatis. Laoreet id
          donec ultrices tincidunt. Bibendum at varius vel pharetra. Viverra
          adipiscing at in tellus integer. Amet volutpat consequat mauris nunc
          congue nisi vitae suscipit. Pretium viverra suspendisse potenti nullam
          ac tortor. Et egestas quis ipsum suspendisse. Cursus in hac habitasse
          platea dictumst quisque. Mi proin sed libero enim sed faucibus turpis
          in eu.
        </p>
        <Button href="/my-rents" className="success-button">
          View Reservations
        </Button>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({});

Success.propTypes = {};

export default connect(mapStateToProps)(Success);
