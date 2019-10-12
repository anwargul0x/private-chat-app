import React, { Component } from "react";
import * as firebase from "firebase";
import LinearProgress from "material-ui/LinearProgress";

import { Link } from "react-router-dom";

import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";

const database = firebase.database();
const auth = firebase.auth();

export default class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password: "",
      warning: false,
      warningText: "",
      progress: false,
      fileSelected: null
    };
  }

  setName = name => {
    let Name = name.target.value;
    this.setState({
      fullName: Name
    });
  };
  setEmail = email => {
    let Email = email.target.value;
    this.setState({
      email: Email
    });
  };
  setPassword = password => {
    let Password = password.target.value;
    this.setState({
      password: Password
    });
  };

  fileHandler = e => this.setState({ fileSelected: e.target.files[0] });

  setUserDetailsToFirebase = event => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    const Name = this.state.fullName;
    const file = this.state.fileSelected;
    if (Name && email && password && file) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          let uid = firebase.auth().currentUser.uid;
          firebase
            .storage()
            .ref(`images/${uid}/${file.name}`)
            .put(file)
            .then(function(user) {
              firebase
                .storage()
                .ref(`images/${uid}/${file.name}`)
                .getDownloadURL()
                .then(function(url) {
                  firebase
                    .auth()
                    .currentUser.updateProfile({
                      displayName: Name,
                      photoURL: url
                    })
                    .then(() => {
                      firebase
                        .database()
                        .ref(`users/${uid}`)
                        .set({
                          name: Name,
                          email,
                          url
                        });
                    });
                });
            });
        })
        .then(() => {
          this.setState({
            fullName: "",
            email: "",
            password: "",
            warning: false,
            warningText: ""
          });
          this.props.history.push("/ChatArea");
        });
    } else {
      this.setState({
        warning: true,
        progress: false
      });
      if (this.state.progress === true) {
        this.setState({ warning: false });
      }
      setTimeout(() => {
        this.setState({
          warning: false
        });
      }, 4000);
    }
  };
  render() {
    return (
      <div style={bgImage}>
        <Paper style={style} zDepth={3}>
          <h1 style={head}>SIGN UP</h1>
          <div>
            <form
              style={{ marginTop: "-1.9em" }}
              onSubmit={this.setUserDetailsToFirebase}
            >
              <TextField
                floatingLabelText="Full Name"
                required="required"
                style={btn}
                value={this.state.fullName}
                onChange={this.setName}
              />{" "}
              <br />
              <TextField
                floatingLabelText="Email"
                required="required"
                type="email"
                style={btn}
                value={this.state.email}
                onChange={this.setEmail}
              />{" "}
              <br />
              <TextField
                floatingLabelText="Password"
                required="required"
                type="password"
                style={btn}
                value={this.state.password}
                onChange={this.setPassword}
              />{" "}
              <br />
              <input type="file" onChange={this.fileHandler} /> <br />
              <section style={btn}>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "#432f7a" }}
                >
                  Doesn't Have An Account ?
                </Link>
              </section>
              <br />
              <RaisedButton
                label="Sign Up"
                primary={true}
                style={btn}
                type="submit"
              />
              {this.state.progress && (
                <LinearProgress
                  mode="indeterminate"
                  style={{ width: "95%", margin: "10px auto" }}
                />
              )}
              {this.state.warning && <p>{this.state.warningText}</p>}
            </form>
          </div>
        </Paper>
      </div>
    );
  }
}

const style = {
  opacity: 0.96,
  width: "29%",
  height: "76.5vh",
  display: "block",
  justifyContent: "center",
  padding: "0",
  margin: "6% auto",
  textAlign: "center",
  borderRadius: " 2.5em 0em 2.5em 0em"
};
const btn = {
  width: "89%",
  marginTop: "2%"
};
const head = {
  backgroundColor: "#2c3e50",
  color: "#fff",
  fontWeight: "500",
  width: "100%",
  padding: "8% 0",
  borderRadius: " 1.25em 0em 0em 0em"
};

const bgImage = {
  // backgroundImage: 'url(' + require('./assets/Background.png') + ')',
  backgroundImage: `url(${require("./assets/Background.png")})`,
  backgroundSize: "cover",
  overflow: "hidden",
  height: "auto",
  marginTop: "0px",
  marginLeft: "-4px"
};
