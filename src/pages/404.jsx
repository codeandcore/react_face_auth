import React from "react";
import { Link } from "react-router-dom";

export const Error404 = () => {
  return (
    <div className="mx-auto w-full max-w-7xl px-2 md:px-4">
      <div className="mx-auto my-12 flex max-w-6xl flex-col px-2 md:my-24 lg:my-32 lg:flex-row lg:items-center">
        <div>
          <div>
            <p className="text-sm font-semibold text-black">404 error</p>
            <h1 className="mt-3 text-2xl font-semibold text-red-600  md:text-3xl">
              We can&#x27;t find that page
            </h1>
            <p className="mt-4 text-gray-500">
              Sorry, the page you are looking for doesn&#x27;t exist or has been
              moved.
            </p>
            <div className="mt-6 flex items-center gap-x-3">
              <Link
                type="button"
                to="/"
                className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Go back
              </Link>
              <Link
                type="button"
                to="/user-select"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                User List
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden lg:block pl-5">
          <img
            src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8NDA0fGVufDB8fDB8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
            alt="404"
            className="h-full w-full rounded-md object-cover"
          />
        </div>
      </div>
    </div>
  );
};
