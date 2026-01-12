import { useState } from "react"
import { Link } from "react-router-dom"

const UserLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userdata , setUserdata] = useState ({});
  const submithandler = (e) => {
    e.preventDefault();
    setUserdata({
      email: email,
      password: password
    })
    setEmail('');
    setPassword('');
  }


  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
      <img className=" w-14 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <form onSubmit={(value)=>{
        submithandler(value)
      }}>
        <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
        <input 
        required 
        value= {email}
        onChange={(e)=>{
          setEmail(e.target.value)
        }}
        className="bg-[#F3F3F3] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
        type="email" 
        placeholder="Enter your email"
        />

        <h3 className='text-xl mb-2' >Enter Password</h3>

        <input 
        value={password}
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
        className="bg-[#F3F3F3] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
        type="password" 
        placeholder="password" 
        />

        <button  className="bg-black text-white font-semibold mb-2 rounded px-4 py-2 border w-full text-lg placeholder:text-base">Login</button>
        <p className='text-center'>New here?<Link to="/user-signup" className='text-blue-500'> Create new Account</Link>
        </p>
      </form>
      </div> 
      <div>
        <Link to="/captain-login" className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base">Sign in as Driver</Link>
      </div>
    </div>
  )
}

export default UserLogin
