import { useAuth } from "../AuthProvider"

const Navbar = () => {
  const {userData, googleLogin, signOutUser} = useAuth();


  const handleGoogleLogin=()=>{
    googleLogin().then(()=>alert("Successfully Logged in")).catch(error=>console.log(error.message))
  }
  return (
    <div className="navbar w-11/12">
  <div className="navbar-start">
    <input type="checkbox" value="nord" className="toggle theme-controller" />
  </div>
  <div className="navbar-center hidden lg:flex">
  </div>
  <div className="navbar-end">
    <div className="!space-x-3">
   {
    !userData?.email  ?
    <button onClick={handleGoogleLogin} className="btn btn-outline !px-6 btn-info">Google Signin</button> :
     <Avatar data={userData}/>
    }
    {userData?.email ? <button onClick={signOutUser} className="btn btn-outline !px-6 btn-error">Logout</button> : ""}
    </div>
  </div>
</div>
  )
}


const Avatar = ({data})=>{
  const {displayName, photoURL, email} = data || {}
  console.log(photoURL)
  return (
    <div className="avatar">
  <div className="w-[40px] rounded-full">
    <img src={photoURL ? photoURL : dynamicImage("avatar.svg")} alt={displayName} className="object-cover h-full w-full" />
  </div>
</div>
  )
}

const dynamicImage = (img)=>{
  return new URL(`../assets/${img}`, import.meta.url).href
}

export default Navbar