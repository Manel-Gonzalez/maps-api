import {useEffect, useState} from "react";
import Navbar from "./components/navbar";
const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetch(`http://localhost:3000/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  function logout() {
    localStorage.removeItem("userId");
    window.location.href = "/login";
  }

  return (
    <div>
      <Navbar />
      <h1>Welcome to the Home Page {userData?.username}</h1>
    </div>
  );
};

export default Home;
