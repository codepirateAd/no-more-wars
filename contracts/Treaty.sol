// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

 
contract Treaty {
//structure for treaty
    struct Contracts{
        address country1;
        address country2;
        string treaty_text;
        bool agreement_country1;
        bool agreement_country2;
    }

	address owner;
    address[] public country;
    mapping(uint=>Contracts) public all_treaties;
    mapping(string=>uint) public votes;
    mapping(string=>address[]) private unique_votes;
    string[] public votes_tracker_add_country;
    uint public treaty__ID = 0;
    uint public smart_contract_balance;
    mapping(string=>address) public link_add;
    uint public violation_of_treaty=0;
    mapping(string=>uint) public violation_text_and_treaty;
    address[] public violations_address;
    // TRY EVERYTGHING HERE
    function both_signed_countries(uint _id) public view returns(bool){
        if(all_treaties[_id].agreement_country1 &&  all_treaties[_id].agreement_country2)
            return true;
        else
            return false;

    }

    function keep_track_add_country_length() public view returns(uint){
        return votes_tracker_add_country.length;
    }

    function remove_from_add_countries_vote_index(string memory _text) public view returns(uint){
        for(uint i=0;i<votes_tracker_add_country.length;i++){
            if(keccak256(bytes(votes_tracker_add_country[i])) == keccak256(bytes(_text))){
                    return i;
            }
        }
        return 0;
    }
    function remove_from_add_countries_vote(string memory _text) public {
        uint index_val = remove_from_add_countries_vote_index(_text);
        for(uint i = index_val; i <votes_tracker_add_country.length - 1; i++) {
           votes_tracker_add_country[i] =votes_tracker_add_country[i + 1];
        }
        votes_tracker_add_country.pop();
  
        while(unique_votes[_text].length>0){
           unique_votes[_text].pop();
        }
        votes[_text]=0;
    }

    function keep_track_add_country(string memory _text) public{
      votes_tracker_add_country.push(_text);
    }
 
    //END OF TRY EVERYTHING HERE

    // return country list
    function countries_list() public view returns(address[] memory){
        return country;
    }
    //get the total number of countries in the blockchain
    function number_of_countries() view public returns(uint){
        return uint(country.length);
    }

    //constructor to initialize owner and deduct the 3 billion dollars worth cryto
	constructor() {
		owner = msg.sender;
        country.push(owner);
        // require(msg.value>=0.3 ether, "Minimum 0.3 ether required");
        // smart_contract_balance+=msg.value;
	}

    // check whether the account is a valid country or not
    function is_country_check(address address_of_country) public view returns(bool){
        for(uint index=0; index<country.length; index++){
            if(country[index]==address_of_country)
                return true;
        }
        return false;
    }
    
    // function send_crypto(address receiver,uint currency) public {
    //         msg.sender
    //         payable(receiver).transfer(currency);

    // }
    // remove country from the list
   function remove(uint _index) public {
        require(_index <country.length, "Index out of bound");

        for (uint i = _index; i <country.length - 1; i++) {
           country[i] =country[i + 1];
        }

       country.pop();
    }

    // check the votes for any given event
    function check_votes(string memory topic) public view returns(bool){
        return votes[topic]>country.length/2; // check this part
    }

    // only allow one vote for a country 
    function check_unique_votes(string memory event_text,address address_of_country) private returns(bool){
        for(uint index=0; index<unique_votes[event_text].length; index++){
            if(unique_votes[event_text][index]==address_of_country){
                return false;
            }
        }
        unique_votes[event_text].push(address_of_country);
        return true;
    } 

    // find the index of the country from the array of countries
    function find_country(address address_of_country) view private returns(uint){
        for(uint x=0;x<country.length;x++){
            if(country[x]==address_of_country)
                return x;
        }
        return 0;
    }

    //if the treaty breaks for some country the money is tranferred to the victims account
    function withdraw_money_to(address payable _to) public {
        // _to.transfer(0.3 ether); 
        _to.transfer(0.003 ether); 
        smart_contract_balance-=0.003 ether;
    }

    // find country who have violated the treaty
    function find_country_to_violate_treaty(uint _id, address address_of_country) view public returns(address){
        if(all_treaties[_id].country1==address_of_country)
            return all_treaties[_id].country2;
        else
            return all_treaties[_id].country1;
    }

    // start the vote for certain topic  adress of the country is the address of the innocent country or initialization of treaty country
    function vote(string memory topic,address address_of_country,uint _id, uint flag) payable public{
        bool is_country = is_country_check(msg.sender);
        require(is_country,"Unauthorised Access");
        require(check_unique_votes(topic,msg.sender),"No duplicate votes allowed");
        votes[topic]++;
        if(check_votes(topic)){
            if(flag==1){
                country.push(address_of_country);
                remove_from_add_countries_vote(topic);
            }
            else if(flag==2){
                    withdraw_money_to(payable(address_of_country));
                    address country_to_remove=find_country_to_violate_treaty(_id, address_of_country);
                    uint index_of_country = find_country(country_to_remove);
                    // delete country[index_of_country];
                    remove(index_of_country);
                    votes[topic]=0;
                }
            }
            if(flag==3){
                        address voter_country=all_treaties[_id].country2;
                        if(msg.sender == voter_country)
                            all_treaties[_id].agreement_country2=true;

                   }
        }
    

    // add country to the blockchain
    function add_country(string memory country_to_add, address address_of_country) payable public {
        // require(msg.value>=0.3 ether, "Minimum 0.3 ether required");
        require(msg.value>=0.003 ether, "Minimum 0.3 ether required");
        smart_contract_balance+=msg.value;  // store the required cryto as reserved
        bool is_country = is_country_check(msg.sender);
        require(is_country,"Unauthorised Access");

       if(owner==msg.sender && address_of_country==msg.sender){

        }
        else{
            bool is_country_to_add = is_country_check(address_of_country);
            require(is_country_to_add==false,"Country already added");
            
            string memory topic = string(abi.encodePacked('Add country',' ',country_to_add));
            keep_track_add_country(topic);
            vote(topic,address_of_country,0,1); 
            link_add[topic] = address_of_country; 

        }
    }
     function send_money(address payable add) public payable {
            smart_contract_balance+= msg.value;
            add.transfer(msg.value);
            smart_contract_balance-=msg.value;
    }
    // add treaty to the blockchain
    function add_treaty(string memory treaty_text, address country2 ) public {
        bool is_country = is_country_check(msg.sender);
        require(is_country,"Unauthorised Access");
        vote(treaty_text,country2,0,3); // a vote given by the initializer
        all_treaties[treaty__ID].treaty_text = treaty_text;
        all_treaties[treaty__ID].country1= msg.sender;
        all_treaties[treaty__ID].country2 = country2;
        all_treaties[treaty__ID].agreement_country1 = true;
        treaty__ID++;
    }
    function is_treaty_country(address add, uint treaty_id) private view returns(bool){
            if(all_treaties[treaty_id].country1==add || all_treaties[treaty_id].country2==add )
                return true;
            else
                return false;
    }
    // function to initailize a vote for any broken treaty 
    // address of your country
    function break_treaty(uint _id,string memory event_text) public {
        require(both_signed_countries(_id),"Not a valid contract");
        bool is_country = is_country_check(msg.sender);
        require(is_country,"Unauthorised Access");
        vote(event_text, msg.sender,_id,2); // add in web3 part
        violations_address.push(msg.sender);
        violation_of_treaty++;
        violation_text_and_treaty[event_text] =_id;
    }
}