import React from "react";
import "../assets/fonts/flat-icon/flaticon.css";
import "../assets/bootstrap/css/bootstrap.min.css";
import India from "../assets/images/india.png";
import "../css/styles.css";
import TREATY from "../assets/images/treatyimg.png";
import TREATYBREAK from "../assets/images/treatybreak.png";
import Country from "../assets/images/country.png";

export default function Countries(props) {
  return (
    <section id="countries" >
      <hr size="15" style={{ color: "purple" }} noshade />
      <div className="container about__container--narrow">
        <h2 className="page-section__title" style={{float:'left'}}>Information from the BlockChain</h2>
        <br/><br/><br/><br/><br/>
        <div class="columns">
          <div class="column">

        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <h1> Treaties </h1>
              {/*<p>Total Number of Treaties</p> */}
              <img src={TREATY} height="100" width="100" alt="" />
            </div>
            <div className="flip-card-back">
              <h1>Total Treaties</h1>
              <hr
                style={{
                  backgroundColor: "purple",
                  borderTop: "5px solid purple",
                }}
              />
              <h1>{props.number_of_treaties}</h1>
            </div>
          </div>
        </div>
        </div>

        <div class="column">
        <div className="flip-card" >
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <h1> Countries </h1>
              {/*<p>Total Number of Treaties</p> */}
              <img src={Country} height="100" width="100" alt="" />
            </div>
            <div className="flip-card-back">
              <h1>Total Countries</h1>
              <hr
                style={{
                  backgroundColor: "purple",
                  borderTop: "5px solid purple",
                }}
              />
              <h1>{props.numOfCountries}</h1>
            </div>
          </div>
        </div>
        </div>
        <div class="column">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <h1> Violations </h1>
              {/*<p>Total Number of Treaties</p> */}
              <img src={TREATYBREAK} height="100" width="100" alt="" />
            </div>
            <div className="flip-card-back">
              <h1>Treaty Violations</h1>
              <hr
                style={{
                  backgroundColor: "purple",
                  borderTop: "5px solid purple",
                }}
              />
              <h1>{props.violations_counter}</h1>
            </div>
          </div>
        </div>
        </div>
        </div>

      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </section>
  );
}
