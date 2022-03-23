import React, { Component } from 'react'
import "./style.css";

export default class AddTreaty extends Component {
    state = {treaty_text_form: '', treaty_address_form: '',error_message:''};

    // number_of_treaties
  componentDidMount = async () => {

    // const res =await this.props.number_of_treaties();
    // await this.setState({number_of_treaties: res});
    // const res_treaties = await this.props.all_treaties;
    // await this.setState({all_treaties_local: res_treaties});
  }
  onChangeTreatyText = (event) => {
        this.setState({treaty_text_form: event.target.value});
  }
  onChangeTreatyAddress = (event) => {
    this.setState({treaty_address_form: event.target.value});
}

  sign_treaty = async (_text,_id) => {
    await this.props.sign_treaty(_text,parseInt(_id));
    window.location = '/';
  }
  submitForm = async (event) => {
    event.preventDefault();
    this.setState({error_message: ''});

    try{
      await this.props.add_treaty(this.state.treaty_text_form,this.state.treaty_address_form);
      window.location='/';
    }
    catch(error){
      this.setState({error_message: 'Not a valid country address'});
    }
  }
  render() {
    return (
        <div>
        <div className="container about__container--narrow">
          <h2 className="page-section__title">Add Treaty</h2><br/><br/>  
          <form onSubmit={this.submitForm}>
            <label htmlFor="fname">Address of the opposite country</label>
            <input
              type="text"
              id="fname"
              name="firstname"
              placeholder="Address of the other country for the treaty "
              onChange={this.onChangeTreatyAddress}
              required
            />
            <br />
            <br />
            <label htmlFor="country">Enter Treaty Text</label><br/>
            <textarea placeholder='Enter treaty text' required onChange={this.onChangeTreatyText}>

            </textarea>
            <input type="submit" value="Submit" />
            <span id="error_message" style={{color: 'red'}}>{this.state.error_message}</span>
          </form>
        </div>
        <br />
        <br />
        <div className="container about__container--narrow">
          <h2 className="page-section__title">ALL TREATIES</h2>
          <br />
        {[...Array(parseInt(this.props.number_of_treaties))].map((x, i) =>
        
          <div className="card" style={{marginTop: '100px'}}>
            <h3><b>Treaty id: {this.props.number_of_treaties-(i+1)}</b></h3>
            <p>{this.props.all_treaties[i].country1}</p>
            <p>{this.props.all_treaties[i].country2}</p>
            <p className="price">Signed: {this.props.all_treaties[i].agreement_country1 && this.props.all_treaties[i].agreement_country2 ?<i className="fa fa-check" style={{color:'green'}}></i>:<i className="fa fa-close" style={{color:'red'}}></i>}</p>
            <p>{this.props.all_treaties[i].treaty_text}</p>
            <p>
              {/* <button className="primary btn-primary" onClick={() => this.sign_treaty(this.props.all_treaties[i].treaty_text,parseInt(i))}>SIGN</button> */}
              <button className="primary btn-primary" onClick={() => this.sign_treaty(this.props.all_treaties[i].treaty_text,parseInt(this.props.number_of_treaties-(i+1)))}>SIGN</button>
            </p>
          </div> 
            )}
        </div>
        {/* <div id="myModal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close">&times;</span>
              <h2>Confirm Vote </h2>
            </div>
            <div className="modal-body">
              <b>Vote for Address : </b> <input type='text' id="value_" style={{marginLeft: '15px'}}/>
            </div>
            <div className="modal-footer">
              <h3><button className='btn btn-primary'>CONFIRM VOTE</button></h3>
            </div>
          </div>
        </div> */}
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
      </div>
    )
  }
}
