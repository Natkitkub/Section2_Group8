"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LoadingScene from "../components/loadingScene";
import Image from "next/image";

interface Product {
  Product_ID: string;
  Product_Name: string;
  Product_Source: string;
  Roast_Level: string;
  Size: string;
  Price_per_kg: number;
  Image_URL: string;
}

export default function SearchPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5050";

  // ดึงข้อมูลสินค้า
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API}/api/coffee`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to load products");
  
        const data: Product[] = await res.json();
  
        // เรียงตามชื่อสินค้า A → Z
        data.sort((a, b) => a.Product_Name.localeCompare(b.Product_Name));
  
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  

  // ถ้า loading ให้โชว์หน้าโหลด
  if (loading) {
    return <LoadingScene />;
  }

  // ไปหน้า detail
  const purchasePage = (id: string) => {
    router.push(`/coffee/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#fff2d8] py-8 px-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        ☕ Our Coffee Collection
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products found 😢</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {products.map((item) => (
            <article
              key={item.Product_ID}
              onClick={() => purchasePage(item.Product_ID)}
              className="w-full max-w-sm bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex flex-col">
                <Image
                  src={item.Image_URL}
                  alt={item.Product_Name}
                  width={350}
                  height={220}
                  className="rounded-t-lg object-cover w-full h-[220px]"
                  unoptimized
                />

                <div className="px-4 py-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {item.Product_Name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.Size} • From: {item.Product_Source} <br />
                    {item.Roast_Level} Roast
                  </p>
                  <div className="mt-3 text-right">
                    <p className="text-lg font-bold text-orange-600">
                      ฿{item.Price_per_kg}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
