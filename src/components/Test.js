import React from "react";
import { Redirect } from "react-router-dom";
import "../App.css";
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import pizzas from "../data";
import PizzaCard from "./PizzaCard";
import Confirmation from "./Confirmation";

class From extends React.Component {
  render() {
    return (
      <>
        <Container>
          <Row>
            <p>hello there</p>
          </Row>
        </Container>
      </>
    );
  }
}

export default From;
