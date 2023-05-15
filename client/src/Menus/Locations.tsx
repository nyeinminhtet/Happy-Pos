import React, { useContext, useEffect, useState } from "react";
import { MenuContent } from "../Contents/Menu_Contents";
import Layout from "../Components/Layout";
import { Locations } from "../Types/Types";
import { Box, Button, TextField, Typography } from "@mui/material";
import { config } from "../config/config";

const LocationsComp = () => {
  const accessToken = window.localStorage.getItem("accessToken");
  const { locations, fetchData } = useContext(MenuContent);
  const [newLocation, setNewLocation] = useState<Locations>({
    name: "",
    address: "",
  });
  const [updateLocations, setUpdateLocations] =
    useState<Locations[]>(locations);

  useEffect(() => {
    setUpdateLocations(locations);
  }, [locations]);
  //create location
  const createLocation = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/locations$`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLocation),
      });
      const data = await response.json();
      setUpdateLocations(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  //upload locations
  const uploadLocation = async (location: Locations) => {
    const locationId = location.id;
    const oldLocation = locations.find((olac) => olac.id === locationId);
    const newLocation = updateLocations.find(
      (uploadLocation) => uploadLocation.id === locationId
    );
    if (
      oldLocation?.name !== newLocation?.name ||
      oldLocation?.address !== newLocation?.address
    ) {
      console.log("should i update", location);
      await fetch(`${config.apiBaseUrl}/locations/${location.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(location),
      });
      fetchData();
    }
  };

  return (
    <Layout title="Locations">
      <Box sx={{ mt: 5, px: 5 }}>
        {updateLocations.map((location, index) => {
          return (
            <Box
              sx={{ display: "flex", alignItems: "center", mb: 3 }}
              key={location.id}
            >
              <Typography variant="h5" sx={{ mr: 1 }}>
                {index + 1}
              </Typography>
              <TextField
                value={location.name}
                sx={{ mr: 3 }}
                onChange={(e) => {
                  const newLocations = updateLocations.map((updateLocation) => {
                    if (updateLocation.id === location.id) {
                      return { ...updateLocation, name: e.target.value };
                    }
                    return updateLocation;
                  });
                  setUpdateLocations(newLocations);
                }}
              />
              <TextField
                value={location.address}
                sx={{ mr: 3, minWidth: 300 }}
                onChange={(e) => {
                  const newLocations = updateLocations.map((uploadLocation) => {
                    if (uploadLocation.id === location.id) {
                      return { ...uploadLocation, address: e.target.value };
                    }
                    return uploadLocation;
                  });
                  setUpdateLocations(newLocations);
                }}
              />
              <Button
                variant="contained"
                onClick={() => uploadLocation(location)}
              >
                Update
              </Button>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{ px: 5.5, display: "flex", alignItems: "center", mb: 3, ml: 2 }}
      >
        <TextField
          value={newLocation.name}
          placeholder="Name"
          sx={{ mr: 3 }}
          onChange={(e) =>
            setNewLocation({ ...newLocation, name: e.target.value })
          }
        />
        <TextField
          value={newLocation.address}
          placeholder="Address"
          sx={{ mr: 3, minWidth: 300 }}
          onChange={(evt) => {
            setNewLocation({ ...newLocation, address: evt.target.value });
          }}
        />
        <Button variant="contained" onClick={createLocation}>
          Create
        </Button>
      </Box>
    </Layout>
  );
};

export default LocationsComp;
