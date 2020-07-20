import React from "react";
import ProductCard from "../ProductTab/ProductCard";
import { Container, Row, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SortHeader from "./SortHeader";

class GridShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      GridWindow: 1,
      maxWindow: null,
      mapStore: null,
    };
    this.calculateMap = this.calculateMap.bind(this);
    this.highToLow = this.highToLow.bind(this);
    this.lowToHigh = this.lowToHigh.bind(this);
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

  lowToHigh = () => {
    console.log("arr result");
    let arr = this.props.SearchResult.resultDB;
    arr.sort((a, b) => {
      return a.price - b.price;
    });

    console.log("arr result", arr);
    this.calculateMap(arr);
  };

  highToLow = () => {
    console.log("arr result");
    let arr = this.props.SearchResult.resultDB;
    arr.sort((a, b) => {
      return b.price - a.price;
    });

    console.log("arr result", arr);
    this.calculateMap(arr);
  };

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    console.log("in render of gridshow", this.props.GridData.gridMap);
    if (this.props.GridData.gridMap !== null) {
      return (
        <>
          <div style={{ paddingTop: "5px" }}>
            <SortHeader lowToHigh={this.lowToHigh} highToLow={this.highToLow} />

            <Container className="GridV" fluid>
              <Row>
                {this.props.GridData.gridMap
                  .get(this.props.GridData.GridWindow)
                  .map((val) => {
                    const url = "/itemScreen/" + val._id;

                    return (
                      <div className="col-6 col-sm-6">
                        <Link to={url}>
                          <ProductCard Prod={val} />
                        </Link>
                      </div>
                    );
                  })}
              </Row>
            </Container>

            <Container fluid className="NextPrev">
              <Row>
                <div className="col-6 col-sm-6 ">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block "
                    onClick={this.props.prevWindow}
                  >
                    Prev
                  </button>
                </div>
                <div className="col-6 col-sm-6  ">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block "
                    onClick={this.props.nextWindow}
                  >
                    Next
                  </button>
                </div>
              </Row>
            </Container>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div
            style={{
              height: "100%",
              marginTop: "40vh",
              fontSize: "40px",
            }}
          >
            No Result found
          </div>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    GridData: state.GridPlacement,
    SearchResult: state.SearchResult,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateGridMap: (value) => {
      dispatch({
        type: "updateGridMap",
        payload: value,
      });
    },
    prevWindow: () => {
      dispatch({
        type: "prevWindow",
        payload: "",
      });
    },
    nextWindow: (value) => {
      dispatch({
        type: "nextWindow",
        payload: "",
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

export default connect(mapStateToProps, mapDispatchToProps)(GridShow);
