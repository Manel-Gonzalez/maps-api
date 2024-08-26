import {useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import bcrypt from "bcryptjs";
import ThemeToggle from "./components/themeToggle";

function Register() {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    profile_pic: "/avatar.png",
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
    <div>
      <ThemeToggle />
      <div className="border-b my-8 mb-18" />
      <div className="flex flex-col justify-center items-center  m-auto">
        <h1 className="text-4xl m-8">Register</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center"
        >
          <div className="flex flex-row justify-between items-center w-full max-w-md mb-4 mt-4 gap-4">
            <label className="w-1/6 text-left">Username:</label>
            <input
              type="text"
              name="username"
              value={registerData.username}
              onChange={(e) => handleChange(e)}
              className="w-4/6 p-2 border rounded"
            />
            {!registerData.username && (
              <span className="text-red-600 w-1/6">Username is required</span>
            )}
          </div>

          <div className="flex flex-row justify-between items-center w-full max-w-md mb-4 gap-4">
            <label className="w-1/6 text-left">Email:</label>
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={(e) => handleChange(e)}
              className="w-4/6 p-2 border rounded"
            />
            {!registerData.email && (
              <p className="text-red-600 w-1/6">Must be a valid email</p>
            )}
          </div>

          <div className="flex flex-row justify-between items-center w-full max-w-md mb-4 gap-4">
            <label className="w-1/6 text-left"> Password:</label>
            <input
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
              className=" w-4/6 p-2 border rounded"
            />
            {!registerData.password && (
              <div className="text-red-600 w-1/6">
                Must have atleast 8 characters
              </div>
            )}
          </div>
          <a
            onClick={() => navigate("/login")}
            className=" w-full p-2 hover:text-blue-500 cursor-pointer"
          >
            Alredy have an acount? Login
          </a>

          <button
            type="submit"
            className="w-full p-2 border  rounded  hover:bg-slate-700 hover:text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
