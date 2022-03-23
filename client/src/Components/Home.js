import '../assets/fonts/flat-icon/flaticon.css';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../css/styles.css';
import Treaties from './Treaties';
import Countries from './Countries';
import Contact from './Contact';
import { Link } from 'react-router-dom';
import React, { Component } from 'react'

export default class Home extends Component {
  componentDidMount = async () => {
    console.log(this.props.numberofCountries_);
  }
  render() {
    return (
      <div>
      <div id="content-wrapper">
<header className="header header--bg">
  <div className="container">
    <div className="header__content text-center" >
      {/* <span className="header__content__block">Remember</span> */}
      <h1 className="header__content__title">War makes rattling good history but <br /> peace is poor reading </h1>
      <ul className="header__content__sub-title">
        <li style={{fontSize:'25px'}}>-Thomas Hardy</li>
        
      </ul>
    </div>
    <div className="social-icon pull-right">
      <ul>
        <li><a href="#"></a></li>
        <li><a href="#"></a></li>
        <li><a href="#"></a></li>
        <li><a href="#"></a></li>
      </ul>
    </div>
  </div>
</header>
      <Treaties number_of_treaties={this.props.number_of_treaties} all_treaties={this.props.all_treaties}></Treaties>
      <br/><br/>
      <Countries number_of_treaties={this.props.number_of_treaties} 
      violations_counter={this.props.violations_counter}
      numOfCountries={this.props.numberofCountries_}
      />
      <div className="container" >
      <h2 className="page-section__title" >Balance of Smart Contract: <span style={{color:'green'}}>${this.props.balance} Billion Dollars</span></h2>
      </div><br/><br/><br/>
      <Contact/>
</div>
  </div>
    )
  }
}

