import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { LoginButton } from "./LoginButton";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex justify-center flex-1 mt-20 ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-6 mt-16">
      <div className="container mx-auto text-center text-white">
        <p>&copy; {new Date().getFullYear()} My Blog. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
