import React, { useState } from "react";
import axios from "axios"
import {useDispatch} from "react-redux"
import { addUser } from "../utils/userSlice";
import {useNavigate} from 'react-router-dom'
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [emailId, setEmailId] = useState("kg@gmail.com");
  const [password, setPassword] = useState("KetanGathibandhe@1234");
  const [error , setError] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL+"/login", {  //axios is a npm package used for api call . we can use fetch also but axios is easy 
        emailId,
        password,
      },{withCredentials:true});
      dispatch(addUser(res.data));
      navigate("/")
    } catch (error) {
      setError(error?.request?.response ||"Something went wrong")
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <div className="my-5">
              <label className="form-control w-full max-w-xs py-4">
                <div className="label">
                  <span className="label-text px-1"> Email ID</span>
                </div>
                <input
                  type="text"
                  value={emailId}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </label>
            </div>

            <div className="my-5">
              <label className=" form-control w-full max-w-xs ">
                <div className="label ">
                  <span className="label-text px-1"> Password</span>
                </div>
                <input
                  type="text"
                  value={password}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
          </div>
          <p className="text-red-400">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;




