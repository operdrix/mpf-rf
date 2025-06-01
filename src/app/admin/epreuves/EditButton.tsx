"use client";
import { useState } from "react";
import EditEpreuveForm from "./EditEpreuveForm";
import type { Epreuve } from "./types";

export default function EditButton({ epreuve }: { epreuve: Epreuve }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="btn btn-warning btn-xs mr-2" onClick={() => setOpen(true)}>Modifier</button>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded shadow-lg">
            <EditEpreuveForm epreuve={epreuve} onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
} 