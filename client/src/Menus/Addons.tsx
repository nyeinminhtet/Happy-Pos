import { useContext, useState } from "react";
import Layout from "../Components/Layout";
import { MenuContent } from "../Contents/Menu_Contents";
import { Box, Button, Chip, Stack, TextField } from "@mui/material";
import { Addons as AddonsType } from "../Types/Types";
import { config } from "../config/config";

const Addons = () => {
  const { fetchData, addons } = useContext(MenuContent);
  const [newAddon, setNewAddon] = useState<AddonsType | null>(null);

  const createAddon = async () => {
    const response = await fetch(`${config.apiBaseUrl}/addons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAddon),
    });
    fetchData();
  };

  return (
    <Layout>
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
        <h1>Create New Addons</h1>
        <TextField
          sx={{ minWidth: "400px" }}
          id="filled-basic"
          label="Addon Name"
          variant="filled"
          onChange={(e) => {
            setNewAddon({
              name: e.target.value,
              price: newAddon?.price ? newAddon.price : 0,
            });
          }}
        />
        <TextField
          sx={{ minWidth: "400px" }}
          id="filled-basic"
          label="Price"
          type="number"
          variant="filled"
          onChange={(e) =>
            setNewAddon({
              price: parseInt(e.target.value, 10),
              name: newAddon?.name ? newAddon.name : "",
            })
          }
        />
        <Button variant="contained" onClick={createAddon}>
          create
        </Button>
      </Box>
      <Stack
        direction="column"
        spacing={2}
        maxWidth={200}
        sx={{ display: "flex", m: "0 auto" }}
      >
        {addons.map((addon) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Chip label={addon.name} style={{ cursor: "pointer" }} />
            <Chip
              label={addon.price + "k"}
              sx={{ backgroundColor: "lightblue", cursor: "pointer" }}
            />
          </Box>
        ))}
      </Stack>
    </Layout>
  );
};

export default Addons;
