import {useEffect, useState} from "react";
import Navbar from "./components/navbar";
import bcrypt from "bcryptjs";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: "",
    email: "",
    pasword: "",
    profile_pic: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetch(`http://localhost:3000/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          setEditData({
            username: data.username,
            email: data.email,
            pasword: data.pasword,
            profile_pic: data.profile_pic || "",
          });
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = async (e) => {
    const {name, value} = e.target;
    if (name === "password") {
      const hashedPassword = await bcrypt.hash(value, 10);
      setEditData({
        ...editData,
        [name]: hashedPassword,
      });
    } else {
      setEditData({
        ...registerData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditData({
        ...editData,
        profile_pic: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveClick = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const updatedData = {
        ...editData,
        password: editData.password || userData.password, // Use current password if not modified
      };

      fetch(`http://localhost:3000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          setIsEditing(false);
        })
        .catch((error) => console.error("Error updating user data:", error));
    }
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1>Profile</h1>
        <div>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={editData.username}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          ) : (
            <p>Username: {userData.username}</p>
          )}
        </div>
        <div>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editData.email}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          ) : (
            <p>Email: {userData.email}</p>
          )}
        </div>
        <div>
          {isEditing ? (
            <input
              type="text"
              name="password"
              onChange={handleChange}
              className="p-2 border rounded"
            />
          ) : (
            <p>Password: ******</p>
          )}
        </div>
        <div>
          {isEditing ? (
            <input
              type="file"
              onChange={handleFileChange}
              className="p-2 border rounded"
            />
          ) : (
            userData.profile_pic && (
              <img
                src={userData.profile_pic}
                alt="Profile"
                className="w-32 h-32 rounded-full"
              />
            )
          )}
        </div>

        {isEditing ? (
          <button
            onClick={handleSaveClick}
            className="p-2 border border-slate-200 shadow-sm shadow-slate-200 hover:bg-slate-600 text-white rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEditClick}
            className="p-2 border border-slate-200 shadow-sm shadow-slate-200 hover:bg-slate-600 text-white rounded"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;

/* 




*/
