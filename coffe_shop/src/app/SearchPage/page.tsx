"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LoadingScene from "../components/loadingScene";
export default function SearchPage(){
    const router = useRouter();
    // loading/session ถ้าไม่ใช้ให้ลบออกต่อไป
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState(false);

    // form state
    const [productName, setProductName] = useState("");
    const [roast, setRoast] = useState("all");
    const [source, setSource] = useState("");
    const [sizes, setSizes] = useState<string[]>([]);

    // results state
    const [results, setResults] = useState<Array<{id:number,title:string,price:string,img:string}>>([]);
    const [showResults, setShowResults] = useState(false);

    function toggleSize(size: string) {
      setSizes(prev => prev.includes(size) ? prev.filter(s=>s!==size) : [...prev, size]);
    }

    // ตัวอย่าง: สร้างผลลัพธ์จำลองเมื่อกด Search
    function handleSearch() {
      // ในโปรเจกต์จริง ให้เรียก API หรือกรองจาก dataset
      const demo = Array.from({length:6}).map((_,i)=>({
        id: i+1,
        title: productName || `Coffee ${i+1}`,
        price: `B${(i+1)*50}`,
        img: "/images/coffeeOriginal.jpg"
      }));
      setResults(demo);
      setShowResults(true);
    }

    return(
        <div>
          <div className="flex flex-col w-[90%] max-w-[1000px] h-auto mx-auto bg-white justify-center items-center mt-10 mb-10 rounded-lg p-6">
            <div className="w-full">
               <h1 className="font-bold text-5xl text-center">Search Coffee</h1>

               <label className="mt-10 mb-2 text-xl block">Product Name</label>
               <input
                 type="text"
                 value={productName}
                 onChange={(e)=>setProductName(e.target.value)}
                 placeholder="Ex. Moonstones"
                 className="p-4 bg-white border border-gray-200 rounded-lg w-full max-w-[1000px]"
               />

               <label className="mt-4 mb-2 text-xl block">Roaster Level</label>
               <select id="roast" name="roast" value={roast}
                 onChange={(e)=>setRoast(e.target.value)}
                 className="p-4 bg-white border border-gray-200 rounded-lg w-full max-w-[1000px]">
                    <option value="all" className="text-gray-400">All Roast</option>
                    <option value="droast">Dark Roast</option>
                    <option value="mroast">Medium Roast</option>
                    <option value="lroast">Light Roast</option>
               </select>

               <label className="mt-4 mb-2 text-xl block">Source</label>
               <input
                 type="text"
                 value={source}
                 onChange={(e)=>setSource(e.target.value)}
                 placeholder="Ex. Japan, Brazil, Ethiopia"
                 className="p-4 bg-white border border-gray-200 rounded-lg w-full max-w-[1000px]"
               />

               <div className="flex flex-col md:flex-row justify-between mt-4 items-start md:items-center gap-4">
                    <h2 className="text-xl">Size</h2>
                    <div className="flex gap-6 mt-2">
                      <label className="inline-flex items-center gap-2">
                        <input type="checkbox" checked={sizes.includes("250g")} onChange={()=>toggleSize("250g")} />
                        <span>250 g</span>
                      </label>
                      <label className="inline-flex items-center gap-2">
                        <input type="checkbox" checked={sizes.includes("500g")} onChange={()=>toggleSize("500g")} />
                        <span>500 g</span>
                      </label>
                      <label className="inline-flex items-center gap-2">
                        <input type="checkbox" checked={sizes.includes("1 kg")} onChange={()=>toggleSize("1 kg")} />
                        <span>1 kg</span>
                      </label>
                    </div>
               </div>
                <div className="flex justify-center">
               <button
                 onClick={handleSearch}
                 className="flex text-center bg-black text-white p-4 rounded-lg w-full max-w-[600px] mt-7 justify-center">
                 Search
               </button>
               </div>
            </div>
          </div>

          {/* แสดงผลเมื่อกด Search */}
          {showResults && results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-20 mb-20 justify-items-center px-6 max-w-[1200px] mx-auto">
              {results.map(r => (
                <div key={r.id} className="w-full max-w-[320px] bg-white rounded-lg shadow">
                  <div className="flex flex-col">
                    <div className="m-5">
                      <Image src={r.img} alt={r.title} width={300} height={200} className="rounded-md object-cover" />
                    </div>
                    <div className="flex justify-between items-center px-5 pb-5">
                      <p className="text-lg font-medium">{r.title}</p>
                      <p className="text-sm font-semibold">{r.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
    )
}