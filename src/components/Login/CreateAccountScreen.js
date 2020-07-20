import React from "react";
import "./LoginScreen.css";
import { Container, Row } from "react-bootstrap";
import countryCode from "./countryCode.json";
import validator from "validator";
import { Prev } from "react-bootstrap/PageItem";
import firebase from "../../Firebase/FirebaseConfig";
import OtpScreen from "./OtpScreen";
import axios from "axios";
import { Redirect } from "react-router-dom";

class CreateAccountScreen extends React.Component {
  state = {
    firstName: "joshua",
    lastName: "",
    code: "",
    phoneNo: "",
    password: "joshua@19",
    email: "joshua@gmail.com",
    confirmPassword: "joshua@19",
    Err: [],
    subWait: false,
    otpWindow: false,
    otpVal: null,
  };

  recaptcha = null;

  constructor(props) {
    super(props);

    this.onBlurFirstName = this.onBlurFirstName.bind(this);
    this.onBlurConfirmPassword = this.onBlurConfirmPassword.bind(this);
    this.onBlurPassword = this.onBlurPassword.bind(this);
    this.onBlurEmail = this.onBlurEmail.bind(this);
    this.onBlurPhone = this.onBlurPhone.bind(this);
    this.createAcc = this.createAcc.bind(this);
    this.checkErr = this.checkErr.bind(this);
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.createAccPage = this.createAccPage.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user === null) console.log("not logged in ");
      else console.log("user logged in", user);
    });
  }

  checkErr = () => {
    let errArr = [];

    if (this.state.firstName.length === 0) errArr[0] = "Required";
    if (this.state.email.length === 0) errArr[1] = "Required";
    if (this.state.phoneNo.length === 0) errArr[2] = "Required";
    if (this.state.password.length === 0) errArr[3] = "Required";
    if (this.state.confirmPassword.length === 0) errArr[4] = "Required";
    if (this.state.code.length === 0 || this.state.code === "None") {
      console.log("in error of code");
      errArr[6] = "Required";
    }

    if (errArr.length === 0) return false;
    else {
      this.setState({
        Err: errArr,
      });
      return true;
    }
  };

  createAcc = () => {
    var err = false;

    console.log("in error of length", this.state.Err);

    if (this.checkErr()) return;

    this.state.Err.forEach((val) => {
      if (val.length !== 0) err = true;
    });

    if (err) {
      console.log("still err");
      return;
    }

    var userData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNo: this.state.phoneNo,
      email: this.state.email,
      password: this.state.password,
      code: this.state.code,
    };

    this.handleCreateAccount(userData);
  };

  onBlurFirstName = () => {
    let errStr = "";
    if (this.state.firstName.length === 0) errStr = "Required";

    this.setState((prev) => {
      let temp = prev.Err;

      temp[0] = errStr;
      return {
        Err: temp,
      };
    });
  };

  onBlurPassword = () => {
    let errStr = "";
    if (this.state.password.length === 0) errStr = "Required";
    else if (this.state.password.length < 8) {
      errStr = "minimum Length is 8";
    } else if (validator.isAlpha(this.state.password))
      errStr = "*numbers Required";

    this.setState((prev) => {
      let temp = prev.Err;

      temp[3] = errStr;
      return {
        Err: temp,
      };
    });
  };

  onBlurConfirmPassword = () => {
    let errStr = "";
    if (this.state.password.length === 0) errStr = "Required";
    else if (this.state.password !== this.state.confirmPassword) {
      errStr = "passwords do not match";
    }

    this.setState((prev) => {
      let temp = prev.Err;

      temp[4] = errStr;
      return {
        Err: temp,
      };
    });
  };

  onBlurEmail = () => {
    let errStr = "";

    if (this.state.email.length === 0) errStr = "Required";
    else if (!validator.isEmail(this.state.email)) errStr = "incorrect format";
    this.setState((prev) => {
      let temp = prev.Err;

      temp[1] = errStr;
      return {
        Err: temp,
      };
    });
  };

  onBlurPhone = () => {
    let errStr = "";

    if (this.state.phoneNo.length === 0) errStr = "Required";
    else {
      console.log("number check called");
      axios
        .post("http://192.168.1.203:8081/verify/phoneNo", {
          phoneNo: this.state.phoneNo,
        })
        .then((result, err) => {
          if (err) {
            console.log("unable to verify phoneNo");
          } else {
            console.log("got the phone verify", result.data);
            var resultData = result.data.message;
            if (resultData === "duplicate_no") {
              this.setState((prev) => {
                let temp = prev.Err;
                temp[2] = "No.already in use";
                return {
                  Err: temp,
                };
              });
            }
          }
        });
    }

    this.setState((prev) => {
      let temp = prev.Err;
      temp[2] = errStr;
      return {
        Err: temp,
      };
    });
  };

  handleCreateAccount = (userData) => {
    console.log("in handleclcik");
    let recaptcha = new firebase.auth.RecaptchaVerifier(this.recaptcha);
    let number = userData.code + userData.phoneNo;

    console.log("this history props", this.props.history);

    firebase
      .auth()
      .signInWithPhoneNumber(number, recaptcha)
      .then((e) => {
        this.setState({
          otpWindow: true,
          otpVal: { otpDets: e, userData: userData },
        });
      });
  };

  onBlurCode = () => {
    let errStr = "";

    if (this.state.code.length === 0 || this.state.code === "None")
      errStr = "code Req";

    this.setState((prev) => {
      let temp = prev.Err;

      temp[6] = errStr;
      return {
        Err: temp,
      };
    });
  };

  createAccPage = () => {
    return (
      <>
        <div className="LoginScreenRoot">
          <Container fluid>
            <Row>
              <div className="col-5 sol-sm-5">
                <input
                  value={this.state.firstName}
                  onChange={(e) => {
                    this.setState({ firstName: e.target.value });
                  }}
                  type="text"
                  placeholder="first Name"
                  onBlur={this.onBlurFirstName}
                />
              </div>
              <div className="col-5 sol-sm-5">
                <input type="text" placeholder="last Name" />
              </div>
            </Row>
            <Row>
              <div className="col-5 col-sm-5 errorCls">{this.state.Err[0]}</div>
              <div className="col-5 col-sm-5 errorCls"></div>
            </Row>

            <Row>
              <div className="col-6 col-sm-6">
                <input
                  value={this.state.email}
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                  type="email"
                  placeholder="e-mail"
                  onBlur={this.onBlurEmail}
                />
              </div>
            </Row>
            <Row>
              <div className="col-6 col-sm-6 errorCls">{this.state.Err[1]}</div>
            </Row>

            <Row>
              <div className="col-2 col-sm-2">
                <select
                  onBlur={this.onBlurCode}
                  onChange={(e) => {
                    this.setState({ code: e.target.value });
                  }}
                >
                  <option value="none">None</option>;
                  {countryCode.map((val) => {
                    return <option value={val.code}>{val.country}</option>;
                  })}
                </select>
              </div>
              <div className="col-6 col-sm-6 offset-2">
                <input
                  value={this.state.phoneNo}
                  onChange={(e) => {
                    this.setState({ phoneNo: e.target.value });
                  }}
                  onBlur={this.onBlurPhone}
                  type="number"
                  placeholder="Phone No"
                />
              </div>
            </Row>
            <Row>
              <div className="col-2 col-sm-2 errorCls">{this.state.Err[6]}</div>
              <div className="col-6 col-sm-6   errorCls">
                {this.state.Err[2]}
              </div>
            </Row>

            <Row>
              <div className="col-6 col-sm-6">
                <input
                  type="password"
                  value={this.state.password}
                  onChange={(e) => {
                    this.setState({ password: e.target.value });
                  }}
                  onBlur={this.onBlurPassword}
                  placeholder="Password"
                />
              </div>
            </Row>
            <Row>
              <div className="col-6 col-sm-6 errorCls">{this.state.Err[3]}</div>
            </Row>

            <Row>
              <div className="col-6 col-sm-6">
                <input
                  value={this.state.confirmPassword}
                  onChange={(e) => {
                    this.setState({
                      confirmPassword: e.target.value,
                    });
                  }}
                  onBlur={this.onBlurConfirmPassword}
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
              </div>
            </Row>
            <Row>
              <div className="col-6 col-sm-6 errorCls">{this.state.Err[4]}</div>
            </Row>

            <Row>
              <div className="col-6 col-sm-6">
                <button
                  className="btn-primary"
                  disabled={this.state.subWait}
                  value="create account"
                  onClick={this.createAcc}
                >
                  create account
                </button>
              </div>
            </Row>
            <Row>
              <div
                className="col-8 col-sm-8 offset-2"
                ref={(re) => {
                  this.recaptcha = re;
                }}
              ></div>
            </Row>
          </Container>
        </div>
      </>
    );
  };

  render() {
    console.log("render called", this.state.code);
    if (this.state.otpWindow)
      return (
        <>
          <OtpScreen otpVal={this.state.otpVal} history={this.props.history} />
        </>
      );
    else return <>{this.createAccPage()}</>;
  }
}

export default CreateAccountScreen;
