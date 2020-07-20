import React from "react";
import logo from "./logo.svg";
import "./App.css";
import From from "./components/From";
import Update from "./components/Update";
import Temp from "./Temp";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import pizzas from "./data";
import Homepage from "./Pages/Homepage";
import ShowItem from "./components/itemDetails/ShowItem";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Clock from "./components/TimingConsole/Clock";
import CreateAccountScreen from "./components/Login/CreateAccountScreen";
import LoginScreen from "./components/Login/LoginPage";
import ProductCard_Cart from "./components/Cart/ProductCard_Cart";
import Cart from "./components/Cart/Cart";
import Counter from "./components/Counter/Counter";
import MessageWindow from "./components/PopUp/MessageWindow";
import SortHeader from "./components/GridView/SortHeader";
import SearchPanel_Min from "./components/SearchModuls/SearchPanel_Min";

import OtpScreen from "./components/Login/OtpScreen";
import firebase from "./Firebase/FirebaseConfig";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: true,
      toastM: false,
    };
    this.toggle = this.toggle.bind(this);
    this.changeVal = this.changeVal.bind(this);
  }

  toggle = () => {
    this.setState((prevState) => {
      return {
        form: !prevState.form,
      };
    });
  };

  changeVal = () => {
    this.setState({
      toastM: true,
    });

    setTimeout(() => {
      this.setState({
        toastM: false,
      });
    }, 3000);
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        axios
          .post("http://192.168.1.203:8081/account/getAccountDets", {
            UserId: user.uid,
          })
          .then((result, err) => {
            if (err) console.log("unable to get user ", err);
            else {
              console.log("got the user", result.data.user);
              this.props.initiateUser(result.data.user);
            }
          })
          .catch((e) => {
            console.log("unable to retrieve the user");
          });
      } else {
        console.log("logged out");
      }
    });
  }

  render() {
    console.log(
      "user info",
      this.props.UserInfo.UserId !== null
        ? this.props.UserInfo.UserId
        : "not here"
    );
    return (
      <>
        {/* {this.state.toastM === true ? (
          <div style={{ position: "absolute", "z-Index": 1 }}>
            <Confirmation toggle={this.changeVal} />
          </div>
        ) : (
          ""
        )}
        <Container style={{ "margin-top": 20 }} fluid>
          <Row>
            {pizzas.map((data) => {
              return (
                <div className="col-6 col-sm-3  ">
                  <PizzaCard data={data} setOrdered={this.changeVal} />
                </div>
              );
            })}
          </Row>
        </Container>
        } */}
        {/* <ShowItem /> */}

        {/* <GridShow data={pizzas} /> */}

        <Router>
          <div className="App">
            <div id="page-body">
              <Switch>
                <Route path="/itemScreen/:id" component={ShowItem} exact />
                <Route path="/" component={Homepage} exact />
                <Route path="/cart" component={Cart} exact />
                <Route
                  path="/createAccount"
                  component={CreateAccountScreen}
                  exact
                />
                <Route path="/loginAccount" component={LoginScreen} exact />
              </Switch>
            </div>
          </div>
        </Router>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    UserInfo: state.UserInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initiateUser: (value) => {
      dispatch({
        type: "initiateUser",
        payload: value,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
