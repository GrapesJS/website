"use client"
import { initCarbon } from "@/lib/carbon";
import { useEffect } from "react"

export default function CarbonAd() {
    useEffect(() => {
        initCarbon();
    }, []);

    return <div id="native-carbon"></div>;
}