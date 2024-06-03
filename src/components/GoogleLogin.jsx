import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";

const GoogleLogin = () => {
  const { googleLogin } = useAuth();

  const handleGoogleLogin = () => {
    googleLogin().then((data) => {
      if (data?.user.email) {
        const userData = {
          email: data?.user?.email,
          name: data?.user?.displayName,
        };

        fetch("http://localhost:5000/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((res) => res.json())
          .then((result) => {
            localStorage.setItem("token", result?.token);
          });
      }
    });
  };

  return (
    <button onClick={handleGoogleLogin} className="btn w-full">
      <div className="flex items-center gap-3 justify-center">
        <FcGoogle size={24} />
        <p>Google</p>
      </div>
    </button>
  );
};

export default GoogleLogin;
