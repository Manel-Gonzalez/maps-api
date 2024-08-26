import {useState} from "react";
import bcrypt from "bcryptjs";
import {useNavigate} from "react-router-dom";
import ThemeToggle from "./components/themeToggle";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/users");
      const users = await res.json();

      const user = users.find((user) => user.email === formData.email);
      if (user) {
        const isPasswordMatch = await bcrypt.compare(
          formData.password,
          user.password
        );
        if (isPasswordMatch) {
          console.log("password match");
          localStorage.setItem("userId", user.id);
          navigate("/");
        } else {
          alert("Password does not match");
        }
      } else {
        setErrorMessage("User not found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    const {name, value} = e.target;

    setFormData({...formData, [name]: value});
  }

  return (
    <div>
      <ThemeToggle />
      <div className="border-b my-8 mb-18" />
      <div className="flex flex-col justify-center items-center w-fit m-auto p-4 ">
        <h1 className="m-8 text-4xl">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center"
        >
          <div className="flex flex-row justify-between items-center w-full max-w-md mb-4 mt-4">
            <label className="w-1/3 text-left pr-4">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              className="w-2/3 p-2 border rounded"
            />
          </div>

          <div className="flex flex-row justify-between items-center w-full max-w-md mb-4">
            <label className="w-1/3 text-left pr-4"> Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              className="w-2/3 p-2 border rounded"
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <a
            onClick={() => navigate("/register")}
            className=" w-full p-2 hover:text-blue-500 cursor-pointer"
          >
            Don't have an account? Sign up
          </a>
          <button
            type="submit"
            className="w-full p-2 border rounded  hover:bg-slate-700 hover:text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
