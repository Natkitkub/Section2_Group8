"use client";
import React, { useState } from 'react';
import { Search, User, Plus, Edit2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProductManagement() {
  const router = useRouter();
  const gotoAdduser = () => {router.push('/dasdboard/User/Adduser');};
  const gotoEdituser = () => {router.push(`/dasdboard/User/Edituser`);};
  const gotoDeleteuser = () => {router.push('/dasdboard/User/Deleteuser');};

  const [searchForm, setSearchForm] = useState({
    userId: '',
    userName: '',
    email: ''
  });

  const [products] = useState([
    { id: 'U001', name: 'john_doe', Email: 'john@gmail.com', Firstname: 'John', Lastname: 'Doe' },
    { id: 'U002', name: 'jane_smith', Email: 'jane@gmail.com', Firstname: 'Jane', Lastname: 'Smith'},
    { id: 'U003', name: 'mike_wilson', Email: 'mike@gmail.com', Firstname: 'Mike', Lastname: 'Wilson'}
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
          <h2 className="text-white text-3xl ">User Account Management</h2>
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
                <label className="block font-semibold mb-2">User ID</label>
                <input
                  type="text"
                  name="userId"
                  value={searchForm.userId}
                  onChange={handleSearchChange}
                  placeholder="User ID"
                  className="w-full px-4 py-2 rounded-lg bg-white border-0"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">UserName</label>
                <input
                  type="text"
                  name="userName"
                  value={searchForm.userName}
                  onChange={handleSearchChange}
                  placeholder="Username"
                  className="w-full px-4 py-2 rounded-lg bg-white border-0"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Email</label>
                <input
                  type="text"
                  name="email"
                  value={searchForm.email}
                  onChange={handleSearchChange}
                  placeholder="Email"
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
                <User className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold text-xl">User Information</span>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 mb-4 pb-3 border-b-2 border-gray-400">
              <div className="col-span-2 font-semibold">User ID</div>
              <div className="col-span-2 font-semibold">UserName</div>
              <div className="col-span-3 font-semibold">Email</div>
              <div className="col-span-2 font-semibold">FirstName</div>
              <div className="col-span-1 font-semibold">LastName</div>
              <div className="col-span-2 flex justify-end">
                <button 
                onClick = {gotoAdduser}
                className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition">
                  <Plus className="w-4 h-4" />
                  ADD
                </button>
              </div>
            </div>

            {/* User Rows */}
            {products.map((product, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-center py-4 border-b border-gray-400">
                <div className="col-span-2 text-gray-600">{product.id}</div>
                <div className="col-span-2 text-gray-600">{product.name}</div>
                <div className="col-span-3 text-gray-600">{product.Email}</div>
                <div className="col-span-2 text-gray-600">{product.Firstname}</div>
                <div className="col-span-1 text-gray-600">{product.Lastname}</div>
                <div className="col-span-2 flex justify-end gap-2">
                  <button 
                  onClick={gotoEdituser}
                  className="p-2 hover:bg-gray-400 rounded-lg transition">
                    <Edit2 className="w-5 h-5 text-gray-700" />
                  </button>
                  <button 
                  onClick={gotoDeleteuser}
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