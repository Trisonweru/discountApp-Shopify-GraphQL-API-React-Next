import router from "next/router";
import React from "react";
import Home from "../components/Home/Home";
import Layout from "../components/Layout/Layout";
import Navigation from "../components/Navigation/Navigation";

const Index = () => {
  return (
    <>
      <Navigation />
      <Home />
    </>
  );
};

export default Index;
