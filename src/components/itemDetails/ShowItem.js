import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import imgs from "./itemDets.json";
import ImageSlider from "./ImageSlider";
import OfferWins from "./Offer/OfferWin";
import ItemDesc from "./Desc/ItemDesc";
import SellerDesc from "./Desc/SellerDesc";
import HorizontalList from "../ProductTab/HorizontalList";
import axios from "axios";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import SearchPanel_Min from "../SearchModuls/SearchPanel_Min";

class ShowItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      title: null,
      description: null,
      category: null,
      price: null,
      url: null,
      seller_info: "",
      features: "",
      url: [],
      cartState: false,
      cartAdding: false,
    };

    this.getInfo = this.getInfo.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  //get info from id
  getInfo = async () => {
    console.log("get info called", this.props.match.params.id);

    let data = {
      id: this.props.match.params.id,

      userId: this.props.user.UserId,
    };

    try {
      var res = await axios.post(
        process.env.REACT_APP_REST_ENDPOINT + "/getProduct/",
        data
      );
      console.log("product data", res.data.result);
      if (res.data.result === null) {
        alert("product not present");

        //go to main page
        this.props.history.replace("/");
        return;
      }
      let cartState = res.data.present === "yes" ? true : false;
      this.setState({ ...res.data.result, cartState: cartState });
    } catch (e) {
      alert("error occured " + e);
    }
  };

  addToCart = () => {
    console.log("go to cart part");

    let data = {
      userId: this.props.user.UserId,
      item: {
        id: this.state._id,
        title: this.state.title,
        category: this.state.category,
        description: this.state.description,
        price: this.state.price,
        itemCount: 1,
      },
    };

    console.log("the data", data);

    axios
      .post(process.env.REACT_APP_REST_ENDPOINT+"/cart/InsertItems", data)
      .then((result, err) => {
        if (err) console.log("unable to add the product");
        else {
          console.log("product is added");
          this.setState({ cartState: true });
        }
      });
  };

  goToCart = () => {
    this.props.history.push("/cart");
  };

  goBack = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getInfo();
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
    console.log("in did update of show items");
    //call getInfo only when the page refresh and id i url changed
    if (this.state._id !== this.props.match.params.id) {
      this.getInfo();
    }
  }

  render() {
    var cartClass = "btn btn-primary btn-lg btn-block Buttonsty";

    if (!this.state.cartAdding) cartClass += " cartProcess";

    console.log(
      "%c in render of showItem",
      "background-color:blue",
      this.state
    );

    if (this.state._id === null) {
      return (
        <>
          <div className="loaderClass">
            <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
          </div>
        </>
      );
    } else {
      return (
        <>
          <SearchPanel_Min goToCart={this.goToCart} goBack={this.goBack} />
          <Container className="showDetsPage" fluid>
            <Row>
              <div className="col-12 col-sm-12 rowMarg ">
                <h5>
                  {this.state.title === null
                    ? "not here"
                    : this.state.title +
                      "sdsfs dsfsdfsdf dsfsf sjfa  sdjknvs afn afnasnf afn nakdfnd sdf"}
                </h5>
              </div>
            </Row>
            <Row>
              <div className="col-12 col-sm-12 rowMarg ">
                <ImageSlider url={imgs.images_Url} />
              </div>
            </Row>
            <Row>
              <div
                className="col-4 col-sm-4  rowMarg"
                style={{ marginleft: "0px" }}
              >
                <h5>Rs {this.state.price}</h5>
              </div>
            </Row>
            <Row>
              <OfferWins />
            </Row>
            <Row>
              <div className="col-6 col-sm-6 rowMarg ">
                <strong>
                  {imgs.Availaibilty === true ? "In Stock" : "Out Of Stock"}
                </strong>
              </div>
            </Row>
            <Row>
              <div className="col-10 col-sm-10  offset-1 rowMarg">
                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-block Buttonsty"
                >
                  Buy
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    this.state.cartState === false
                      ? this.addToCart()
                      : this.goToCart();
                  }}
                  className={cartClass}
                >
                  {this.state.cartState === false
                    ? "Add To Cart"
                    : "Go To Cart"}
                </button>
              </div>
            </Row>
            <Row>
              <ItemDesc desc={this.state.description} />
            </Row>
            <Row>
              <SellerDesc desc={this.state.seller_info} />
            </Row>
            <Row>
              <strong className="col-12 col-sm-12 rowMarg Rel_Search">
                Related Searches
              </strong>
              <div className="col-12 col-sm-12 rowMarg ">
                <HorizontalList productId={this.props.match.params.id} />
              </div>
            </Row>
          </Container>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.UserInfo,
});

export default connect(mapStateToProps, null)(ShowItems);
