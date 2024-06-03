import { Link } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Registration = () => {
  // eslint-disable-next-line no-unused-vars
  const [passMatch, setPassMatch] = useState(true);
  const { createUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirm_password.value;

    if (password !== confirmPassword) {
      setPassMatch(false);
    } else {
      setPassMatch(true);
    }

    console.log(email, password, confirmPassword);

    // create new user using email and password
    if (password === confirmPassword) {
      createUser(email, password).then((data) => {
        if (data?.user.email) {
          const userData = {
            email: data?.user?.email,
            name: name,
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
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                className="input input-bordered"
                required
              />
            </div>

            {!passMatch && (
              <p className=" text-red-400">Password do not match!</p>
            )}

            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>

            <div className="mt-5">
              <GoogleLogin />
            </div>

            <p className="mt-3">
              Already have an account?{" "}
              <Link className="text-orange-700" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
