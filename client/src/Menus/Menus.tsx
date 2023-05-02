import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Chip, Stack } from "@mui/material";
import Layout from "../Components/Layout";
import { Menu } from "../Types/Types";
import { MenuContent } from "../Contents/Menu_Contents";
import { config } from "../config/config";
import { Link } from "react-router-dom";

const Menus = () => {
  const { menuLocations } = useContext(MenuContent);
  const [menu, setMenu] = useState<Menu | null>(null);
  const { fetchData, menus } = useContext(MenuContent);

  const locationId = localStorage.getItem("locationId");

  // console.log(menuCategories);
  //create a new menu
  const createMenu = async () => {
    if (!menu?.name) return alert("pls enter name");
    const response = await fetch(`${config.apiBaseUrl}/menus`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(menu),
    });
    fetchData();
  };

  //delete a menu
  // const handleDelete = async(id) => {
  //   const response = await fetch(`${config.api}`)
  // }

  //loop for menuLocations
  const validMenuLocation = menuLocations
    .filter((menulocation) => String(menulocation.location_id) === locationId)
    .map((menuId) => menuId.menu_id);

  const filterMenu = menus.filter((menu) =>
    validMenuLocation.includes(menu.id as number)
  );

  return (
    <Layout title="Menus">
      <>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <h1>Create A New Menu</h1>
          <TextField
            sx={{ minWidth: "400px" }}
            id="filled-basic"
            label="Menu Name"
            variant="filled"
            onChange={(e) =>
              setMenu({
                name: e.target.value,
                price: menu?.price ? menu.price : 0,
              })
            }
          />
          <TextField
            sx={{ minWidth: "400px" }}
            id="filled-basic"
            label="Price"
            type="number"
            variant="filled"
            onChange={(e) =>
              setMenu({
                price: parseInt(e.target.value, 10),
                name: menu?.name ? menu.name : "",
              })
            }
          />
          <Button variant="contained" onClick={createMenu}>
            Create
          </Button>
        </Box>
        <Stack direction="row" spacing={1}>
          {filterMenu.map((item) => (
            <Link key={item.id} to={`/menus/${item.id}`}>
              <Chip label={item.name.toUpperCase()} />
            </Link>
          ))}
        </Stack>
      </>
    </Layout>
  );
};

export default Menus;
