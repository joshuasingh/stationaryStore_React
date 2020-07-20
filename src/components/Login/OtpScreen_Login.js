import React from "react";
import { useEffect, useState } from "react";
import { Component, Row } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import firebase from "../../Firebase/FirebaseConfig";

const OtpScreen_Login = ({ otpVal, history }) => {
  const inArr = new Array(6);

  const [num_1, changeNum1] = useState("");
  const [num_2, changeNum2] = useState("");
  const [num_3, changeNum3] = useState("");
  const [num_4, changeNum4] = useState("");
  const [num_5, changeNum5] = useState("");
  const [num_6, changeNum6] = useState("");

  const refArr = [num_1, num_2, num_3, num_4, num_5, num_6];
  var changeInput = (val, ind) => {
    console.log(val);
    if (val.length === 1) {
      if (ind !== 5) inArr[ind + 1].focus();
    }
    if (ind === 0) changeNum1(val);
    if (ind === 1) changeNum2(val);
    if (ind === 2) changeNum3(val);
    if (ind === 3) changeNum4(val);
    if (ind === 4) changeNum5(val);
    if (ind === 5) {
      if (val.length === 2) return;
      changeNum6(val);
    }
  };

  var createAccount = () => {
    var valid = true;
    refArr.map((val) => {
      if (val.length === 0) valid = false;
    });

    if (!valid) {
      console.log("incomplete otp values");
      return;
    }

    var otp = num_1 + num_2 + num_3 + num_4 + num_5 + num_6;

    console.log("in otpscreen", otp, otpVal.otpDets);

    var credential = firebase.auth.PhoneAuthProvider.credential(
      otpVal.otpDets.verificationId,
      otp
    );

    firebase
      .auth()
      .signInWithCredential(credential)
      .then((ress, err) => {
        console.log("res of otp", ress);
        if (err) {
          console.log("unable to login");
          return;
        }
        if (ress.code === "auth/invalid-verification-code") {
          console.log("incorrect Otp");
          return;
        }

        console.log("correct otp", ress);
        history.replace("/");
      })
      .catch((e) => {
        console.log("wrong otp", e);
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "40vh",
        }}
      >
        <div style={{ display: "flex" }}>
          {refArr.map((val, index) => {
            return (
              <input
                type="number"
                value={val}
                ref={(e) => {
                  inArr[index] = e;
                }}
                onChange={(e) => {
                  changeInput(e.target.value, index);
                }}
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            );
          })}
        </div>
        <div>
          <button onClick={createAccount}> Create</button>
        </div>
      </div>
    </>
  );
};

export default OtpScreen_Login;
