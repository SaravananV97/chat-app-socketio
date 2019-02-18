import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = {
  appbar: {
    boxShadow: "none",
    color:"black",
    backgroundColor: "#7fa2ef",
  }
};

function appBar(props) {
  return (
    <div>
      <AppBar style={styles.appbar} position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={styles.grow}>
            Chat App
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default appBar;