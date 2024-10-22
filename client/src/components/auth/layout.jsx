import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-gray-900">
      {/* Left side with image and heading */}
      <div className="hidden lg:flex items-center justify-center bg-gray-800 w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-gray-100">
          <img
            className="rounded-full"
            src="https://cdn.brandfetch.io/rguktsklm.ac.in/fallback/transparent/theme/dark/h/512/w/512/icon?t=1721564544898"
            alt="Logo"
          />
          <h1 className="text-4xl font-extrabold tracking-tight">
            Book Your Ticket
          </h1>
        </div>
      </div>

      {/* Right side with the Outlet (login/register forms) */}
      <div className="flex flex-1 items-center justify-center bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
