import React from "react";
import List from "@material-ui/core/List";
import ConvListItem from "../ConvListItem/ConvListItem";

function convList(props) {
  return (
    <List>
      <div onClick={() => props.handleConvClick(1)}>
        <ConvListItem />
        <ConvListItem ></ConvListItem>
      </div>
    </List>
  );
}

export default convList;
