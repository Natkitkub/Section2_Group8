"use client";
import { useState , useEffect } from "react";
import LoadingScene from "../components/loadingScene";


type Size = "200g" | "500g" | "1KG";

export default function DetailPage() {
  const [favorite, setFavorite] = useState(false);
  const [size, setSize] = useState<Size>("200g");
  const [qty, setQty] = useState<number>(0);

  const price = "XXX";
  const sizes: Size[] = ["200g", "500g", "1KG"];
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      // จำลองการโหลด 1.5 วินาที (สามารถปรับได้)
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }, []);
  
    if (loading) {
      return <LoadingScene />;
    }
  return (
    <main className=" w-full flex items-center justify-center mt-3">
      <div className="max-w-6xl w-full bg-[#fff2d8] rounded-xl shadow-lg p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* รูปสินค้า (ฝั่งซ้าย) */}
        <div className="relative flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden h-96 lg:h-auto">
          <button
            onClick={() => setFavorite((v) => !v)}
            className="absolute top-4 left-4 text-3xl z-10 text-red-500 hover:scale-110 transition-transform"
          >
            {favorite ? "♥" : "♡"}
          </button>

          <img
            src="/placeholder.png"
            alt="product"
            className="w-full h-full object-cover"
          />
        </div>

        {/* รายละเอียดสินค้า (ฝั่งขวา) */}
        <div className="flex flex-col justify-between gap-6">
          {/* 🔸 ส่วนบนทั้งหมด */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Product Name</h1>
              <div className="text-3xl font-bold text-orange-600 mt-4">฿{price}</div>
            </div>

            <div className="text-gray-700 space-y-3">
              <p><span className="font-semibold">Taste Note:</span> Rich chocolate and citrus notes</p>
              <p><span className="font-semibold">Source:</span> Ethiopia, Sidamo</p>
              <p><span className="font-semibold">Roast Level:</span> Medium</p>
            </div>

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

            {/* 🔸 ปุ่มเพิ่ม/ลดจำนวน */}
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

          {/* 🔹 ปุ่มซื้อสินค้า (อยู่ล่างสุด) */}
          <div className="mt-6">
            <button
              onClick={() => alert(`ซื้อ ${qty} ชิ้น ขนาด ${size}`)}
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
