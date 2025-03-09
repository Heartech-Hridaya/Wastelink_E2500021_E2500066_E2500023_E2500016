import "../App.css";

import React from "react";

export default function StaticPage() {
  return (
    <div className="h-screen w-screen overflow-hidden flex justify-center items-center">
      
      <iframe
        src="/myStaticPage/index.html"
        className="w-full h-full border-none overflow-hidden"
        title="Static Page"
      />
    </div>
  );
}
