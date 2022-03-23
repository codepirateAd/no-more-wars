import React, { Component } from 'react'
import '../index.css';
import './style.css';
import './script.js'
export default class CountriesAddress extends Component {
  state = {countries:[], numberofCountries: 0};

  componentDidMount = async () => {
    this.setState({countries: this.props.countries,numberofCountries:this.props.numberofCountries, index:0, current_val:0});
    const val = this.props.numberofCountries + 1;
    var span = document.getElementsByClassName("close")[0];
    var modal = document.getElementById("myModal");
    span.onclick = function() {
    modal.style.display = "none";
    }
  }

  send_transac = (x) => {
    this.setState({index: x});
    var modal = document.getElementById("myModal");
    modal.style.display = 'block';
    document.getElementById('modal_para').innerHTML=this.state.countries[x];
    // await this.props.transac(this.state.countries[x],100000000000000000);
    // window.location = '/';
}
  onChange = (event) => {
  this.setState({current_val:event.target.value});
};
  send_transac_cryto = async () => {
    // const i = parseInt(this.state.countries[parseInt(this.state.index)]);
    await this.props.transac(this.state.countries[this.state.index],this.state.current_val);
    window.location = '/';

  }
  render() {
    
    return (
      <section className="about">

    <div className="container about__container--narrow">
      <div className="page-section">
        <h2 className="page-section__title">Total Countries: {this.props.numberofCountries}</h2>
          <img className="page-section__title-style" src="assets/images/title-style.png" alt=""/>
          <p className="page-section__paragraph">The following are the addresses of countries currently in the Blockchain </p>
          <table className="flex-table">
    <thead>
        <tr>
            <th>Serial No.</th>
            <th>Country Address</th>
            <th>Transaction</th>
        </tr>
    </thead>
    <tbody>
        {[...Array(parseInt(this.state.numberofCountries))].map((x, i) =>
    <tr>
    <td data-label="Serial No.">{i+1}.</td>
    <td data-label="Country Address">{this.state.countries[i]}</td>
    <td data-label="Transaction"><button className='btn btn-primary' onClick={ () => this.send_transac(i)}>Send MATIC</button></td>
</tr>
      )}
          
    </tbody>
</table>
      </div>
    </div>
    {/* {this.state.countries}<br/>
        {this.state.numberofCountries}<br/> */}
        <div id="myModal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close">&times;</span>
              <h2>SEND TRANSACTION TO: (IN WEI)</h2>
            </div>
            <div className="modal-body">
            <b>ADDRESS: </b> <p id='modal_para' style={{marginLeft: '15px'}}>Address </p>
              <b>VALUE: </b> <input type='number' id="value_" onChange={this.onChange} style={{marginLeft: '15px'}}/>
            </div>
            <div className="modal-footer">
              <h3><button className='btn btn-primary' onClick={this.send_transac_cryto}>SEND MATIC</button></h3>
            </div>
          </div>
        </div>
  </section>
        
    )
  }
}
