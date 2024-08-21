import {useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import bcrypt from "bcryptjs";

function Register() {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !registerData.username ||
      !registerData.email ||
      !registerData.password
    ) {
      alert("All fields are required");
      return;
    }
    try {
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(registerData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.user);
          navigate("/login");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e) => {
    const {name, value} = e.target;
    if (name === "password") {
      const hashedPassword = await bcrypt.hash(value, 10);
      setRegisterData({
        ...registerData,
        [name]: hashedPassword,
      });
    } else {
      setRegisterData({
        ...registerData,
        [name]: value,
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center"
      >
        <div className="flex flex-row justify-between items-center w-full max-w-md mb-4 mt-4">
          <label className="w-1/3 text-left pr-4">Username:</label>
          <div className="w-2/3">
            <input
              type="text"
              name="username"
              value={registerData.username}
              onChange={(e) => handleChange(e)}
              className="p-2 border rounded"
            />
            {!registerData.username && (
              <p className="text-red-600">Username is required</p>
            )}
          </div>
        </div>

        <div className="flex flex-row justify-between items-center w-full max-w-md mb-4">
          <label className="w-1/3 text-left pr-4">Email:</label>
          <div className="w-2/3">
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={(e) => handleChange(e)}
              className="p-2 border rounded"
            />
            {!registerData.email && (
              <p className="text-red-600">Must be a valid email</p>
            )}
          </div>
        </div>

        <div className="flex flex-row justify-between items-center w-full max-w-md mb-4">
          <label className="w-1/3 text-left pr-4"> Password:</label>
          <div className="w-2/3">
            <input
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
              className="p-2 border rounded"
            />
            {!registerData.password && (
              <p className="text-red-600">
                Password must have atleast 8 characters
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-2 border border-slate-200 shadow-sm shadow-slate-200 hover:bg-slate-600  text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
