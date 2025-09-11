import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useCart from "../../Hooks/useCart";

const ProductDetails = () => {
  const { id } = useParams(); // get /:id

  const [data, setData] = useState(null); // product object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { cart, addToCart } = useCart();
  console.log(cart, addToCart);

  const fetchData = async (productId) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`https://dummyjson.com/products/${productId}`);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(
        err?.message || "Something went wrong while fetching the product."
      );
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!data) return <p className="p-6">No product found.</p>;

  const priceINR = Number(data.price).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          {/* LEFT: Product image */}
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto bg-white rounded-2xl border border-gray-200 p-4">
            <img
              className="w-full h-[360px] object-contain"
              src={data?.thumbnail || data?.images?.[0]}
              alt={data?.title}
            />
          </div>

          {/* RIGHT: Details */}
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {data.title}
            </h1>

            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                {priceINR}
              </p>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                {/* Simple rating display */}
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    ⭐
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {Number(data.rating).toFixed(1)}
                  </span>
                </div>
                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                  ({Number(data.rating).toFixed(1)})
                </p>
                <span className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white">
                  {data.stock} in stock
                </span>
              </div>
            </div>

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              {/* Use buttons so clicking doesn't navigate anywhere */}

              <button
                onClick={() => addToCart({...data, quantity: 1})} 
                type="button"
                className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
              >
                🛒 Add to cart
              </button> 
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            <p className="mb-6 text-gray-700 dark:text-gray-300">
              {data.description}
            </p>

            <p className="text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-700 dark:text-gray-200">
                Brand:
              </span>{" "}
              {data.brand} &nbsp;|&nbsp;
              <span className="font-medium text-gray-700 dark:text-gray-200">
                Category:
              </span>{" "}
              {data.category}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
