import React from "react";
import { Link } from "react-router-dom";
import "./PriceSection.css"

function PriceSection() {
  return (
    <>
      <div className="PricingWrapper">
        <div className="pricing-section">
          <div className="price-heading">
            <h1>Choose the plan that’s right for you</h1>
          </div>
          <div className="container">
            {/*plan 1*/}
            <div class="cards">
              <div class="card" id="card-1">
                <h1 class="card-title">Bronze</h1>
                {/* <h2 class="card-price" id="starter-price">
            {" "}
            $19 <span> / month</span>{" "}
          </h2> */}
                <ul class="card-plan">
                  <li>3 books per user</li>
                  <li>5 videos per user</li>
                  <li>Book lending duration</li>
                  <li>Video lending duration</li>
                  <li>Book lending charges</li>
                  <li>Video lending charges</li>
                  <li>Annual membership fee</li>
                  <li>Overdue charges - Books/Videos per day</li>
                </ul>
                <button type="button" class="card-btn">
                  {" "}
                  Choose Plan
                </button>
              </div>
            </div>

            {/*plan 2*/}
            <div class="cards">
              <div class="card" id="card-1">
                <h1 class="card-title">Silver</h1>
                {/* <h2 class="card-price" id="starter-price">
            {" "}
            $19 <span> / month</span>{" "}
          </h2> */}
                <ul class="card-plan">
                  <li>5 books per user</li>
                  <li>7 videos per user</li>
                  <li>Book lending duration</li>
                  <li>Video lending duration</li>
                  <li>Book lending charges</li>
                  <li>Video lending charges</li>
                  <li>Annual membership fee</li>
                  <li>Overdue charges - Books/Videos per day</li>
                </ul>
                <button type="button" class="card-btn">
                  {" "}
                  Choose Plan
                </button>
              </div>
            </div>

            {/*plan 3*/}
            <div class="cards">
              <div class="card" id="card-1">
                <h1 class="card-title">Gold</h1>
                {/* <h2 class="card-price" id="starter-price">
            {" "}
            $19 <span> / month</span>{" "}
          </h2> */}
                <ul class="card-plan">
                  <li>3 books per user</li>
                  <li>5 videos per user</li>
                  <li>Book lending duration</li>
                  <li>Video lending duration</li>
                  <li>Book lending charges</li>
                  <li>Video lending charges</li>
                  <li>Annual membership fee</li>
                  <li>Overdue charges - Books/Videos per day</li>
                </ul>
                <button type="button" class="card-btn">
                  {" "}
                  Choose Plan
                </button>
              </div>
            </div>

            {/*plan 4*/}
            <div class="cards">
              <div class="card" id="card-1">
                <h1 class="card-title">Platinum</h1>
                {/* <h2 class="card-price" id="starter-price">
            {" "}
            $19 <span> / month</span>{" "}
          </h2> */}
                <ul class="card-plan">
                  <li>3 books per user</li>
                  <li>5 videos per user</li>
                  <li>Book lending duration</li>
                  <li>Video lending duration</li>
                  <li>Book lending charges</li>
                  <li>Video lending charges</li>
                  <li>Annual membership fee</li>
                  <li>Overdue charges - Books/Videos per day</li>
                </ul>
                <button type="button" class="card-btn">
                  {" "}
                  Choose Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PriceSection;
