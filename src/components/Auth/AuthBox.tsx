import React from "react";
import { Login } from "./Login";
import { Register } from "./Register";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export const AuthBox = ({ onAuthorized, mode }) => {
  const [basicActive, setBasicActive] = React.useState(mode ?? "login");

  const handleBasicClick = (event: React.SyntheticEvent, value: string) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  return (
    <TabContext value={basicActive}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleBasicClick} variant="fullWidth">
          <Tab label="Register" value="register" />
          <Tab label="Login" value="login" />
        </TabList>
      </Box>
      <TabPanel value="login">
        <Login onLogin={onAuthorized} />
      </TabPanel>
      <TabPanel value="register">
        <Register onRegister={onAuthorized} />
      </TabPanel>
    </TabContext>
  );
};
