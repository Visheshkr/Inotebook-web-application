import React ,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentails] = useState({email:"",password:""})
    let navigate=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}),

        })
            const json=await response.json();
            console.log(json);
            if(json.success){
                localStorage.setItem('token',json.authtoken)
                props.showAlert("Account Created Successfully","success");
                navigate("/")
            }
            else{
                props.showAlert("Invalid Credentials","danger");
            }
    }
    const onChange = (e) => {
        setCredentails({ ...credentials, [e.target.name]: e.target.value })
    }
  return (
    <div className='mt-2'>
        <h2 className='my-2'>Login to continue to iNotebook</h2>
        <form onSubmit={handleSubmit} >
            <div className="mb-3 row">
            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
            <input type="text" className="form-control" value={credentials.email}  onChange={onChange} id="email" name="email" />
            </div>
        </div>
        <div className="mb-3 row">
            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
            <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange}  name="password"/>
            </div>
        </div>
        <button type="submit" className='btn btn-primary' >Submit</button>
        </form>
        </div>
  )
}

export default Login
