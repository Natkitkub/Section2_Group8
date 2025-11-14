"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingScene from "../components/loadingScene";

export default function SearchPage() {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5050";

  // form state
  const [productName, setProductName] = useState("");
  const [roast, setRoast] = useState("all");
  const [source, setSource] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);

  // results
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  function toggleSize(size: string) {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }

  // =========================================================
  // 🔥 ดึงข้อมูลจาก Database จริง
  // =========================================================
  async function handleSearch() {
    setLoading(true);
    setShowResults(true);

    try {
      const params = new URLSearchParams();

      if (productName) params.append("name", productName);
      if (source) params.append("source", source);
      if (roast !== "all") params.append("roast", roast);
      if (sizes.length > 0) params.append("size", sizes.join(","));

      const res = await fetch(`${API}/product/search?${params.toString()}`);
      const data = await res.json();

      // แปลงรูปแบบให้เหมือน demo
      const mapped = data.map((p: any) => ({
        id: p.Product_ID,
        title: p.Product_Name,
        price: `฿${p.Price_per_kg}`,
        img: p.Image_URL,
      }));

      setResults(mapped);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* FORM */}
      <div className="flex flex-col w-[90%] max-w-[1000px] h-auto mx-auto bg-white justify-center items-center mt-10 mb-10 rounded-lg p-6">
        <div className="w-full">
          <h1 className="font-bold text-5xl text-center">Search Coffee</h1>

          <label className="mt-10 mb-2 text-xl block">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Ex. Moonstones"
            className="p-4 bg-white border border-gray-200 rounded-lg w-full max-w-[1000px]"
          />

          <label className="mt-4 mb-2 text-xl block">Roaster Level</label>
          <select
            id="roast"
            name="roast"
            value={roast}
            onChange={(e) => setRoast(e.target.value)}
            className="p-4 bg-white border border-gray-200 rounded-lg w-full max-w-[1000px]"
          >
            <option value="all">All Roast</option>
            <option value="D">Dark Roast</option>
            <option value="M">Medium Roast</option>
            <option value="L">Light Roast</option>
          </select>

          <label className="mt-4 mb-2 text-xl block">Source</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Ex. Japan, Brazil, Ethiopia"
            className="p-4 bg-white border border-gray-200 rounded-lg w-full max-w-[1000px]"
          />

          <div className="flex flex-col md:flex-row justify-between mt-4 items-start md:items-center gap-4">
            <h2 className="text-xl">Size</h2>
            <div className="flex gap-6 mt-2">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={sizes.includes("250 g")}
                  onChange={() => toggleSize("250 g")}
                />
                <span>250 g</span>
              </label>

              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={sizes.includes("500 g")}
                  onChange={() => toggleSize("500 g")}
                />
                <span>500 g</span>
              </label>

              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={sizes.includes("1 kg")}
                  onChange={() => toggleSize("1 kg")}
                />
                <span>1 kg</span>
              </label>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSearch}
              className="flex text-center bg-black text-white p-4 rounded-lg w-full max-w-[600px] mt-7 justify-center"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center mt-10">
          <LoadingScene />
        </div>
      )}

      {/* RESULTS */}
      {showResults && results.length > 0 && !loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-20 mb-20 justify-items-center px-6 max-w-[1200px] mx-auto">
          {results.map((r) => (
            <div
              key={r.id}
              className="w-full max-w-[320px] bg-white rounded-lg shadow cursor-pointer"
              onClick={() => router.push(`/detail/${r.id}`)}
            >
              <div className="m-5">
                <Image
                  src={r.img}
                  alt={r.title}
                  width={300}
                  height={200}
                  className="rounded-md object-cover"
                />
              </div>

              <div className="flex justify-between items-center px-5 pb-5">
                <p className="text-lg font-medium">{r.title}</p>
                <p className="text-sm font-semibold">{r.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* NO RESULTS */}
      {showResults && results.length === 0 && !loading && (
        <p className="text-center text-gray-500 text-xl mb-10">No results found.</p>
      )}
    </div>
  );
}
