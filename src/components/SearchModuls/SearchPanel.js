import React from "react";
import ProductCard from "../ProductTab/ProductCard";
import { Container, Row, Button, Modal } from "react-bootstrap";
import { local } from "../../connection/RestUrl.json";
import { connect } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { BsListUl } from "react-icons/bs";
import { MdAddShoppingCart } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.css";
import { AiFillCaretUp } from "react-icons/ai";
import SearchCache from "../../Cache/SearchCache";

import axios from "axios";
import suggestionList from "./KeyWords";

class SearchPanel extends React.Component {
  textRef = null;

  constructor(props) {
    super(props);

    //search class
    this.searhCls = null;

    this.state = {
      searchQuery: "",
      suggestion: [],
      searchOpt: false,
    };

    this.getSearch = this.getSearch.bind(this);
    this.getAutoComplete = this.getAutoComplete.bind(this);
    this.calculateMap = this.calculateMap.bind(this);
    this.goToCart = this.goToCart.bind(this);
    this.sortResult = this.sortResult.bind(this);
    this.searchBox = this.searchBox.bind(this);
  }

  calculateMap = (arr) => {
    var temp = [...arr];
    var count = 1;
    var steps = temp.length / 5;
    var target = Math.floor(steps);
    var tempMap = new Map();

    for (var i = 1; i <= target; i++) {
      var cutArr = temp.splice(0, 5);
      tempMap.set(count, cutArr);
      count++;
    }

    if (Math.floor(steps) !== Math.ceil(steps)) {
      tempMap.set(count, temp);
    }

    //populate the result data
    this.props.populateData(arr);

    //populate the grid map
    this.props.updateGridMap({
      gridMap: tempMap,
      maxWindow: count,
      GridWindow: 1,
    });
  };

  getSearch = () => {
    alert("search click");
    //get search data as per the query
    var data = {
      searchStr: this.textRef.value,
    };
    axios
      .post(process.env.REACT_APP_REST_ENDPOINT + "/search", data)
      .then((reply, err) => {
        if (err) {
          alert("error occured,Please try again");
          this.setState({ suggestion: [] });
        } else {
          if (reply.data.status === "success") {
            if (reply.data.result === null) {
              this.setState({ suggestion: [] });
              alert("No Result Found");
            } else {
              console.log("successful got result", reply.data.result);

              this.setState({ suggestion: [] });
              this.calculateMap(reply.data.result);
            }
          }
        }
      })
      .catch((e) => {
        alert("A network Error", e.toString());
      });
  };

  getAutoComplete = async (e) => {
    //if the search s empty
    if (e.length === 0) {
      this.setState({
        suggestion: [],
      });
    }
    var temp = await this.searchCls.checkInv(e);
    console.log("suugestion value", temp);

    if (temp.length !== 0) {
      console.log("temp value", temp);
      this.setState({
        suggestion: temp,
      });
    } else {
      console.log("temp value", temp);
      this.setState({
        suggestion: [],
      });
    }
  };

  sortResult = () => {
    console.log("arr result");
    let arr = this.props.SearchResult.resultDB;
    arr.sort((a, b) => {
      return b.price - a.price;
    });

    console.log("arr result", arr);
    this.calculateMap(arr);
  };

  goToCart = () => {
    this.props.history.push("/cart");
  };

  //selecting suggestion from dropdown
  selectSuggestion = (val) => {
    this.textRef.value = val;

    this.setState({ suggestion: [] });
  };

  searchBox = () => {
    //calculate search status
    let searchClass =
      "col-10 col-sm-10 offset-1 searchBlock " +
      (this.state.searchOpt === false ? "searchClosed" : "");

    return (
      <>
        <Row>
          <div className={searchClass}>
            <div className="subSearchDiv input-group">
              <input
                type="text"
                aria-label="Last name"
                className="form-control searchInput"
                ref={(ree) => {
                  this.textRef = ree;
                }}
                onChange={(e) => {
                  this.getAutoComplete(e.target.value);
                }}
              />
              <div className="input-group-prepend searchIcon">
                <span onClick={this.getSearch}>
                  <FaSearch color="grey" size="1.2rem" />
                </span>
              </div>
            </div>
            <div className="suggestDrop">
              {this.state.suggestion.map((val, index) => {
                return (
                  <div
                    onClick={() => {
                      this.selectSuggestion(val);
                    }}
                  >
                    {val}
                  </div>
                );
              })}
            </div>
          </div>
        </Row>
      </>
    );
  };

  componentDidMount() {
    this.searchCls = new SearchCache();
  }

  render() {
    let arr = this.props.SearchResult.resultDB;
    console.log("suggestion", this.state.suggestion, arr);
    return (
      <>
        <Container className="searchStyle" fluid>
          <Row>
            <div className="col-12 col-sm-12 searchHead">
              <strong>Stationary Stop</strong>
            </div>
          </Row>
          <Row>
            <div className="col-12 col-sm-12 headerBox">
              <div style={{ padding: "5px" }} onClick={this.props.toggle}>
                <BsListUl size="2rem" />
              </div>
              <div style={{ padding: "5px" }}>
                <span
                  onClick={(e) => {
                    this.setState((prev) => ({ searchOpt: !prev.searchOpt }));
                  }}
                >
                  {this.state.searchOpt === false ? (
                    <FaSearch color="black" size="1.4rem" />
                  ) : (
                    <AiFillCaretUp size="1.4rem" />
                  )}
                </span>
              </div>
              <div style={{ padding: "5px" }}>
                {this.props.UserInfo.UserId !== null ? (
                  <MdAddShoppingCart size="1.8rem" onClick={this.goToCart} />
                ) : (
                  ""
                )}
              </div>
            </div>
          </Row>
          {this.searchBox()}
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    UserInfo: state.UserInfo,
    SearchResult: state.SearchResult,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeVal: (value) => {
      dispatch({
        type: "changeVal",
        payload: value,
      });
    },
    updateGridMap: (value) => {
      dispatch({
        type: "updateGridMap",
        payload: value,
      });
    },
    populateData: (value) => {
      dispatch({
        type: "populateData",
        payload: value,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
