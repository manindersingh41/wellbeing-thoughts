
import React , { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
const Login = () => {
    // const history = useNavigate();
    const [email , setEmail]= useState('');
    const [ password, setPassword]= useState('');
   
    const loginUser = async (event) =>  {
        event.preventDefault();

        const response = await fetch('http://localhost:1337/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email, 
                password, 
          
            }),
        })
        const data = await response.json();

        if (data.user) {
            localStorage.setItem('token', data.user) 
            // alert('login successful');
            window.location.href = '/dashboard';
        }
        else {
            alert('login failed')
        }
        
    }
        return (
            <div className='container col-4 pt-5'>
            <form className='form' onSubmit={loginUser}>
                 <h2 className='text-center text-light'>Login </h2>
                 <div className
                 ="form-group">
                     <label htmlFor="firstname">Email</label>
                     <input type="email" className
                     ="form-control" id="email" placeholder="Email"
                     onChange={e => setEmail(e.target.value)}
                     />
                 </div>
                 <div className
                 ="form-group">
                     <label htmlFor="firstname">Password</label>
                 <input type="password" className
                 ="form-control" id="password1" placeholder="Password" 
                 onChange={e => setPassword(e.target.value)}
                 />
                 </div>
                 <div className
                 ="form-group mt-4">
                     <button type="submit" className
                     ="btn btn-primary" id="submit" placeholder="submit">Login</button>  
                 </div>
                 
             </form>
       </div>
        )
   
}

export default Login;