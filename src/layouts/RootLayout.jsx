import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../Footer";

const RootLayout = () => (
  <div>
    <Navbar />
    <Container>
      <Outlet />
    </Container>
    <Footer />
  </div>
);

const Container = styled.div`
  padding: 2rem;
`;

export default RootLayout;
