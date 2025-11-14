// app/add-product/page.tsx
"use client";
import { Coffee } from 'lucide-react';
import React, { useRef, useState, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faPenToSquare,
  faTrash,
  faCircleUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

export default function AddProductPage() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    size: "",
    tasteNote: "",
    source: "",
    roastLevel: "",
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImagePreview(String(reader.result));
    reader.readAsDataURL(file);
  }

  function handleSave() {
    // TODO: ส่งข้อมูลไป API
    console.log("Save", formData, imagePreview);
  }

  function handleCancel() {
    // รีเซ็ตแบบฟอร์ม
    setFormData({
      productName: "",
      price: "",
      size: "",
      tasteNote: "",
      source: "",
      roastLevel: "",
    });
    setImagePreview(null);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Submitted (demo)");
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-700">
      {/* Empty space for sidebar */}
      <div className="w-80"></div>
      
      {/* Main Content */}
      <div className="flex-2 p-5 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white text-3xl ">Add Product</h1>
          <h2 className="text-white text-3xl ">Product Management</h2>
        </div>
        <hr className='mb-4 border-white'/>
        <div className="bg-white rounded-3xl p-5">
          <div className="flex gap-6">
            {/* Left Column - Form */}
            <div className="flex-1 bg-gray-300 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-black p-3 rounded-lg">
                <Coffee className="w-6 h-6 text-white" />
              </div>
                <span className="text-xl font-semibold">Product Information</span>
              </div>

              {/* Product Name */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  placeholder="Enter Product"
                  className="w-full px-4 py-3 rounded-lg bg-white border-0"
                />
              </div>

              {/* Price and Size */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-semibold mb-2">Price</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Enter Price"
                    className="w-full px-4 py-3 rounded-lg bg-white border-0"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Size</label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white border-0 appearance-none"
                  >
                    <option value="">Selection Dropdown</option>
                    <option value="250g">250 g</option>
                    <option value="500 g">500 g</option>
                    <option value="1 kg">1 kg</option>
                  </select>
                </div>
              </div>

              {/* Taste Note */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">Taste Note</label>
                <textarea
                  name="tasteNote"
                  value={formData.tasteNote}
                  onChange={handleInputChange}
                  placeholder="Description Taste Note"
                  className="w-full px-4 py-3 rounded-lg bg-white border-0 h-24 resize-none"
                />
              </div>

              {/* Source */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">Source</label>
                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  placeholder="Description Source"
                  className="w-full px-4 py-3 rounded-lg bg-white border-0"
                />
              </div>

              {/* Roast Level */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">Roast Level</label>
                <input
                  type="text"
                  name="roastLevel"
                  value={formData.roastLevel}
                  onChange={handleInputChange}
                  placeholder="Description Roast Level"
                  className="w-full px-4 py-3 rounded-lg bg-white border-0"
                />
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div className="w-96 flex flex-col">
              <div className="flex-1 bg-gray-300 rounded-2xl p-6 mb-4 flex items-center justify-center min-h-[400px]">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="max-w-full max-h-full object-contain rounded-lg" />
                ) : (
                  <div className="text-gray-500 text-center">Image Preview</div>
                )}
              </div>

              <div className="flex items-center justify-between mb-6">
                <span className="font-semibold">Image</span>
                <label className="bg-white px-6 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  Upload File
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition"
                >
                  SAVE
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
