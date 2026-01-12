import {Link} from 'react-router-dom'
import { useState } from "react"
const CaptainSignup = () => {
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState(""); 
  const [firstName , setFirstName] = useState("");
  const [lastName , setLastName] = useState(""); 
  const [captaindata , setCaptaindata] = useState ({});
  const submithandler = (e) => {
    e.preventDefault();
    setCaptaindata({
      fullname:{
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password
    })
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  }

  return (
    <div>
      <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
      <img className=" w-14 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <form onSubmit={(value)=>{
        submithandler(value)
      }}>

        <h3 className='text-lg font-medium mb-2'>What's your name?</h3>
        <div className='flex gap-4 mb-5'>
          <input 
          required 
          value={firstName}
          onChange={(e)=>{
            setFirstName(e.target.value)
          }}
          className="bg-[#F3F3F3] rounded px-4 py-2 w-1/2 border  text-lg placeholder:text-base"
          type="text" 
          placeholder="First name"
          />
          <input 
          value={lastName}
          onChange={(e)=>{
            setLastName(e.target.value)
          }}
          className="bg-[#F3F3F3] rounded px-4 py-2 w-1/2 border  text-lg placeholder:text-base"
          type="text" 
          placeholder="Last name"
          />
        </div>

        <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
        <input 
        required 
        value={email}
        onChange={(e)=>{
          setEmail(e.target.value)
        }}
        className="bg-[#F3F3F3] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
        type="email" 
        placeholder="Enter your email"
        />

        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

        <input 
        required 
        value={password}
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
        className="bg-[#F3F3F3] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
        type="password" 
        placeholder="password" 
        />

        <button  className="bg-black text-white font-semibold mb-2 rounded px-4 py-2 border w-full text-lg placeholder:text-base">Login</button>
        <p className='text-center'>Already have a account?<Link to="/captain-login" className='text-blue-500'> Login here</Link>
        </p>
      </form>
      </div> 
      <div>
        <p className='text-[10px] leading-tight'>By continuing, you agree to calls, including by autodialler, WhatsApp or texts from Uber and its affiliates.</p>
      </div>
    </div>
    </div>
  )
}

export default CaptainSignup
