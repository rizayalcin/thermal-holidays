"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AdminHotelEditor from "../new/page"; // We can reuse the same editor component logic or component

export default function AdminHotelEditPage() {
    const params = useParams();
    const hotelId = params.id as string;

    // In a real app, we would fetch the hotel data here and pass it to the editor
    // For the demo, we just render the editor which has its own internal state

    return (
        <div className="space-y-6">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm flex items-center gap-2 mb-4">
                <span className="font-bold">Editing Resort ID:</span> {hotelId}
            </div>
            <AdminHotelEditor />
        </div>
    );
}
