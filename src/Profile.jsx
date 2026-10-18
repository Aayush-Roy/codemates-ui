import { useSelector } from "react-redux"
import EditProfile from "./components/ui/EditProfile"

const Profile = () => {
  const user = useSelector(store=>store.user);
  console.log("userinfo in pro", user)
  return (
    user && (
      <div>
     <EditProfile user={user}/>
    </div>
    )
    
  )
}

export default Profile
