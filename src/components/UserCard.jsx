import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedSlice";
const UserCard = ({ user }) => {
  //const {firstName,lastName,photoUrl , age , gender ,about} = user;

  // Provide a fallback empty object to avoid destructuring errors
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user || {};

  // Show a loading/placeholder card if user is not yet loaded
  if (!user) {
    return (
      <div className="card bg-base-200 w-80 shadow-sm flex items-center justify-center p-6">
        <p className="text-gray-500">No User Found ...</p>
      </div>
    );
  }
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err.message)
    }
  };
  return (
    <div className="card bg-base-200 w-80 shadow-sm">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

