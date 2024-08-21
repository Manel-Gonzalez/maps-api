import {useEffect, useState} from "react";

const Navbar = () => {
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
      <div className="flex flex-row gap-2 justify-end">
        <a href="/profile">Profile</a>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
