import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import Layout from "../Components/Layout";
import { useContext, useEffect, useState } from "react";
import { MenuContent } from "../Contents/Menu_Contents";
import { Locations } from "../Types/Types";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const { locations, accessToken } = useContext(MenuContent);
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<
    Locations | undefined
  >();

  useEffect(() => {
    if (locations.length) {
      const selectedLocationId = localStorage.getItem("locationId");
      if (!selectedLocationId) {
        localStorage.setItem("locationId", String(locations[0].id));
        setSelectedLocation(locations[0]);
      } else {
        const selectedLocation = locations.find(
          (location) => String(location.id) === selectedLocationId
        );
        setSelectedLocation(selectedLocation);
      }
    }
    if (!accessToken) return navigate("/login");
  }, [locations, accessToken]);

  const handleOnChange = (e: SelectChangeEvent<number>) => {
    localStorage.setItem("locationId", String(e.target.value));
    const selectedLocation = locations.find(
      (location) => location.id === e.target.value
    );
    setSelectedLocation(selectedLocation);
  };
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: 400,
          m: "0 auto",
          flexDirection: "column",
          mt: 5,
        }}
      >
        <h1>Choose Your Shop Location</h1>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Locations</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Locations"
            value={selectedLocation ? selectedLocation.id : ""}
            onChange={handleOnChange}
          >
            {locations.map((location) => {
              return (
                <MenuItem key={location.id} value={location.id}>
                  {location.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </Layout>
  );
};

export default Setting;
