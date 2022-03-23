import "../assets/fonts/flat-icon/flaticon.css";
import "../assets/bootstrap/css/bootstrap.min.css";
import "../css/styles.css";
import React, { Component } from 'react'

export default class Treaties extends Component {

  render() {
    return (
      <div id="treaties">
      <div className="container about__container--narrow">
          <h2 className="page-section__title" style={{marginTop: '50px',float:'left'}}>Recent Treaties</h2>
          <br />
        {[...Array(parseInt(this.props.number_of_treaties>3?3:this.props.number_of_treaties))].map((x, i) =>
        
          <div className="card" style={{marginTop: '100px'}}>
            <h3><b>Treaty id: {this.props.number_of_treaties-(i+1)}</b></h3>
            <p>{this.props.all_treaties[i].country1}</p>
            <p>{this.props.all_treaties[i].country2}</p>
            <p className="price">Signed: {this.props.all_treaties[i].agreement_country1 && this.props.all_treaties[i].agreement_country2 ?<i className="fa fa-check" style={{color:'green'}}></i>:<i className="fa fa-close" style={{color:'red'}}></i>}</p>
            <p>{this.props.all_treaties[i].treaty_text}</p>
          
          </div> 
            )}
        </div>
    </div>
    )
  }
}

