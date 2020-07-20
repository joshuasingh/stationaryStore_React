import React from "react";
import "../App.css";
import From from "../components/From";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import pizzas from "../data";

import GridShow from "../components/GridView/GridShow";
import SearchPanel from "../components/SearchModuls/SearchPanel";
import { connect } from "react-redux";
import SideNav from "../components/SideBar/SideNav";
import BackDropSh from "../components/SideBar/Backdrop/BackDropSh";

import "bootstrap/dist/css/bootstrap.css";

class Homepage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sideBarStat: false,
    };

    this.getSearch = this.getSearch.bind(this);
    this.toggleSideNav = this.toggleSideNav.bind(this);
  }

  toggleSideNav = () => {
    this.setState((prev) => ({
      sideBarStat: !prev.sideBarStat,
    }));
  };

  getSearch = () => {
    this.props.populateData([
      {
        Url: "https://picsum.photos/200",
        ProductN: "Pencil",
        Price: "Rs 00",
      },
    ]);
  };

  render() {
    let sideBar;
    let backDrop;

    if (this.state.sideBarStat)
      backDrop = <BackDropSh toggle={this.toggleSideNav} />;

    sideBar = <SideNav sideState={this.state.sideBarStat} />;
    return (
      <>
        {sideBar}
        {backDrop}
        <SearchPanel
          search={this.getSearch}
          toggle={this.toggleSideNav}
          history={this.props.history}
        />

        <GridShow />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sData: state.SearchResult,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    populateData: (value) => {
      dispatch({
        type: "populateData",
        payload: value,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
