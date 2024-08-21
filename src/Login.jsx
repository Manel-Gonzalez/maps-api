import { useState } from 'react';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try{
      const res = await fetch('http://localhost:3000/users')
      const users = await res.json()
      const user = users.find(user => user.email === formData.email)
      if(user){
        const isPasswordMatch = await bcrypt.compare(formData.password, user.password)
        if(isPasswordMatch){
          console.log('password match');
          navigate('/');
        }else{
          console.log('password does not match');
          
        }
      }
    }catch(error){
      console.log(error)
    }
  }

  function handleChange(e) {
    setFormData({...formData, [e.target.name] : e.target.value})
  }

    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
              <h1 className='mb-4 text-3xl'>Login</h1>
              <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-center'>

                <div className='flex flex-row justify-between items-center w-full max-w-md mb-4'>
                  <label className='w-1/3 text-left pr-4'>Email:</label>
                  <input type="email" name="email" value={formData.email} onChange={e => handleChange(e)} className='w-2/3 p-2 border rounded' />
                </div>

                <div className='flex flex-row justify-between items-center w-full max-w-md mb-4'>
                  <label className='w-1/3 text-left pr-4'> Password:</label>
                  <input type="password" name="password" value={formData.password} onChange={e => handleChange(e)} className='w-2/3 p-2 border rounded'/>
                </div>

                <button type="submit" className='p-2 border border-slate-200 shadow-sm shadow-slate-200 hover:bg-slate-600  text-white rounded'>Submit</button>
              
              </form>
            </div>
    )
}

export default Login

