/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SingleProductCardDashboard = ({ product, onDelete }) => {
  const { _id, title, brand, price, description, image_url } = product;
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    await fetch(`https://stride-tutorial-project-server.vercel.app/shoes/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        onDelete(product._id);
        toast.success("Product Deleted!");
      });
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image_url} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}!</h2>
        <h4 className="font-medium text-gray-400">{brand}</h4>
        <h4 className="font-semibold text-lg">${price}</h4>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <Link to={`/products/${_id}`} className="btn btn-primary">
            See Details
          </Link>
          <Link
            to={`edit-product/${_id}`}
            className="btn btn-active btn-accent"
          >
            Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-error">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCardDashboard;
