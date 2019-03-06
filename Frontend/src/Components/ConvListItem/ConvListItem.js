import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const convListItem = props => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src="" />
      </ListItemAvatar>
      <ListItemText
        primary= {props.name}
        secondary={
          <React.Fragment>
            {"I am Available"}
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default convListItem;
