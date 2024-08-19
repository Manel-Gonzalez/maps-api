import { useState } from 'react';

function Register() {

    const [registerData, setRegisterData] = useState({
      username: '',
      email: '',
      password: '',
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(registerData),
      })
      .then( res => res.json())
      .then( data => console.log(data))
    }

    const handleChange = (e) => {
      setRegisterData({
        ...registerData,
        [e.target.name]: e.target.value,
      });
    }

    return (
        <>
          <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
              <label>
                Username:
                <input type="text" name="username" value={registerData.username} onChange={e => handleChange(e)} />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={registerData.email} onChange={e => handleChange(e)} />
              </label>
              <label>
                Password:
                <input type="password" name="password" value={registerData.password} onChange={e => handleChange(e)}/>
              </label>
              <button type="submit">Register</button>
            </form>
          </div>
        </>
      )
}

export default Register
