import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import PartnerLogo from "./layout/PartnerLogo";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/product/:id" component={ProductScreen}></Route>
        <Route path="/" component={HomeScreen} exact></Route>
      </main>
      <PartnerLogo />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
