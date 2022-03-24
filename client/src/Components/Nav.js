import '../css/styles.css';
import { Link } from 'react-router-dom';
import Contact from './Contact';
import React, { Component } from 'react'

export default class Nav extends Component {
  componentDidMount = () => {

  }
  render() {
    return (
      <div>
        <header className="header header--bg">
  <div className="container">
    <nav className="navbar">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span> 
        </button>
        <a className="navbar-brand" href="/">&nbsp;No More Wars</a> 
      </div>
      <div className="collapse navbar-collapse" id="myNavbar">
        <ul className="nav navbar-nav">
          <li><Link to="/">HOME</Link></li>
          { this.props.is_country_flag && <li><Link to="/addcountry">ADD COUNTRY</Link></li>}
          { this.props.is_country_flag && <li><Link to="/addtreaty">TREATIES</Link></li>}
          { this.props.is_country_flag && <li><Link to="/treatybreak">VIOLATION OF TREATY</Link></li>}
          <li><Link to= "/countriesAddress">COUNTRIES ADDRESSES</Link></li>
        </ul>
      </div>
    </nav>
   
  </div>
</header>
    </div>
    )
  }
}
