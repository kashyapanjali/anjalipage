import React from "react";
import "./Loader.css";

function Loader({ message = "Loading...", variant = "loading" }) {
  const isError = variant === "error";

  return (
    <div className={`loader ${isError ? "loader-error" : ""}`}>
      {!isError && <span className="loader-spinner" aria-hidden="true"></span>}
      <p className="loader-message" role={isError ? "alert" : "status"}>
        {message}
      </p>
    </div>
  );
}

export default Loader;

