import { useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";

const EditProduct = () => {
  const product = useLoaderData();

  const token = localStorage.getItem("token");

  const [title, setTitle] = useState(product.title);
  const [brand, setBrand] = useState(product.brand);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [imageURL, setImageURL] = useState(product.image_url);

  console.log(product);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const brand = form.brand.value;
    const price = form.price.value;
    const description = form.description.value;
    const image_url = form.image_url.value;

    const data = { title, brand, price, description, image_url };

    await fetch(`https://stride-tutorial-project-server.vercel.app/shoes/${product._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Product Updated!");
      });

    console.log(data);
  };

  return (
    <div>
      <h1 className="text-center text-4xl font-bold mb-8">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <input
            className="bg-gray-100 focus:bg-white border border-black rounded-md p-4 w-full"
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            className="bg-gray-100 focus:bg-white border border-black rounded-md p-4 w-full"
            type="text"
            name="brand"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div>
          <input
            className="bg-gray-100 focus:bg-white border border-black rounded-md p-4 w-full"
            type="number"
            name="price"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <input
            className="bg-gray-100 focus:bg-white border border-black rounded-md p-4 w-full"
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <input
            className="bg-gray-100 focus:bg-white border border-black rounded-md p-4 w-full"
            type="text"
            name="image_url"
            placeholder="Image URL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>

        <div>
          <input
            className="btn bg-red-500 hover:bg-red-600  p-4 text-white font-semibold w-full"
            type="submit"
            value="Update"
          />
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
