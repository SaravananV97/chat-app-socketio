import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import "./convHeader.css"

const styles = {
    boxShadow: "none",
    color: "white",
    background: "rgb(105, 146, 234)"
}

const convHeader = (props) => {
    return (
        <div>
        <AppBar style = {styles} className = "header" position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
                {props.name}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
}

export default convHeader;

