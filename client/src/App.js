import React, { Component } from "react";
import SimpleStorageContract from "./contracts/Treaty.json";
import getWeb3 from "./getWeb3";
import Home from "./Components/Home";
import Nav from "./Components/Nav";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CountriesAddress from "./Components/CountriesAddress";
import AddCountry from "./Components/AddCountry";
import AddTreaty from "./Components/AddTreaty";
import Violation from "./Components/Violation";


class App extends Component {
  state = { OwnerofContract: ' ', web3: null, accounts: null, contract: null, countries: [], 
            numberofCountries: 0, is_country: false, number_of_add_countries: 0, add_countries: [],add_countries_votes:[],
            all_treaties: [], number_of_treaties: 0,violations_counter:0,all_violated_treaty_id: [], all_violated_treaty_votes: [],
            victims_list: [], balance: 0, extra_error_msg: []
          };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      console.log(web3);
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
        
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.showOwner);
      this.retreive_country();
      this.is_country_check();
      await this.length_of_add_votes();
      await this.add_countries_to_list();
      await this.retreive_treaty();
      await this.number_of_treaties();
      await this.number_of_violations();
      await this.get_violations_id();
      await this.votes_list_break_treaty();
      await this.victims_list();
      await this.get_balance();
    } catch (error) {
      // Catch any errors for any of the above operations.
      if(window.location.pathname==='/treatybreak'){
        window.location='/';
      }
      else{
      // alert(
      //   `Please switch to a Desktop to connect to No More Wars Blockchain and make sure MetaMask extension is installed`,
      // );
      let arr = [];
      arr.push('"No more wars Connection Error" this may be due to two reasons-');
      arr.push('1. If you are on phone switch to a Desktop computer.');
      arr.push('2. MetaMask extension must be installed to log in to the Blockchain ');
      this.setState({extra_error_msg: arr});
      console.error(error);
      }
    }
  };
  victims_list = async () => {
    const {contract } = this.state;
    let arr = []

    for(let i=0;i<this.state.violations_counter;i++){
      const res = await contract.methods.violations_address(parseInt(i)).call();
      arr.push(res);
    }
    await this.setState({victims_list: arr});
  }

  votes_list_break_treaty = async () => {
    const {contract } = this.state;
    let arr = []

    for(let i=0;i<this.state.violations_counter;i++){
      const res = await contract.methods.votes('Break'+i).call();
      arr.push(parseInt(res));
    }
    await this.setState({all_violated_treaty_votes: arr});
  }
 

  get_violations_id = async () => {
    const {contract } = this.state;
    let arr = []

    for(let i=0;i<this.state.violations_counter;i++){
      const res = await contract.methods.violation_text_and_treaty('Break'+i).call();
      arr.push(parseInt(res));
    }
    await this.setState({all_violated_treaty_id: arr});

  }

  break_treaty = async (_id,_text) => {
    const {contract } = this.state;
    await contract.methods.break_treaty(parseInt(_id),_text).send({from: this.state.accounts[0]});

  }
  number_of_violations = async () => {
    const {contract } = this.state;
    const res = await contract.methods.violation_of_treaty().call();
    await this.setState({violations_counter: parseInt(res)});
  }
  sign_treaty = async (_treaty_text,_id) => {
    const {contract } = this.state;
    const flag=3;
    const placeholder_address = this.state.accounts[0];
    // console.log(_treaty_text,placeholder_address,_id,flag);
    await contract.methods.vote(_treaty_text,placeholder_address,parseInt(_id),flag).send({from: this.state.accounts[0]});
  }

  add_treaty = async (address_,text_) => {
    const {contract } = this.state;
    await contract.methods.add_treaty(address_,text_).send({from: this.state.accounts[0]} );
  }
  number_of_treaties = async () => {
    const {contract } = this.state;
    const num = await contract.methods.treaty__ID().call();
    await this.setState({number_of_treaties: num});
  }

  retreive_treaty = async () => {
    const {contract } = this.state;
    let get_all_treaties=[];
    const number_of_treaties = await contract.methods.treaty__ID().call();
    
    // for(let i=0;i<parseInt(number_of_treaties);i++){
    //   const res = await contract.methods.all_treaties(parseInt(i)).call();
    //   get_all_treaties.push(res);
    // }
    for(let i=parseInt(number_of_treaties)-1;i>=0;i--){
      const res = await contract.methods.all_treaties(parseInt(i)).call();
      get_all_treaties.push(res);
    }

    this.setState({all_treaties:get_all_treaties})

  }
  length_of_add_votes = async () => {
    const {contract } = this.state;
    // await contract.methods.add_country("Russia","0xa3414D83F6E0Eef9315721E05676081630482111").send({ from: this.state.accounts[0], value: 3000000000000000 });
    const res = await contract.methods.keep_track_add_country_length().call();
    this.setState({number_of_add_countries: res});
    // console.log(this.state.number_of_add_countries);
  }

  get_balance= async () => {
    const {contract } = this.state;
    const balance = await contract.methods.smart_contract_balance().call();
    const convert_bal = parseInt(balance)/1000000000000000;
    await this.setState({balance: convert_bal});
  }
  vote_country = async (country_name,address) => {
      const {contract } = this.state;
      const id=0;
      const flag=1;
      await contract.methods.vote(country_name,address,id,flag).send({ from: this.state.accounts[0]});
      window.location = '/';
  }

  vote_break_treaty = async (_event_text,address,_id,_flag) => {
    const {contract } = this.state;
    await contract.methods.vote(_event_text,address,_id,_flag).send({ from: this.state.accounts[0]});
    window.location = '/';
}
  get_country_address = async (topic_text) => {
    const {contract } = this.state;
    const country_address_from_text = await contract.methods.link_add(topic_text).call();
    return country_address_from_text;
  }
  add_countries_to_list = async () => {
    const {contract } = this.state;
    let arr = [];
    let arr_votes = []
    for(var i=0;i<parseInt(this.state.number_of_add_countries);i++)
    {
      const value = await contract.methods.votes_tracker_add_country(parseInt(i)).call();
      const value_votes = await contract.methods.votes(value).call();
      arr.push(value);
      arr_votes.push(value_votes);
      // console.log(value);
      // console.log(value_votes);
    }
    this.setState({add_countries: arr,add_countries_votes: arr_votes});
  }

  showOwner = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.country(0).call();
    // Update state with the result.
    this.setState({ OwnerofContract: response });
  };

   add_country = async (country_name,country_add) => {
    const {contract } = this.state;
    // await contract.methods.add_country("Russia","0xa3414D83F6E0Eef9315721E05676081630482111").send({ from: this.state.accounts[0], value: 3000000000000000 });
    await contract.methods.add_country(country_name,country_add).send({ from: this.state.accounts[0], value: 3000000000000000 });
  }

    transaction_to_country = async (add,x) => {
      const {contract } = this.state;
      await contract.methods.send_money(add).send({ from: this.state.accounts[0], value: parseInt(x) });
    }

    is_country_check = async () => {
      const {contract } = this.state;
      const is_country_res = await contract.methods.is_country_check(this.state.accounts[0]).call();
      this.setState({is_country:is_country_res});
      // console.log(this.state.is_country);
    }
  // check_country = async () => {
  //   const {contract } = this.state;
  //   const c1 = await contract.methods.country(0).call();
  //   // const c2 = await contract.methods.country(1).call();
  //   console.log(c1);
  //   // console.log(c2);
  // }

  retreive_country = async () => {
    const {contract } = this.state;
    let arr = [];
    const num = await contract.methods.number_of_countries().call();

    arr = await contract.methods.countries_list().call();
    this.setState({numberofCountries: num, countries: arr});
    
    // console.log(this.state.countries);
  }
  render() {
    if (!this.state.web3) {
      return <div className="container about__container--narrow">
      <h2 className="page-section__title" style={{marginTop: '50px'}}>Connecting to MetaMask......</h2>
        <br/><br/>
        <h3 style={{color: 'red',width: '70%', margin: 'auto'}}>{this.state.extra_error_msg[0]}</h3><br/>
        <h3 style={{color: 'red',width: '70%', margin: 'auto'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.state.extra_error_msg[1]}</h3><br/>
        <h3 style={{color: 'red',width: '70%', margin: 'auto'}}>&nbsp;&nbsp;&nbsp;&nbsp;{this.state.extra_error_msg[2]}</h3><br/>
      </div>
    }
    return (
      <div>
        <Router>
          <Nav is_country_flag ={this.state.is_country}/>
          <Routes>
            <Route path='/' element={<Home number_of_treaties={this.state.number_of_treaties} 
            all_treaties={this.state.all_treaties}
            violations_counter={this.state.violations_counter}
            numberofCountries_={this.state.numberofCountries} 
            balance={this.state.balance}
            />}/>

            <Route path='/countriesAddress' element={<CountriesAddress key="count" 
            add_country={this.add_country} 
            numberofCountries={this.state.numberofCountries} 
            countries={this.state.countries} 
            transac = {this.transaction_to_country}
            is_country_check ={this.is_country_check}
            />}/>

            <Route path='/addcountry' element={<AddCountry 
             add_country={this.add_country} 
             add_countries_list={this.state.add_countries}
             add_countries_votes={this.state.add_countries_votes}
             numOfCountries={this.state.number_of_add_countries}
             vote_country={this.vote_country}
             get_country_address ={this.get_country_address}
            />}/>

            <Route path="/addtreaty" element={<AddTreaty
            add_treaty = {this.add_treaty}
            number_of_treaties={this.state.number_of_treaties}
            all_treaties={this.state.all_treaties}
            sign_treaty={this.sign_treaty}
            />} />

            <Route path='/treatybreak' element={<Violation 
             all_treaties={this.state.all_treaties}
            number_of_treaties={this.state.number_of_treaties}
            violations_counter={this.state.violations_counter}
            break_treaty={this.break_treaty}
            all_violated_treaty_id={this.state.all_violated_treaty_id}
            vote_break_treaty={this.vote_break_treaty}
            all_violated_treaty_votes={this.state.all_violated_treaty_votes}
            victims_list={this.state.victims_list}
            />} />
          </Routes>
        </Router>
  </div>
    );
  }
}

export default App;

