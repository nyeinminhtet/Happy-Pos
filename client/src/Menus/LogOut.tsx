import React, { useContext, useEffect } from "react";
import Layout from "../Components/Layout";
import { MenuContent, defaultMenu } from "../Contents/Menu_Contents";

const Logout = () => {
  const { updateData } = useContext(MenuContent);

  useEffect(() => {
    updateData(defaultMenu);
  }, []);

  return (
    <Layout>
      <h2>Your account is logout</h2>
    </Layout>
  );
};

export default Logout;
