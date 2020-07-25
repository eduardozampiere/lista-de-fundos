import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import StoreProvider from "../context/Store";

function Index() {
  return (
    <>
      <StoreProvider>
        <Header />
        <Main />
      </StoreProvider>
    </>
  );
}

export default Index;
