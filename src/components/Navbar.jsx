import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() { 
  const [logonav, setLogonav] = useState('false');

  const changeLogonav = () => {
    if (window.scrollY >= 50) {
      setLogonav(true);
    } else {
      setLogonav(false);
    }
}

useEffect(() => {
  window.addEventListener('scroll', changeLogonav);
  return () => {
    window.removeEventListener('scroll', changeLogonav);
  };
}, []);

  return (
    <div className={`w-full fixed flex flex-row items-center justify-between px-10 transition-colors duration-300 z-50 ${logonav ? 'bg-blue-500' : 'bg-transparent'}`}>
      <div className="py-8 px-20 flex items-center justify-between">
        <img className="max-w-40" src={logonav? '/Logonav2.png' : '/logonav.png'} alt="logonav" />
      </div>

      <div className={`font-inter flex gap-8 transition-all duration-500 ${logonav ? 'text-white' : 'text-gray-400'} text-gray-500`}>
        <Link to={"/"}>Beranda</Link>
        <Link to={"/terbaru"}>Terbaru</Link>
        <Link to={"/hiburan"}> Hiburan</Link>
        <Link to={"/gayahidup"}>Gaya Hidup</Link>
        <Link to={"/nasional"}>Nasional</Link>
        <Link to={"/internasional"}>Internasional</Link>
      </div>

    </div>
  );
};


