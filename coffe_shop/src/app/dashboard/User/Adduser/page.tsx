// app/add-product/page.tsx
"use client";
import React, { useState } from 'react';
import { User, Camera } from 'lucide-react';

export default function AddUserAccount() {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: '',
    email: '',
    username: '',
    password: ''
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving user:', formData);
    alert('บันทึกข้อมูลสำเร็จ!');
  };

  const handleCancel = () => {
    setFormData({
      firstname: '',
      lastname: '',
      dateOfBirth: '',
      phoneNumber: '',
      address: '',
      email: '',
      username: '',
      password: ''
    });
    setImagePreview(null);
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-700">
      {/* Empty space for sidebar */}
      <div className="w-80"></div>
      
      {/* Main Content */}
      <div className="flex-1 p-8 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white text-3xl">Add User Account</h1>
          <h2 className="text-white text-3xl">User Account Management</h2>
        </div>
        <hr className="mb-6 border-white"/>

        <div className="bg-white rounded-3xl p-8">
          <div className="bg-gray-300 rounded-2xl p-8">
            <div className="flex items-center gap-3">
              <div className="bg-black p-3 rounded-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold text-xl">User Information</span>
            </div>

            {/* Profile Image Upload */}
            <div className="flex justify-center mb-3">
              <div className="relative">
                <div className="w-60 h-60 rounded-full bg-indigo-400 flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-20 h-20 text-white" />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-gray-600 p-2 rounded-full cursor-pointer hover:bg-gray-700 transition">
                  <Camera className="w-6 h-6 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <hr className="mb-6 border-gray-400" />

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Firstname */}
                <div>
                  <label className="block font-semibold mb-2 text-lg">Firstname</label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    placeholder="ENTER FIRSTNAME"
                    className="w-full px-4 py-3 rounded-lg bg-white border-0 placeholder-gray-400"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block font-semibold mb-2 text-lg">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    placeholder="YY/MM/DD"
                    className="w-full px-4 py-3 rounded-lg bg-white border-0"
                  />
                </div>

                {/* Phone number */}
                <div>
                  <label className="block font-semibold mb-2 text-lg">Phone number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="ENTER PHONE NUMBER"
                    className="w-full px-4 py-3 rounded-lg bg-white border-0 placeholder-gray-400"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-semibold mb-2 text-lg">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ENTER EMAIL"
                    className="w-full px-4 py-3 rounded-lg bg-white border-0 placeholder-gray-400"
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="block font-semibold mb-2 text-lg">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="ENTER USERNAME"
                    className="w-full px-4 py-3 rounded-lg bg-white border-0 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Lastname */}
                <div>
                  <label className="block font-semibold mb-2 text-lg">Lastname</label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    placeholder="ENTER LASTNAME"
                    className="w-full px-4 py-3 rounded-lg bg-white border-0 placeholder-gray-400"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block font-semibold mb-2 text-lg">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="ENTER ADDRESS"
                    className="w-full px-4 py-3 rounded-lg bg-white border-0 h-64 resize-none placeholder-gray-400"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block font-semibold mb-2 text-lg">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="ENTER PASSWORD"
                    className="w-full px-4 py-3 rounded-lg bg-white border-0 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-12 py-3 rounded-lg font-semibold transition"
              >
                SAVE
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 hover:bg-red-600 text-white px-12 py-3 rounded-lg font-semibold transition"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}