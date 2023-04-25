import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const Routes = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "300px",
        fontSize: "1.2rem",
        fontWeight: "bold",
        // color: "lightblue",
        textAlign: "center",
      }}
    >
      <Link
        to={"/menus"}
        relative="path"
        style={{
          margin: "5px",
          textDecoration: "none",
          padding: "10px 20px",
          width: "100%",

          color: "black",
          backgroundColor: "lightgrey",
        }}
      >
        Menus
      </Link>
      <Link
        to={"/menu_categories"}
        relative="path"
        style={{
          // margin: "10px",
          textDecoration: "none",
          padding: "10px 20px",
          width: "100%",

          color: "black",
          backgroundColor: "lightgrey",
        }}
      >
        Menus-Categories
      </Link>{" "}
      <Link
        to={"/addons"}
        relative="path"
        style={{
          // margin: "10px",
          textDecoration: "none",
          padding: "10px 20px",
          width: "100%",
          color: "black",

          backgroundColor: "lightgrey",
        }}
      >
        Addons
      </Link>{" "}
      <Link
        to={"/addon_categories"}
        relative="path"
        style={{
          // margin: "10px",
          textDecoration: "none",
          padding: "10px 20px",
          width: "100%",

          color: "black",
          backgroundColor: "lightgrey",
        }}
      >
        Addon-Categories
      </Link>
    </Box>
  );
};

export default Routes;
