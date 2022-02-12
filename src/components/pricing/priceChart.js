import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "./priceChart.scss";

function PriceChart() {
  return (
    <div className="pricing">
      <Container class="container">
        <h3 className="section-header">Choose your Subscription</h3>
        <hr />
        <Row class="card-group">
          <Card class="card" className="text-center">
            <Card.Title class="card-header-bronze">
              <h4 class="card-title">Bronze</h4>
            </Card.Title>
            <Card.Body class="card-body">
              <h1 class="card-title pricing-card-title">
                LKR.1000 <small class="text-muted">/y</small>
              </h1>
              <ul class="list-unstyled mt-3 mb-4">
                <li>3 books per user</li>
                <li>5 videos per user</li>
                <li>Book - 3 weeks</li>
                <li>Video lending duration</li>
                <li>Book lending charges</li>
                <li>Video lending charges</li>
                <li>Annual membership fee</li>
                <li>Overdue charges - Books/Videos per day</li>
              </ul>
              <Button
                variant="outline-secondary"
                size="lg"
                href="/user/register"
              >
                Choose plan
              </Button>
            </Card.Body>
          </Card>
          <Card class="card" className="text-center">
            <Card.Title class="card-header-silver">
              <h4 class="card-title">Silver</h4>
            </Card.Title>
            <Card.Body class="card-body">
              <h1 class="card-title pricing-card-title">
                LKR.2000 <small class="text-muted">/y</small>
              </h1>
              <ul class="list-unstyled mt-3 mb-4">
                <li>5 books per user</li>
                <li>7 videos per user</li>
                <li>Book - 4 weeks</li>
                <li>Video lending duration</li>
                <li>Book lending charges</li>
                <li>Video lending charges</li>
                <li>Annual membership fee</li>
                <li>Overdue charges - Books/Videos per day</li>
              </ul>
              <Button
                variant="outline-secondary"
                size="lg"
                href="/user/register"
              >
                Choose plan
              </Button>
            </Card.Body>
          </Card>
          <Card class="card" className="text-center">
            <Card.Title class="card-header-gold">
              <h4 class="card-title">Gold</h4>
            </Card.Title>
            <Card.Body class="card-body">
              <h1 class="card-title pricing-card-title">
                LKR.3000 <small class="text-muted">/y</small>
              </h1>
              <ul class="list-unstyled mt-3 mb-4">
                <li>7 books per user</li>
                <li>9 videos per user</li>
                <li>Book - 4 weeks</li>
                <li>Video lending duration</li>
                <li>Book lending charges</li>
                <li>Video lending charges</li>
                <li>Annual membership fee</li>
                <li>Overdue charges - Books/Videos per day</li>
              </ul>
              <Button
                variant="outline-secondary"
                size="lg"
                href="/user/register"
              >
                Choose plan
              </Button>
            </Card.Body>
          </Card>
          <Card class="card" className="text-center">
            <Card.Title className="card-header-platinum">
              <h4 class="card-title">Platinum</h4>
            </Card.Title>
            <Card.Body class="card-body">
              <h1 class="card-title pricing-card-title">
                LKR.5000 <small class="text-muted">/y</small>
              </h1>
              <ul class="list-unstyled mt-3 mb-4">
                <li>10 books per user</li>
                <li>10 videos per user</li>
                <li>Book - 5 weeks</li>
                <li>Video lending duration</li>
                <li>Book lending charges</li>
                <li>Video lending charges</li>
                <li>Annual membership fee</li>
                <li>Overdue charges - Books/Videos per day</li>
              </ul>
              <Button
                variant="outline-secondary"
                size="lg"
                href="/user/register"
              >
                Choose plan
              </Button>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default PriceChart;
