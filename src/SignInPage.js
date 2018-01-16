import React, { Component } from 'react'
import * as firebase from 'firebase'
import {Link} from 'react-router-dom'


import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

    const auth = firebase.auth();

export default class SignInPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            warning:false,
            warningText:''
        }
    }
    setSignInDetails = (event) => {
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        auth.signInWithEmailAndPassword(email,password)
            .then((user)=>{
        
                this.setState({
                    email: '',
                    password: '',
                    warning: false,
                    warningText: ''})
                this.props.history.push('/chatArea')
            })
            .catch((error) => {
                this.setState({
                    warning: true,
                    warningText: error.message
                })
                setTimeout(() => {
                    this.setState({
                        warning: false
                    })
                }, 4000);
            });
    }
    
    setEmail = (email) => {
        let Email = email.target.value;
        this.setState({
            email: Email
        })
    }
    setPassword = (password) => {
        let Password = password.target.value;
        this.setState({
            password: Password
        })
    }
    render() {
        return(
            <div style={bgImage}>
            &nbsp;
                <Paper style={style} zDepth={3} >
                        <h1 style={head}>SIGN IN</h1>
                        <div style={opac}>
                            <form onSubmit = {this.setSignInDetails}>
                
                            <TextField 
                                floatingLabelText="Email" 
                                onChange={this.setEmail}
                                value={this.state.email}
                                required="required"
                                type="email" 
                                style={btn}/>    <br/>
                            <TextField 
                                floatingLabelText="Password"
                                onChange={this.setPassword} 
                                value={this.state.password}
                                required="required"
                                type="password" 
                                style={btn} /> <br /><br /><br />
                    
                            <section style={btn}>
                            <Link to='/SignUp' style={{ textDecoration: "none",color:"#435f7a"}}>Doesn't Have An Account ?</Link></section><br/>
                            <RaisedButton 
                                label="Sign In" 
                                type="submit"
                                primary={true}
                                style={btn} />
                        
                            {this.state.warning && <p>{this.state.warningText}</p>}
                            </form>
                        </div>
                </Paper>
            </div>
        )
    }
}

const style ={
    opacity:0.96,
    width: '29%',
    height:'72.3vh',
    display:"block",
    justifyContent:'center',
    margin:"6% auto",
    textAlign:'center',
    borderRadius:" 2.5em 0em 2.5em 0em"

};
const btn = {
    width:"90%",
    marginTop:"2%",
    
};
const head = {
    backgroundColor: "#435f7a",
    color:"#fff",
    fontWeight:"500",
    width:"100%",
    padding:"8% 0",
    borderRadius: " 1.25em 0em 0em 0em"
    
};

const bgImage = {
    backgroundImage: 'url(' + require('./assets/Background.png') + ')',
    backgroundSize: 'cover',
    overflow: 'hidden',
    height:"auto",
    marginTop:"0px",
    marginLeft:'-4px'        
    }
    
const opac = {
        opacity:1
    }
