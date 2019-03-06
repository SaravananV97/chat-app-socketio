import React from "react";
import List from "@material-ui/core/List";
import ConvListItem from "../ConvListItem/ConvListItem";
import {connect} from "react-redux";

function convList(props) {
  return (
    <List>
      {props.people.map((user, index) => {
       return (
          <div key = {index} onClick={() => props.handleConvClick(props.people[index])}>
             <ConvListItem name = {user} />
          </div>
          );
       }
      )}
    </List>
  );
}

const mapStateToProps = (state) => {
  return {
    people: state.onlinePeople
  }
}

export default connect(mapStateToProps, null)(convList);
