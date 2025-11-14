'use client'
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function Login() {
  const [remember, setRemember] = useState(false);
  const [show, setShow] = useState(false);
  const [Username, setUsername] = useState("");
  const [Password, setEmpPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5050";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Username || !Password) {
      setMessage("Please fill username and password");
      return;
    }

    try {
      const res = await fetch(`${API}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username, Password }),
        credentials: "include",
      });

      const text = await res.text();
      console.log("🔥 Raw Response:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        setMessage("Server returned invalid JSON");
        return;
      }

      console.log("Login Response:", data);

      if (["Nattakit", "Babu", "Ton", "Toy"].includes(data.found)) {
        router.push("/dasdboard/Product");
      } else if (data.found) {
        router.push("/");
      } else {
        setMessage("Username or password incorrect");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Server error, please try again later");
    }
  };

  return (
    <div className="flex flex-col w-[800px] h-[600px] mx-auto bg-[#fff2d8] justify-center items-center mt-8 rounded-lg p-6 mb-8">
      <h2 className="text-4xl mb-13 font-semibold">WELCOME TO DUDE TEE NHEE COFFEE</h2>
      <h2 className="text-3xl mb-5">Sign in an account</h2>

      <form onSubmit={handleSubmit} className="w-full mt-8">
        <input
          type="text"
          placeholder="Username"
          className="p-4 bg-white w-full rounded-lg"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="relative w-full mt-7">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            className="p-4 bg-white w-full rounded-lg pr-10"
            value={Password}
            onChange={(e) => setEmpPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
          >
            <FontAwesomeIcon icon={show ? faEye : faEyeSlash} />
          </button>
        </div>

        <div className="flex justify-between gap-30 mt-10">
          <p>
            <input
              type="checkbox"
              className="mr-2"
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me
          </p>
          <p
            onClick={() => router.push("/forgot-pwd")}
            className="text-blue-700 cursor-pointer hover:underline"
          >
            Forgot Password?
          </p>
        </div>

        {message && <p className="mt-5 text-lg text-red-500">{message}</p>}

        <div className="flex justify-center mt-7">
          <button className="bg-black text-white p-3 w-40 rounded-lg hover:bg-gray-800">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
