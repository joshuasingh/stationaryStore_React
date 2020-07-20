import React from "react";
import "../App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import pizzas from "../data";
import { Toast } from "react-bootstrap";

class Confirmation extends React.Component {
  constructor({ toggle }) {
    super({ toggle });
    this.change = toggle;
  }

  render() {
    return (
      <>
        <Toast onClose={() => this.change(false)}>
          <Toast.Header>
            <strong className="mr-auto">your order is in</strong>
            <small> just now</small>
          </Toast.Header>
          <Toast.Body>your delicious pzza is on its way</Toast.Body>
        </Toast>
      </>
    );
  }
}

export default Confirmation;
