import toast from "react-hot-toast";

const AddProduct = () => {
  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const brand = form.brand.value;
    const price = form.price.value;
    const description = form.description.value;
    const image_url = form.image_url.value;

    const data = { title, brand, price, description, image_url };

    await fetch("https://stride-tutorial-project-server.vercel.app/shoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Product added successfully!");
        // form.reset();
      });

    console.log(data);
  };

  return (
    <div>
      <h1 className="text-center text-4xl font-bold mb-8">Add a Product</h1>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <input
            className="bg-gray-100 focus:bg-white border border-black rounded-md p-4 w-full"
            type="text"
            name="title"
            placeholder="Title"
          />
        </div>
        <div>
          <input
            className="bg-gray-100 focus:bg-white border border-black rounded-md p-4 w-full"
            type="text"
            name="brand"
            placeholder="Brand"
          />
        </div>
        <div>
          <input
            className="bg-gray-100 focus:bg-white border border-black rounded-md p-4 w-full"
            type="number"
            name="price"
            placeholder="Price"
          />
        </div>
        <div>
          <input
            className="bg-gray-100 focus:bg-white border border-black rounded-md p-4 w-full"
            type="text"
            name="description"
            placeholder="Description"
          />
        </div>
        <div>
          <input
            className="bg-gray-100 focus:bg-white border border-black rounded-md p-4 w-full"
            type="text"
            name="image_url"
            placeholder="Image URL"
          />
        </div>
        <div>
          <input
            className="btn bg-red-500 hover:bg-red-600  p-4 text-white font-semibold w-full"
            type="submit"
            value="Add Product"
          />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
