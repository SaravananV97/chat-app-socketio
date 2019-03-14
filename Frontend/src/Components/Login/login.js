import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import "./login.css";
import axios from "axios";
import decode from "jwt-decode";
import * as actionCreator from "../../Store/Action/actionCreators";
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
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  check:{
    marginLeft: "10%"
  }
});


class Login extends Component{

  constructor(props){
    super(props);
    this.state = {
      userName:"",
      email: "",
      password: "",
      errors:{
        userName:null, 
        password: null
      }
    }
  }

  userLogin = () => {
    const userName = this.state.userName;
    const password = this.state.password;
    axios.post("api/users/login", {userName, password}).then((res) => {
      console.log(res.data);
      if(res.data.userErr){
        this.setState({errors: {...this.state.errors, userName: "Username not found"}});
        console.log(this.state);
      }
      else
        this.setState({errors: {...this.state.errors, userName: null}});
      if(res.data.passwordErr)
        this.setState({errors: {...this.state.errors, password: "Invalid Password"}});
      else
        this.setState({errors: {...this.state.errors, password: null}});
      if(!res.data.userErr && !res.data.password && res.data.token){
        localStorage.setItem("token", res.data.token);
        const info = decode(res.data.token);
        this.props.setUserName(info.username);
        console.log(info.username);
        this.props.socket.emit("makeOnline", info.username);
        this.props.history.push(`/chat/${info.id}`);
      }
    })
    .catch(err => console.log(err));
  }

  handleChange = (event, field) => {
    this.setState({[field]: event.target.value});
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
            <InputLabel  htmlFor="username">Username</InputLabel>
            <Input onChange = {(e) => this.handleChange(e, "userName")} id="text" name="username" autoComplete="username" autoFocus />
            <FormHelperText style = {{color: "red"}} >{this.state.errors.userName}</FormHelperText>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input onChange = {(e) => this.handleChange(e, "password")} name="password" type="password" id="password" autoComplete="current-password" />
            <FormHelperText style = {{color: "red"}} >{this.state.errors.password}</FormHelperText>
          </FormControl>
          <Button
            type="submit"
            onClick = {(e) => {e.preventDefault();this.userLogin()}}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
          <div className = {classes.check}>
          New user?<button className = "link" onClick = {(e) => {e.preventDefault();this.props.registerClick(false)}}>Register Here</button>
          </div>
        </form>
      </Paper>
    </main>
  );
}
}

const mapStateToProps = (state) => {
  return {socket: state.socket}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserName: (name) => dispatch(actionCreator.setUserName(name))
  }
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));

