import {useEffect, useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import ThemeToggle from "./themeToggle";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

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
    navigate("/login");
  }

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  return (
    <div className="flex flex-row gap-2 justify-between py-4 border-b ">
      <div className=" flex flex-row gap-8">
        <img
          className="cursor-pointer w-12 h-12"
          src="mono.png"
          alt="home"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="flex flex-row gap-8">
        {userData?.profile_pic && (
          <div className="relative" ref={dropdownRef}>
            <img
              src={userData.profile_pic}
              alt="profile_pic"
              className=" w-12 h-12 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />

            {isDropdownVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownVisible(false);
                  }}
                >
                  Profile
                </a>
                <a
                  onClick={(e) => {
                    e.stopPropagation();
                    logout();
                  }}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
