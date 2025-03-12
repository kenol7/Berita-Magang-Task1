import React from "react";
import { Route, Routes } from "react-router-dom";
import Beranda from "../pages/Beranda";
import Detail from '../pages/Detail';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Beranda />}></Route>
      <Route path="/:slug_kategori" element={<Beranda />}></Route>
      <Route path="/:slug_kategori/detail" element={<Detail />}></Route>
    </Routes>
  );
}
