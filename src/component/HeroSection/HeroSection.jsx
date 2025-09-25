import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto grid max-w-screen-xl px-4 pb-8 md:grid-cols-12 lg:gap-12 lg:pb-16 xl:gap-0">
          <div className="content-center justify-self-start md:col-span-7 md:text-start">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight dark:text-white md:max-w-2xl md:text-5xl xl:text-6xl">
              Limited Time Offer!
              <br />
              Up to 50% OFF!
            </h1>
            <p className="mb-4 max-w-2xl text-gray-500 dark:text-gray-400 md:mb-12 md:text-lg lg:mb-5 lg:text-xl">
              Don't Wait - Limited Stock at Unbeatable Prices!
            </p>
            <Link
              to="/product"
              className="inline-block rounded-lg bg-primary-700 px-6 py-3.5 text-center font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Shop Now
            </Link>
          </div>
          <div class="col-span-12 mt-6 flex justify-center md:col-span-5 md:mt-0 md:justify-end">
            {/* Light Mode Image */}
            <img
              class="block dark:hidden w-2/3 sm:w-1/2 md:w-full max-w-sm object-contain"
              alt="shopping illustration"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list.svg"
            />

            {/* Dark Mode Image  */}
            <img
              class="hidden dark:block w-2/3 sm:w-1/2 md:w-full max-w-sm object-contain"
              alt="shopping illustration"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list-dark.svg"
            />
          </div>
        </div> 

        {/* REPLACED: bottom logos -> category links */}
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6 lg:gap-8 items-center text-gray-700 dark:text-gray-300">
            <a
              href="/products?category=grocery"
              className="flex h-16 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-4 text-center text-sm font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <span className="text-lg font-semibold">Watches</span>
            </a>

            <a
              href="/products?category=fashion"
              className="flex h-16 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-4 text-center text-sm font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <span className="text-lg font-semibold">Fashion</span>
            </a>

            <a
              href="/products?category=furniture"
              className="flex h-16 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-4 text-center text-sm font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <span className="text-lg font-semibold">Cars</span> 
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
