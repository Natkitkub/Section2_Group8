"use client";
import React, { useState } from 'react';
import { Search, Coffee, Plus, Edit2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProductManagement() {
  const router = useRouter();
  const gotoAddProduct = () => {router.push('/dasdboard/Product/Addproduct');};
  const gotoEditProduct = (id: string) => {router.push(`/dasdboard/Product/Editproduct`);};
  const gotoDeleteProduct = () => {router.push('/dasdboard/Product/Deleteproduct');};

  const [searchForm, setSearchForm] = useState({
    productId: '',
    productName: '',
    price: ''
  });

  const [products] = useState([
    { id: 'P001', name: 'Ethiopian Blend', price: '350', image: null },
    { id: 'P002', name: 'Colombian Supreme', price: '280', image: null },
    { id: 'P003', name: 'House Special', price: '320', image: null }
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {
    console.log('Searching with:', searchForm);
  };

  return (
    
    <div className="flex min-h-screen w-full bg-gray-700">
      {/* Empty space for sidebar */}
      <div className="w-80"></div>
      
      {/* Main Content */}
      <div className="flex-1 p-8 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-3xl ">Product Management</h2>
        </div>
        <hr className="mb-6 border-white"/>

        <div className="bg-white rounded-3xl p-8 flex-1">
          {/* Search Section */}
          <div className="bg-gray-300 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-black p-3 rounded-lg">
                <Search className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold text-xl">Search</span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block font-semibold mb-2">Product ID</label>
                <input
                  type="text"
                  name="productId"
                  value={searchForm.productId}
                  onChange={handleSearchChange}
                  placeholder="product ID"
                  className="w-full px-4 py-2 rounded-lg bg-white border-0"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">ProductName</label>
                <input
                  type="text"
                  name="productName"
                  value={searchForm.productName}
                  onChange={handleSearchChange}
                  placeholder="product name"
                  className="w-full px-4 py-2 rounded-lg bg-white border-0"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Price</label>
                <input
                  type="text"
                  name="price"
                  value={searchForm.price}
                  onChange={handleSearchChange}
                  placeholder="price product"
                  className="w-full px-4 py-2 rounded-lg bg-white border-0"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleSearch}
                className="bg-black text-white px-8 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>

          {/* Product Information Section */}
          <div className="bg-gray-300 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-black p-3 rounded-lg">
                <Coffee className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold text-xl">Product Information</span>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 mb-4 pb-3 border-b-2 border-gray-400">
              <div className="col-span-1"></div>
              <div className="col-span-3 font-semibold">Product ID</div>
              <div className="col-span-4 font-semibold">Product Name</div>
              <div className="col-span-2 font-semibold">Price(Baht)</div>
              <div className="col-span-2 flex justify-end">
                <button 
                onClick = {gotoAddProduct}
                className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition">
                  <Plus className="w-4 h-4" />
                  ADD
                </button>
              </div>
            </div>

            {/* Product Rows */}
            {products.map((product, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-center py-4 border-b border-gray-400">
                <div className="col-span-1">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                </div>
                <div className="col-span-3 text-gray-600">{product.id}</div>
                <div className="col-span-4 text-gray-600">{product.name}</div>
                <div className="col-span-2 text-gray-600">{product.price}</div>
                <div className="col-span-2 flex justify-end gap-2">
                  <button 
                  onClick={() => gotoEditProduct(product.id)}
                  className="p-2 hover:bg-gray-400 rounded-lg transition">
                    <Edit2 className="w-5 h-5 text-gray-700" />
                  </button>
                  <button 
                  onClick={() => gotoDeleteProduct(product.id)}
                  className="p-2 hover:bg-gray-400 rounded-lg transition">
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}