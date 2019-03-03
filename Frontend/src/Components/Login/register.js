import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from "axios";
import "./login.css";
import validator from "validator";
import decode from "jwt-decode";
import * as actionCreator from "../../Store/Action/actionCreators"
import {connect} from "react-redux";

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', 
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  check: {
    marginTop: "5px"
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Register extends Component{

  constructor(props){
    super(props);
    this.state = {
      userName:"",
      password: "",
      email:"",
      err: {email: null, userName: null, password: null}
    }
  }

  validate = (username, email, password) => {
    let err = {}
    if(!validator.isEmail(email))
      err.email = "Enter a valid Email";
    if(password.length < 6)
      err.password = "Password must be atleast 6 characters";
    if(username.length < 3)
      err.userName = "Username must be atleast 3 Characters";
    
    return err; 
  }

  handleChange = (event, field) => {
    this.setState({[field]: event.target.value});
  }

  userRegister = () => {
    const userName = this.state.userName;
    const password = this.state.password;
    const email = this.state.email;
    const errors = this.validate(userName, email, password);
    if(Object.keys(errors).length > 0){
      this.setState({err: {...errors}});
      return;
    }
    axios.post("api/users/register", {userName, password, email}).then(res => {
      console.log(res.data);
      if(res.data.userName){
        this.setState({err: {userName:res.data.userName}});
      }
      else{
        localStorage.setItem("token", res.data.token);
        const info = decode(res.data.token);
        this.props.setUserName(info.username);
        this.props.socket.emit("makeOnline", info.username);
        this.props.history.push(`/chat/${info.id}`)
      }
    }) 
    .catch((err) => {throw new Error(err)});
   }
  render(){
    const { classes } = this.props;
   return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className="login">
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
        <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input onChange = {(e) => {this.handleChange(e, "email")}} id="email" name="email" autoComplete="email" autoFocus />
            <FormHelperText style = {{color: "red"}} >{this.state.err.email}</FormHelperText>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input onChange = {(e) => {this.handleChange(e, "userName")}} id="text" name="username" autoComplete="username" autoFocus />
            <FormHelperText style = {{color: "red"}} >{this.state.err.userName}</FormHelperText>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input onChange = {(e) => {this.handleChange(e, "password")}} name="password" type="password" id="password" autoComplete="current-password" />
            <FormHelperText style = {{color: "red"}} >{this.state.err.password}</FormHelperText>
          </FormControl>
          <Button
            type="submit"
            onClick = {(e)=> {e.preventDefault();this.userRegister()}}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
        </form>
        <div className = {classes.check}>
        Already have an account?
        <button className = "link" onClick = {(e) => {e.preventDefault();this.props.loginClick(true)}}>Login here</button>
        </div>
      </Paper>
    </main>
  );
}
}

const mapStateToProps = (state) => {
    return {
      socket: state.socket
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserName: (name) => dispatch(actionCreator.setUserName(name))
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Register));

