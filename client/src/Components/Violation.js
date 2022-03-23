import "./style.css";
import React, { Component } from 'react'

export default class Violation extends Component {
  state = { current_treaty_id: null,treaty_text: '',break_treaty_vote_id: null,vote_for_country: '',vote_text:'',vote_id: null,
            victim_address: null
          }
  
  componentDidMount = async () => {
        var span = document.getElementsByClassName("close")[0];
        var modal = document.getElementById("myModal");
        span.onclick = function() {
        modal.style.display = "none";
        }
        var span1 = document.getElementsByClassName("close")[1];
        var modal1 = document.getElementById("myModal2");
        span1.onclick = function() {
        modal1.style.display = "none";
        }
      }
  
  vote_to_country = async () => {
     // vote id = treaty id
    await this.props.vote_break_treaty(this.state.vote_text,this.state.victim_address,this.state.vote_id,2);
  }

  vote_break_treaty = async (_break_text,treaty_id,victim_address) => {  // vote id = treaty id
    this.setState({vote_text: _break_text, vote_id: treaty_id,victim_address:victim_address});
    var modal = document.getElementById("myModal2");
    modal.style.display = 'block';
      }

  call_break_treaty = async () => {
    const _id =this.state.current_treaty_id;
    const _text ="Break"+this.props.violations_counter;
    await this.props.break_treaty(_id,_text);
    window.location = '/';
  }
  // get_all_violation_

  onChangeId= (event) => {
    this.setState({ current_treaty_id: parseInt(event.target.value) });
  };
 
  afterSubmission = async (event) => {
    event.preventDefault();
    var modal = document.getElementById("myModal");
    modal.style.display = 'block';
    try{
    await this.setState({treaty_text: this.props.all_treaties[this.props.number_of_treaties-(this.state.current_treaty_id+1)].treaty_text});
  }
    catch(err){
    console.log('No such id');

    }
   
  };
  render() {
    return (
      <div>
        <div className="container about__container--narrow">
          <h2 className="page-section__title">Violation of Treaty</h2>
          <form onSubmit={this.afterSubmission}>
            
            <br />
            <br />
            <label htmlFor="country">Treaty ID </label><br/>
            <input
              type="number"
              id="treaty_id"
              placeholder="Treaty id"
              required
              onChange={this.onChangeId}
              style={{width: '100%',height:'50px'}}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <br />
        <br />
        <br />
        <br />
        
        <div className="container about__container--narrow">
          <h2 className="page-section__title">Pending Violation List</h2>
          
        {[...Array(parseInt(this.props.violations_counter))].map((x, i) =>
          
          <div className="card" style={{marginTop: '100px',display: this.props.all_violated_treaty_votes[i]>0?`block`:`none`}} >
            <h3><b>Treaty id: {this.props.all_violated_treaty_id[i]}</b></h3>
            <p className="price">Total votes: {this.props.all_violated_treaty_votes[i]}</p>
            <p>{this.props.all_treaties[i].treaty_text}</p>
            <p>Vote for {this.props.victims_list[i]}</p>
            <p>
              <button className="primary btn-primary" onClick={() => this.vote_break_treaty('Break'+i,this.props.all_violated_treaty_id[i],this.props.victims_list[i])}>VOTE</button>
            </p>
          </div> 
            )}
        </div>
        <div id="myModal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close">&times;</span>
              <h2>Confirm the Treaty contents </h2>
            </div>
            <div className="modal-body">
              <b>Contents : </b> <input type='text' id="value_" style={{marginLeft: '15px'}}
               disabled value={this.state.treaty_text}/>
            </div>
            <div className="modal-footer">
              <h3><button className='btn btn-primary' onClick={()=>this.call_break_treaty()}>Confirm Violation</button></h3>
            </div>
          </div>
         </div>
         <div id="myModal2" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close">&times;</span>
              <h2>Confirm Voting address </h2>
            </div>
            <div className="modal-body">
              <b>Address : </b> <input type='text' id="value_" style={{marginLeft: '15px'}} value={this.state.victim_address}
               disabled/>
            </div>
            <div className="modal-footer">
              <h3><button className='btn btn-primary' onClick={() => this.vote_to_country()} >Confirm Vote</button></h3>
            </div>
          </div>
         </div>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
      </div>
    )
  }
}
