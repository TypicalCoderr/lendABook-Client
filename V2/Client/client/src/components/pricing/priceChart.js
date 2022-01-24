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
                $9.99 <small class="text-muted">/ mo</small>
              </h1>
              <ul class="list-unstyled mt-3 mb-4">
                <li>3 books per user</li>
                <li>5 videos per user</li>
                <li>Book lending duration</li>
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
                $49.99 <small class="text-muted">/ mo</small>
              </h1>
              <ul class="list-unstyled mt-3 mb-4">
                <li>3 books per user</li>
                <li>5 videos per user</li>
                <li>Book lending duration</li>
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
                $79.99 <small class="text-muted">/ mo</small>
              </h1>
              <ul class="list-unstyled mt-3 mb-4">
                <li>3 books per user</li>
                <li>5 videos per user</li>
                <li>Book lending duration</li>
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
                $99.99 <small class="text-muted">/ mo</small>
              </h1>
              <ul class="list-unstyled mt-3 mb-4">
                <li>3 books per user</li>
                <li>5 videos per user</li>
                <li>Book lending duration</li>
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
