import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ---- Small helpers ----
const formatCurrency = (value, currency = "INR", locale = "en-IN") => { 
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num)) return ""; // empty 
  try {
    return num.toLocaleString(locale, { style: "currency", currency });
  } catch {
    return `${num.toFixed(2)} ${currency}`; // fallback if Intl/currency issues
  }
};
 
// ---- Card ---- 
const ProductCard = ({ id, image, title, brand, price, category, rating }) => {
  return (
    <div className="group flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* Image */}
      <div className="relative bg-gray-50">
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
        {category && (
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-gray-900/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
            {category}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-gray-900">{title}</h3>
        {brand && <p className="text-sm text-gray-500">{brand}</p>}

        {typeof rating === "number" && (
          <div className="text-sm text-gray-600">Rating: {rating.toFixed(1)}</div>
        )}

        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="text-xl font-bold text-emerald-600">
            {formatCurrency(price)}
          </p>

          <Link
            to={`/products/${id}`}
            className="rounded-xl px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

// ---- Skeletons ----
const CardSkeleton = () => (
  <div className="animate-pulse rounded-2xl border border-gray-200 bg-white overflow-hidden">
    <div className="aspect-[4/3] w-full bg-gray-100" />
    <div className="space-y-3 p-4">
      <div className="h-4 w-3/4 bg-gray-100 rounded" />
      <div className="h-3 w-1/2 bg-gray-100 rounded" />
      <div className="h-3 w-1/3 bg-gray-100 rounded" />
      <div className="h-9 w-full bg-gray-100 rounded-xl" />
    </div>
  </div>
);

// ---- Layout ----
const Productlayout = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const json = await res.json();
      setData(json?.products ?? []);
    } catch (err) {
      setError(err?.message || "Something went wrong while fetching products.");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Products</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchData}
            className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            type="button"
          >
            Refresh
          </button>
        </div>
      </header>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : data.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
          <p className="text-gray-600">No products found. Try refreshing.</p>
        </div>
      ) : (
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data.map((item) => (
            <ProductCard
              id={item.id}
              key={item.id}
              image={item.thumbnail}
              title={item.title}
              brand={item.brand}
              price={item.price}
              category={item.category}
              rating={item.rating}
            />
          ))}
        </section>
      )}
    </main>
  );
};

export default Productlayout;




