import React from "react";

const Home = () => {
  return (
    <div>
      <div className="flex flex-row gap-2 justify-end">
        <a href="/register">Register</a>
        <a href="/login">Login</a>
      </div>
      <h1>Welcome to the Home Page</h1>
    </div>
  );
};

export default Home;
