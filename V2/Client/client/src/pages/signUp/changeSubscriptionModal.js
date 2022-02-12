import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";

function ChangeSub(props) {


  const newProps = { ...props };
  return (
    <div>
      <Modal
        {...newProps}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Change subscription
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
              
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ChangeSub;
