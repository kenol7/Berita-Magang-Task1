import React from "react";
import Headline from "../components/Headline";
import BeritaTerpopuler from "../components/BeritaTerpopuler";
import Rekomendasi from "../components/Rekomendasi";
import Slide from "../components/Slide";

const Beranda = () => {
  return (
    <div>
      <Headline />
      <BeritaTerpopuler />
      <Rekomendasi />
      <Slide />
    </div>
  );
};

export default Beranda;
