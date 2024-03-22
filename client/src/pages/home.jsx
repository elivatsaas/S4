"use client";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Button, ButtonGroup, Link } from "@nextui-org/react";
import "../css/S4_Landing.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <meta charSet="utf-8" />
      <title>S4 Scheduling Software</title>
      <h1> S4 Scheduling Software</h1>
      <p>
        Welcome to S4! S4 is an autogenerating scheduling software that allows{" "}
        <br />
        for the easy creation of schedules for your employees based off of the
        data you give us!
      </p>
      <p>Please click the button below to get started!</p>

      <Button color="primary">
        <Link href="/schedules">Get Started</Link>
      </Button>
    </>
  );
};

export default Home;
