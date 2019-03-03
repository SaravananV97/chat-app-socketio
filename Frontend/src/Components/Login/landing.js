import React, {Component} from "react";
import Login from "./login";
import Register from "./register";

class Landing extends Component{
    
    constructor(props){
        super(props);
        this.state = {isLogging: true}
    }


    handleRegisterLogin = (isLogging) =>{ 
        console.log(isLogging);  
        this.setState({isLogging});
    }
    
    render(){
        return (
            <div> 
                {this.state.isLogging?<Login {...this.props} userLogin = {this.handleUserLogin} registerClick = {this.handleRegisterLogin} />:
                                   <Register {...this.props} userRegister = {this.handleUserRegister} loginClick = {this.handleRegisterLogin} />}        
            </div>
        );               
        }
}

export default Landing;
