"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
function LoadingScene() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-xl font-semibold text-gray-700">Loading...</div>
    </div>
  );
}

type Size = "200g" | "500g" | "1KG";

interface Product {
  Product_ID: string;
  Product_Name: string;
  Image_URL: string;
  Price_per_kg: number;
  Taste_Note: string;
  Product_Source: string;
  Roast_Level: string;
}

export default function DetailPage() {
  const { id } = useParams();
  const [favorite, setFavorite] = useState(false);
  const [size, setSize] = useState<Size>("200g");
  const [qty, setQty] = useState(0);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);

  const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5050";

  useEffect(() => {
    const productId = Array.isArray(id) ? id[0] : id;
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API}/api/coffee/${productId}`);
        if (!res.ok) throw new Error("Failed to load product");

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <LoadingScene />;
  if (!product)
    return (
      <div className="text-center py-20 text-gray-600">
        Product not found 😢
      </div>
    );

  return (
    <main className="w-full flex items-center justify-center mt-3 pb-3">
      <div className="max-w-6xl w-full bg-[#fff2d8] rounded-xl shadow-lg p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 🔹 รูปสินค้า */}
        <div className="relative flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden h-96 lg:h-auto">
          <button
            onClick={() => setFavorite((v) => !v)}
            className="absolute top-4 left-4 text-3xl z-10 text-red-500 hover:scale-110 transition-transform"
          >
            {favorite ? "♥" : "♡"}
          </button>

          <img
            src={product.Image_URL}
            alt={product.Product_Name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 🔹 รายละเอียด */}
        <div className="flex flex-col justify-between gap-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                {product.Product_Name}
              </h1>
              <div className="text-3xl font-bold text-orange-600 mt-4">
                ฿{product.Price_per_kg}
              </div>
            </div>

            <div className="text-gray-700 space-y-3">
              <p><span className="font-semibold">Taste Note:</span> {product.Taste_Note}</p>
              <p><span className="font-semibold">Source:</span> {product.Product_Source}</p>
              <p><span className="font-semibold">Roast Level:</span> {product.Roast_Level}</p>
            </div>

            {/* Size */}
            <div>
              <h2 className="font-semibold text-lg mb-4">Size</h2>
              <div className="flex gap-3">
                {["200g", "500g", "1KG"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s as Size)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all font-medium ${
                      size === s
                        ? "bg-gray-900 text-white border-gray-900 shadow-md"
                        : "bg-white text-gray-800 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty */}
            <div className="flex items-center justify-center">
              <div className="flex items-center border-2 border-gray-300 rounded-lg bg-white">
                <button
                  onClick={() => setQty((q) => Math.max(0, q - 1))}
                  className="px-4 py-3 hover:bg-gray-100 transition-colors font-bold text-lg"
                >
                  −
                </button>
                <div className="px-6 py-3 font-semibold text-lg min-w-[60px] text-center">{qty}</div>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-4 py-3 hover:bg-gray-100 transition-colors font-bold text-lg"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Buy */}
          <button
            onClick={() => console.log(`ซื้อ ${qty} ชิ้น ขนาด ${size} ของ ${product.Product_Name}`)}
            className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg shadow-lg"
          >
            Buy Now
          </button>
        </div>
      </div>
    </main>
  );
}
