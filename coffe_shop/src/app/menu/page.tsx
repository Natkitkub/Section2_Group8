"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LoadingScene from "../components/loadingScene";
import affogato from "../../../public/images/coffeemenu/affogato.png"
import americano from "../../../public/images/coffeemenu/americano.png"
import chocolate from "../../../public/images/coffeemenu/chocolate.png"
import crmmlk from "../../../public/images/coffeemenu/crmmlk.png"
import dirtydoff from "../../../public/images/coffeemenu/dirtydoff.png"
import espresso from "../../../public/images/coffeemenu/espresso.png"
import icapucino from "../../../public/images/coffeemenu/icapucino.png"
import ilatte from "../../../public/images/coffeemenu/ilatte.png"
import imocha from "../../../public/images/coffeemenu/imocha.png"
import iorangeamericano from "../../../public/images/coffeemenu/iorangeamericano.png"
import mtchlatte from "../../../public/images/coffeemenu/mtchlatte.png"
import pnkmlk from "../../../public/images/coffeemenu/pnkmlk.png"

import Image from "next/image";

export default function SearchPage(){
    const router = useRouter();
    // รอเช็ค session
    const [session, setSession] = useState(false);

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
   
    return(
        <div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-100 h-80 flex justify-center items-center">
                <h1 className="text-9xl text-amber-900 m-10 font-bold">Menu</h1>
            </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 m-15 justify-items-center">
            <div className="w-100 h-110 bg-white rounded-lg mb-20">
                <div className="flex flex-col">
                    <Image
                        src={affogato}
                        alt="affogato"
                        width={350}
                        className="rounded-lg m-6"
                    />
                    <div className="flex justify-between ">
                        <p className="-mt-2 ml-5 text-xl">Affogato</p>
                    </div>
                </div>
            </div>
             
            <div className="w-100 h-110 bg-white rounded-lg mb-20">
                <div className="flex flex-col">
                <Image
                        src={americano}
                        alt="americano"
                        width={350}
                        className="rounded-lg m-6"
                    />  
                    <div className="flex justify-between">
                        <p className="-mt-2 ml-5 text-xl">Americano</p>
                    </div>
                </div>
            </div>

            <div className="w-100 h-110 bg-white rounded-lg mb-20">
                <div className="flex flex-col">
                    <Image
                        src={chocolate}
                        alt="chocolate"
                        width={350}
                        className="rounded-lg m-6"
                    />
                    <div className="flex justify-between">
                        <p className="-mt-2 ml-5 text-xl">Chocolate</p>
                    </div>
                </div>
            </div>

            <div className="w-100 h-110 bg-white rounded-lg mb-20">
                <div className="flex flex-col">
                    <Image
                        src={crmmlk}
                        alt="crmmlk"
                        width={350}
                        className="rounded-lg m-6"
                    />
                    <div className="flex justify-between">
                        <p className="-mt-2 ml-5 text-xl">Caramel Milk</p>
                    </div>
                </div>
            </div>

            <div className="w-100 h-110 bg-white rounded-lg mb-20">
                <div className="flex flex-col">
                    <Image
                        src={dirtydoff}
                        alt="dirtydoff"
                        width={350}
                        className="rounded-lg m-6"
                    />
                    <div className="flex justify-between">
                        <p className="-mt-2 ml-5 text-xl">Dirty</p>
                    </div>
                </div>
            </div>

            <div className="w-100 h-110 bg-white rounded-lg mb-20">
                <div className="flex flex-col">
                    <Image
                        src={espresso}
                        alt="espresso"
                        width={350}
                        className="rounded-lg m-6"
                    />
                    <div className="flex justify-between">
                        <p className="-mt-2 ml-5 text-xl">Espresso</p>
                    </div>
                </div>
            </div>

            <div className="w-100 h-110 bg-white rounded-lg mb-20">
                <div className="flex flex-col">
                    <Image
                        src={icapucino}
                        alt="icapucino"
                        width={350}
                        className="rounded-lg m-6"
                    />
                    <div className="flex justify-between">
                        <p className="-mt-2 ml-5 text-xl">Cappuccino</p>
                    </div>
                </div>
            </div>

            <div className="w-100 h-110 bg-white rounded-lg mb-20">
                <div className="flex flex-col">
                <Image
                        src={ilatte}
                        alt="ilatte"
                        width={350}
                        className="rounded-lg m-6"
                    />  
                    <div className="flex justify-between">
                        <p className="-mt-2 ml-5 text-xl">Latte</p>
                    </div>
                </div>
            </div>
            <div className="w-100 h-110 bg-white rounded-lg mb-20">
                <div className="flex flex-col">
                <Image
                        src={imocha}
                        alt="imocha"
                        width={350}
                        className="rounded-lg m-6"
                    />  
                    <div className="flex justify-between">
                        <p className="-mt-2 ml-5 text-xl">Mocha</p>
                    </div>
                </div>
            </div>

            <div className="w-100 h-110 bg-white rounded-lg mb-20">
                <div className="flex flex-col">
                <Image
                        src={iorangeamericano}
                        alt="iorangeamericano"
                        width={350}
                        className="rounded-lg m-6"
                    />  
                    <div className="flex justify-between">
                        <p className="-mt-2 ml-5 text-xl">Orange Americano</p>
                    </div>
                </div>
            </div>

            <div className="w-100 h-110 bg-white rounded-lg mb-20">
                <div className="flex flex-col">
                <Image
                        src={mtchlatte}
                        alt="mtchlatte"
                        width={350}
                        className="rounded-lg m-6"
                    />  
                    <div className="flex justify-between">
                        <p className="-mt-2 ml-5 text-xl">Macha Latte</p>
                    </div>
                </div>
            </div>

            <div className="w-100 h-110 bg-white rounded-lg mb-20">
                <div className="flex flex-col">
                <Image
                        src={pnkmlk}
                        alt="pnkmlk"
                        width={350}
                        className="rounded-lg m-6"
                    />  
                    <div className="flex justify-between">
                        <p className="-mt-2 ml-5 text-xl">Pink Milk</p>
                    </div>
                </div>
            </div>
        
        </div>
        </div>
        
)}