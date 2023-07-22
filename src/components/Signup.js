import React ,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentails] = useState({name:"",email:"",password:"",cpassword:""})
    let navigate=useNavigate();
    const handleSubmit=async (e)=>{
        const {name,email,password} =credentials;
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name,email,password}),

        })
            const json=await response.json();
            if(json.success){
            console.log(json);
                localStorage.setItem('token',json.authtoken)
                navigate("/")
                props.showAlert("Account Created Successfully","success");
            }
            else{
              props.showAlert("Invalid Credentials","danger");
            }
    }
    const onChange = (e) => {
        setCredentails({ ...credentials, [e.target.name]: e.target.value })
    }
  return (
    <div className='container mt-2'>
       <h2 className='my-3'>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
      <div className="my-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" onChange={onChange} id="password"  minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name="cpassword" onChange={onChange} id="cpassword" minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
};

export default Signup
