'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function forgotpassword(){
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const router =useRouter();
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!email) {
        setMessage("Please fill your Email ");
        return;
      }
      if (!username) {
        setMessage("Please fill your Username");
        return;
      }
      
  
      const formData = new FormData();
      formData.append("Email", email);
      formData.append("Username", username);
  
      const res = await fetch("/api/forgetpwd", {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
      if (data.message === "Username not found") {
        setMessage(data.message);
      } else {
        // 🔹 redirect ไปหน้า login
        router.push("/login");
      }
    };
    return(
    <div>
        <div className="flex flex-col m-50  h-100  justify-center bg-white rounded-lg">
            <form onSubmit={handleSubmit} className="m-4">
                <h1 className="flex justify-center text-3xl font-bold mt-10">Recover your account</h1>
                <p className="flex justify-center mt-2 mb-5 text-gray-600">Please enter your Email and Username. We will send the correct password to you via Email.</p>
                <h1 className="text-2xl">Email</h1>
                <input type="Email"  className="p-3 rounded-lg bg-gray-200 mt-4 border-0 w-full " placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
                />
                {message && <p className="mt-5 text-lg text-red-500">{message}</p>}
                <h1 className="text-2xl mt-5">Username</h1>
                <input type="text" className="p-3 rounded-lg bg-gray-200 mt-4 border-0 w-full" placeholder="Enter your Username" 
                onChange={(e) => setUsername(e.target.value)}
                />
                {message && <p className="mt-5 text-lg text-red-500">{message}</p>}
                <div className="flex justify-center w-full">
                    <button className=" mt-5 rounded-lg bg-black text-white items-center w-[150px] text-center p-3 mb-10">submit</button>
                </div>
                
            </form>
        </div>
    </div>
)}
    