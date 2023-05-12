import React, { useState } from "react";
import { Menu } from "../Types/Types";
import { Box, TextField, Button } from "@mui/material";
import Layout from "../Components/Layout";
import FileDropZone from "./FileDropZone";
import { config } from "../config/config";

const CreateMenu = () => {
  const [menuImg, setMenuImg] = useState<File>();
  const [menu, setMenu] = useState<Menu>({ name: "", price: 0 });

  const onFileSelected = (files: File[]) => {
    setMenuImg(files[0]);
  };

  const createMenu = async () => {
    if (!menu.name) return console.log("Please enter menu name");
    const formData = new FormData();
    formData.append("menu", JSON.stringify(menu));
    formData.append("files", menuImg as Blob);
    const response = await fetch(`${config.apiBaseUrl}/menus`, {
      method: "POST",
      body: formData,
    });
    console.log(response);
    console.log(Object.fromEntries(formData));
  };
  return (
    <Layout>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 350,
            margin: "0 auto",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Create a new menu</h1>
          <TextField
            label="Name"
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={(evt) => setMenu({ ...menu, name: evt.target.value })}
          />
          <TextField
            label="Price"
            variant="outlined"
            type="number"
            sx={{ mb: 2 }}
            onChange={(evt) =>
              setMenu({ ...menu, price: parseInt(evt.target.value, 10) })
            }
          />
          <FileDropZone onFileSelected={onFileSelected} />
          <Button variant="contained" onClick={createMenu} sx={{ mt: 2 }}>
            Create
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default CreateMenu;
