import React, { useEffect, useState } from "react";
import BannerSlider from "../components/bannerslider";
import BeneficiosCliente from "../components/beneficioscliente2";
import ObjetivosCliente from "../components/objetivoscliente";
import Productoscliente from "../components/productoscliente";
import CategoriasCliente from "../components/categoriaselector";
import BlogCliente from "../components/blogcliente";
import Footer from "../components/footer2";
const Home = () => {

  return (
    <div className="min-h-screen bg-[#222222] text-white flex flex-col justify-between">
      {/* Banner principal */}
      <section className="w-full relative">
        <BannerSlider />
        <BeneficiosCliente />
        <ObjetivosCliente />
        <Productoscliente />
        <CategoriasCliente />
        <BlogCliente />
        <Footer />
      </section>
    </div>
  );
};

export default Home;
