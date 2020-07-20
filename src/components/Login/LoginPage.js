import React from "react";
import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import "./LoginScreen.css";
import axios from "axios";
import firebase from "../../Firebase/FirebaseConfig";
import OtpScreen_Login from "./OtpScreen_Login";

const LoginScreen = (props) => {
  const [aa, changeAa] = useState(1);
  const [phn, setPhn] = useState("");
  const [pass, setPass] = useState("");
  const [phnErr, setPhnErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [serverError, setServerError] = useState("");
  const [otpWindow, setOtpWindow] = useState(false);
  const [otpVal, setOtpVal] = useState(null);

  useEffect(() => {
    console.log("in did mount of login");
  }, []);

  var recaptchaRef = null;

  const changeVal = () => {
    changeAa(2);
  };

  //login in to firebase
  const handleCreateAccount = (userData) => {
    console.log("in handleclcik");
    let recaptcha = new firebase.auth.RecaptchaVerifier(recaptchaRef);
    let number = userData.phn_code + userData.phoneNo;

    firebase
      .auth()
      .signInWithPhoneNumber(number, recaptcha)
      .then((e) => {
        setOtpWindow(true);
        setOtpVal({ otpDets: e });
      });
    return;
  };

  const checkArr = () => {
    var err = false;
    console.log("phnie tyep", pass);
    if (phn.length === 0) {
      setPhnErr("Required");
      err = true;
    } else {
      console.log("in else");
      setPhnErr("");
      err = false;
    }

    if (pass.length === 0) {
      setPassErr("Required");
      err = true;
    } else {
      setPassErr("");
      err = false;
    }

    return err;
  };

  const loginUser = () => {
    if (checkArr()) {
      console.log("still err");
    }

    var data = {
      phoneNo: phn,
      password: pass,
    };

    axios
      .post("http://192.168.1.203:8081/login/verify", data)
      .then((result, err) => {
        if (err) {
          setServerError("unable to Login");
          return;
        } else {
          let val = result.data;
          console.log(val.message);
          if (val.message === "not_Verified")
            setServerError("Phone No or Password not Valid");
          else {
            handleCreateAccount(result.data.userData);
          }
          return;
        }
      });
  };

  const loginPart = () => {
    return (
      <>
        <Container fluid>
          <Row>
            <div className="col-8 col-sm-8 offset-2">
              {" "}
              <input
                type="number"
                value={phn}
                onChange={(e) => {
                  setPhn(e.target.value);
                }}
                placeholder="Phone No"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
          </Row>
          <Row>
            <div className="col-8 col-sm-8 offset-2 errorCls">{phnErr}</div>
          </Row>
          <Row>
            <div className="col-8 col-sm-8 offset-2">
              {" "}
              <input
                type="password"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                placeholder="Password"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
          </Row>
          <Row>
            <div className="col-8 col-sm-8 offset-2 errorCls">{passErr}</div>
          </Row>
          <Row>
            <div className="col-8 col-sm-8 offset-2">
              <button onClick={loginUser}>Login</button>
            </div>
          </Row>
          <Row>
            <div className="col-8 col-sm-8 offset-2 errorCls">
              {serverError}
            </div>
          </Row>
          <Row>
            <div
              className="col-8 col-sm-8 offset-2"
              ref={(re) => {
                recaptchaRef = re;
              }}
            ></div>
          </Row>
        </Container>
      </>
    );
  };

  return (
    <>
      {otpWindow === false ? (
        loginPart()
      ) : (
        <OtpScreen_Login otpVal={otpVal} history={props.history} />
      )}
    </>
  );
};

export default LoginScreen;
