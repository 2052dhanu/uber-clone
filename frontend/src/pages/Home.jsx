import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <>
        <div className='bg-cover bg-center bg-[url(https://rvtechnologies.com/assets/images/taxi_services_img.webp)] h-screen pt-8 flex justify-between flex-col bg-red-400'>
          <img className=" w-14 ml-8" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className="bg-white pb-7 py-4 px-4">
                <h2 className="text-3xl font-bold">Get Started with Uber</h2>
                <Link to = '/user-login' className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5">Continue</Link>
            </div>
        </div>
    </>
  )
}

export default Home
