import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl mb-6">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex items-center justify-between m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-800  flex items-center justify-center">
              <img
                alt="profile"
                src={photoUrl || "https://via.placeholder.com/80"}
                className="w-full h-full object-cover"
                style={{ minWidth: "80px", minHeight: "80px" }}
              />
            </div>

            <div className="text-left mx-4 flex-1">
              <h2 className="font-bold text-xl text-white">
                {firstName + " " + lastName}
              </h2>
              {age && gender && (
                <p className="text-gray-300">{age + ", " + gender}</p>
              )}
              <p className="text-gray-400">{about}</p>
            </div>

            <Link to={"/chat/" + _id}>
              <button className="btn btn-primary">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
