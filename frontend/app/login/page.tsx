"use client";
import Link from "next/link";
import { API_URL } from "@/config/global";
import axios from "axios";

// Login Feature

const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault(); // Prevent the default form submission behavior
  console.log("Attempting login...");
  const username = (event.target as HTMLFormElement).username.value;
  const password = (event.target as HTMLFormElement).password.value;

  const isValidUsername = username.length > 0;
  const isValidPassword = password.length > 0;

  if (isValidUsername && isValidPassword) {
    const response = await axios.post(`${API_URL}/user/signin`, {
      username,
      password
    });

    if (response.data.message == "User doesnt exist"){
      alert("User does not exist. Please sign up first.");
      window.location.href = "/signup";
    }
    else if (response.data.message == "Signed in") {
      alert("Login successful!");
      // Store the user ID in localStorage
      localStorage.setItem("token", response.data.jwtToken);
      window.location.href = "/dashboard";
    }
  }
  else {
    if (!isValidUsername) {
      alert("Please enter a valid username.");
    }
    else if (!isValidPassword) {
      alert("Please enter a valid password.");
    }
  }
}


export default function Home() {
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-sm ml-[40rem] mt-[10rem]">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign in to your dashboard</h2>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="username"
              className="input validator mb-2"
              required
              placeholder="Username"
              title="Enter your username"
            />
            <p className="validator-hint mb-4">Enter your username to sign in</p>

            <label className="input validator flex items-center mb-2">
              <svg className="h-[1em] opacity-50 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                  ></path>
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
              </svg>
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                className="flex-1"
              />
            </label>
            <p className="validator-hint hidden mb-4">
              Must be more than 8 characters, including
              <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
            </p>
            <button className="btn btn-primary w-full mt-2" type="submit">Sign In</button>
          </form>
          <p className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Click here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
