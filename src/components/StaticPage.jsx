import "../App.css";
import React from "react";
import Header from "./Header";

export default function StaticPage({ isLoggedIn, handleLogout, openLoginModal }) {
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        openLoginModal={openLoginModal}
      />
      <div className="h-screen w-screen overflow-hidden flex justify-center items-center">
        <iframe
          src="/myStaticPage/index.html"
          className="w-full h-full border-none overflow-hidden"
          title="Static Page"
        />
      </div>
    </>
  );
}