import { Form, Link, useActionData } from "react-router-dom";

//components
import { FormInput } from "../components";

import { useLogin } from "../hooks/useLogin";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { useGoogle } from "../hooks/useGoogle";

function themeFromLocalStorage() {
  return localStorage.getItem("theme") || "winter";
}

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");

  return { email, password };
};

function Login() {
  const [errorStatus, setErrorStatus] = useState({
    email: "",
    password: "",
  });

  const userData = useActionData();
  const { signInWithEmail, isPending } = useLogin();

  const [theme, setTheme] = useState(themeFromLocalStorage());
  const handleTheme = () => {
    const newTheme = theme == "winter" ? "dracula" : "winter";
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (userData) {
      if (userData.email && userData.password) {
        signInWithEmail(userData.email, userData.password);
      } else {
        toast.error("Please, enter all of them!");
      }

      if (userData.email == "") {
        setErrorStatus((prev) => {
          return { ...prev, email: "input-error" };
        });
      } else {
        setErrorStatus((prev) => {
          return { ...prev, email: "" };
        });
      }

      if (userData.password == "") {
        setErrorStatus((prev) => {
          return { ...prev, password: "input-error" };
        });
      } else {
        setErrorStatus((prev) => {
          return { ...prev, password: "" };
        });
      }
    }
  }, [userData]);

  let { handleGoogle } = useGoogle();
  return (
    <>
      <video
        autoPlay
        loop
        muted
        className=" bg-cover h-screen absolute -z-10 opacity-70 object-cover w-full "
        src="/bg-registor.mp4"
      ></video>
      <div className="grid">
        <div className="grid place-items-center min-h-screen">
          <Form
            method="post"
            className="flex flex-col items-center gap-4 card bg-base-100 w-96 shadow-xl p-5"
          >
            <h1 className="text-4xl font-semibold">Login</h1>
            <FormInput
              type="email"
              name="email"
              labelText="email"
              status={errorStatus.email}
              plecholder="example@gmail.com"
            />
            <FormInput
              type="password"
              name="password"
              labelText="password"
              status={errorStatus.password}
              plecholder="••••••••"
            />

            <div className="w-full">
              {!isPending && (
                <button className="btn btn-primary btn-block">Submit</button>
              )}
              {isPending && (
                <button disabled className="btn btn-primary btn-block">
                  Loading...
                </button>
              )}
              <button
                onClick={() => {
                  handleGoogle();
                }}
                className="btn btn-primary btn-block mt-2"
              >
                {" "}
                Google
              </button>
            </div>
            <div className="text-center">
              Don't have an account?{" "}
              <Link className="link link-primary" to="/register">
                Register
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
