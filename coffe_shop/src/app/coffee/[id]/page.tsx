"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
// import LoadingScene from "../../components/loadingScene";

// --------------------------------------------------
// หมายเหตุ: ผมเพิ่ม LoadingScene จำลองไว้ตรงนี้
// เพื่อให้โค้ดทำงานได้โดยไม่ต้องสร้างไฟล์เพิ่มครับ
// --------------------------------------------------
function LoadingScene() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-xl font-semibold text-gray-700">Loading...</div>
    </div>
  );
}
// --------------------------------------------------

type Size = "200g" | "500g" | "1KG";

// เพิ่ม Type/Interface ของ Product เพื่อความชัดเจน
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
  const [qty, setQty] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);

  const sizes: Size[] = ["200g", "500g", "1KG"];

  const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5050";


  useEffect(() => {
    
    // id อาจจะเป็น string หรือ string[] ก็ได้
    const productId = Array.isArray(id) ? id[0] : id;
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        // fetch จาก /api/coffee/[id] ซึ่งจะไปเรียกไฟล์ที่ 2

        const res = await fetch(`${API}/api/coffee/${productId}`, {
          credentials: "include",
        });
        
        if (!res.ok) {
          throw new Error("Failed to load product");
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setProduct(null); // ถ้า fetch ไม่ได้ ก็ไม่ควรมี product
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

        {/* 🔹 รายละเอียดสินค้า */}
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

            {/* 🔹 ขนาด Size */}
            <div>
              <h2 className="font-semibold text-lg mb-4">Size</h2>
              <div className="flex gap-3">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
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

            {/* 🔹 จำนวน */}
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

          {/* 🔹 ปุ่มซื้อ */}
          <div className="mt-6">
            <button
              onClick={() =>
                // ---------------------------------
                // 🔹 แก้ไข: เปลี่ยนจาก alert เป็น console.log
                // ---------------------------------
                console.log(
                  `ซื้อ ${qty} ชิ้น ขนาด ${size} ของ ${product.Product_Name}`
                )
              }
              className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg shadow-lg"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}