import React from "react";

export default function Container({ children }) {
  return (
    <div style={{ width: "1500px", margin: "0 auto", maxWidth: "100%" }}>
      {children}
    </div>
  );
}
