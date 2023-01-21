import * as React from "react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Button from "../components/Button";
import authUser from "../services/authUser";
export interface IAppProps {}
type stateObj = {
  first_name?: string;
  last_name?: string;
  username: string;
  email: string;
  password: string;
  touched?: any;
};
export default function Register(props: IAppProps) {
  // state object for the form
  const [formData, setFormData] = useState<stateObj>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    touched: {
      first_name: false,
      last_name: false,
      username: false,
      email: false,
      password: false,
    },
  });
  // navigate hook to handle redirection
  const Navigate = useNavigate();

  // handleChange function to handle input change
  let handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setFormData({
        ...formData,
        [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
          .value,
      });
    }
  };

  function handleRedirect(): void {
    Navigate("/");
  }
  function handleBlur(e) {
    const { name } = e.target;
    setFormData({
      ...formData,
      touched: { ...formData.touched, [name]: true },
    });
  }
  
  function validateForm() {
    let errors: stateObj = {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
    };
    if (formData.touched.first_name && !formData.first_name) {
      errors["first_name"] = "please enter your first name";
    }
    if (formData.touched.last_name && !formData.last_name) {
      errors["last_name"] = "please enter your last name";
    }

    if (formData.touched.username && !formData.username) {
      errors["username"] = "please enter your username";
    }
    /*else if (formData.touched.username && formData.username.match(/\w+/)) {
      errors["username"] = "please use alphanumeric characters only";
    }*/
    if (formData.touched.email && !formData.email) {
      errors["email"] = "please enter your email";
    }
    if (formData.touched.password && !formData.password) {
      errors["password"] = "please enter your password";
    } else if (formData.touched.password && formData.password.length < 8) {
      errors["password"] = "the min length of password is 8";
      /**include some regex for password */
    }
    return errors;
  }
  const imageArr: string[] = [
    "https://images.unsplash.com/photo-1635683524916-07087440c829?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpY1mZWVkfDZ8eEh4WVRNSExnT2N8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1670911170630-c9acad2e9da7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8UzRNS0xBc0JCNzR8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1555308289-17cb1578b250?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mnw0Nzc2NjI2fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1557265018-1fd50141f01f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Nnw0Nzc2NjI2fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1556473091-50bf008940d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw0Nzc2NjI2fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  ];
  const smallImageArr: string[] = [
    "https://images.unsplash.com/photo-1588107909070-8303369e165e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNyZWF0aXZlJTIwZmFzaGlvbnxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1533619043865-1c2e2f32ff2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHN0eWxlfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y3JlYXRpdmUlMjBwaG90b2dyYXBoeXxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bGFuZHNjYXBlfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1521336575822-6da63fb45455?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsfGVufDB8MHwwfGJsYWNrfA%3D%3D&auto=format&fit=crop&w=500&q=60",
  ];
  async function handleSubmit(e: any) {
    e.preventDefault();
    // validate the form
    try {
      const { first_name, last_name, username, email, password } = formData;
      const userData = await authUser(
        { first_name, last_name, username, email, password },
        "register"
      );
      Navigate("/");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const { message } = err.response.data;
        /*setError((message as unknown ) as any);
       setLoading(false);
      */
      }
    }
  }
  const { first_name, last_name, username, email, password } = validateForm();
  return (
    <div className="min-h-screen w-full flex items-center flex-col  md:flex-row">
      <div className=" w-full md:w-2/4">
        <div
          className=" relative md:h-screen w-full object-cover max-h-screen hidden bg-cover bg-no-repeat  bg-center   md:block w-3/4"
          style={{
            backgroundImage: `url( ${
              imageArr[Math.floor(Math.random() * imageArr.length)]
            })`,
          }}
        >
          <div className="absolute top-0 left-0 bg-black/50 h-full w-full text-white text-center ">
            <div className="p-3 cursor-pointer" onClick={handleRedirect}>
              <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"
                  fill="#fff"
                  fillRule="nonzero"
                />
              </svg>
            </div>
            <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-full ">
              <h1 className="lg:text-4xl md:text-3xl font-bold mb-4 w-full">
                Unlock your inner creativity
              </h1>
              <p>
                join my unplash and access our ever growing collection of
                images.
              </p>
            </div>
          </div>
        </div>
        <div
          className="relative md:hidden block w-full h-64 bg-cover bg-no-repeat  bg-center min-h-fit"
          style={{
            backgroundImage: `url( ${
              smallImageArr[Math.floor(Math.random() * imageArr.length)]
            })`,
          }}
        >
          <div className="absolute top-0 left-0 bg-black/50 h-full w-full text-white ">
            <div className="p-6 cursor-pointer" onClick={handleRedirect}>
              <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"
                  fill="#fff"
                  fillRule="nonzero"
                />
              </svg>
            </div>
            <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-full ">
              <h1 className="sm:text-3xl text-2xl font-bold mb-4 w-full">
                Unlock your inner creativity
              </h1>
              <p>
                join my unplash and access our ever growing collection of
                images.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center flex md:w-2/4 max-w-md min-w-sm flex-col mt-2 lg:mt-0 ">
        <div>
          <h1 className="font-bold text-4xl mb-2">Join My Unsplash</h1>
          <h3 className="text-lg font-normal">
            Already have an account?{" "}
            <Link to={"/login"} className={"underline text-black/50"}>
              Login
            </Link>
          </h3>
        </div>
        <form
          className="text-left w-full max-w-md mx-auto md:mt-8 "
          onSubmit={handleSubmit}
        >
          <div className="flex  ">
            <div className="mr-4 ">
              <label htmlFor="first_name" className="block mb-2">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name={"first_name"}
                onChange={handleChange}
                onBlur={handleBlur}
                className={` p-2 w-full  rounded-md ${
                  first_name
                    ? "focus:border-red-500 border-red-600 text-red-500"
                    : "border-black/50 focus:border-black"
                } border-solid border`}
              />
              <small className="text-red-500">{first_name}</small>
            </div>
            <div>
              <label htmlFor="last_name" className="block mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name={"last_name"}
                onChange={handleChange}
                onBlur={handleBlur}
                className={` p-2 w-full  rounded-md ${
                  last_name
                    ? "focus:border-red-500 border-red-600 text-red-500"
                    : "border-black/50 focus:border-black"
                } border-solid border`}
              />
              <small className="text-red-500">{last_name}</small>
            </div>
          </div>
          <div className="my-4 w-full">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="text"
              id="email"
              name={"email"}
              onChange={handleChange}
              onBlur={handleBlur}
              className={` p-2 w-full  rounded-md ${
                email
                  ? "focus:border-red-500 border-red-600 text-red-500"
                  : "border-black/50 focus:border-black"
              } border-solid border`}
            />
            <small className="text-red-500">{email}</small>
          </div>
          <div className="my-4">
            <label htmlFor="username" className="block mb-2">
              Username{" "}
              <span className="text-black/50 font-normal">
                (Only letters, numbers and underscores)
              </span>
            </label>
            <input
              type="text"
              id="username"
              name={"username"}
              onChange={handleChange}
              onBlur={handleBlur}
              className={` p-2 w-full  rounded-md ${
                username
                  ? "focus:border-red-500 border-red-600 text-red-500"
                  : "border-black/50 focus:border-black"
              } border-solid border`}
            />
            <small className="text-red-500">{username}</small>
          </div>
          <div className="my-4">
            <label htmlFor="password" className="block mb-2">
              Password{" "}
              <span className="text-black/50 font-normal">
                (min 8 characters)
              </span>
            </label>
            <input
              type="password"
              id="password"
              name={"password"}
              onChange={handleChange}
              onBlur={handleBlur}
              className={` p-2 w-full  rounded-md ${
                password
                  ? "focus:border-red-500 border-red-600 text-red-500"
                  : "border-black/50 focus:border-black"
              } border-solid border`}
            />
            <small className="text-red-500">{password}</small>
          </div>
          <Button styles="w-full">{"Join"}</Button>
        </form>
      </div>
    </div>
  );
}
