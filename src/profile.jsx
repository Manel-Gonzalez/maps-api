import {useEffect, useState} from "react";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: "",
    email: "",
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
          });
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    const userId = localStorage.getItem("userId");
    fetch(`http://localhost:3000/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setIsEditing(false);
      })
      .catch((error) => console.error("Error updating user data:", error));
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
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
  );
}

export default Profile;
