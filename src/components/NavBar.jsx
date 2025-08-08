import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import {BASE_URL} from "../utils/constants"
import axios from "axios";
import { removeUser } from "../utils/userSlice"
function NavBar() {
  const user = useSelector(store=>store.user)
  const dispatch = useDispatch()
  const Navigate = useNavigate()

 const handleLogout = async()=>{
  try{
    await axios.post(BASE_URL+'/logout',{},{withCredentials:true});
    dispatch(removeUser())
    return Navigate('/login')
  }catch(err){
    console.error("Logout failed", err);
  }
 }
  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to='/' className="btn btn-ghost text-xl">DevTinder</Link>
        </div>
        <div className="flex gap-2">
          <p className="m-auto font-mono ">{user?user.firstName:"Login"}</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ">
                <img
                  alt="User photo "
                  src={
                    user?user.photoUrl:"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to='/connections'>Connections</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
                  

            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar




