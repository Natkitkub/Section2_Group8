'use client';
import { useEffect, useRef } from "react";
import { loadGoogleMaps } from "../utils/loadGoogleMaps";

export default function GoogleMap() {
    const mapRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      loadGoogleMaps().then(() => {
        if (!mapRef.current) return;
        new (window as any).google.maps.Map(mapRef.current, {
          center: { lat: 13.736717, lng: 100.523186 },
          zoom: 15,
        });
      });
    }, []);
  
    return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
  }