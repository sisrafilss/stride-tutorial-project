import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetch(`https://stride-tutorial-project-server.vercel.app/user/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, [user?.email]);

  return (
    <div>
      <div className="flex justify-between mb-7">
        <h1 className="text-3xl ">Profile Information</h1>
        <Link
          to={`/dashboard/profile/edit/${userInfo?._id}`}
          className="btn btn-neutral btn-md"
        >
          Edit Profile
        </Link>
      </div>
      <div>
        {userInfo?.name && (
          <h2>
            <span className="font-bold">Name: </span>
            {userInfo?.name}
          </h2>
        )}

        {userInfo?.email && (
          <h2>
            <span className="font-bold">Email: </span>
            {userInfo?.email}
          </h2>
        )}
        {userInfo?.mobileNumber && (
          <h2>
            <span className="font-bold">Mobile Number: </span>
            {userInfo?.mobileNumber}
          </h2>
        )}
        {userInfo?.age && (
          <h2>
            <span className="font-bold">Age: </span>
            {userInfo?.age}
          </h2>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
