"use client";
import { useState } from "react";
import EditPerformanceForm from "./EditPerformanceForm";
import type { Performance } from "./types";
import type { Competiteur } from "../../competiteurs/types";
import type { Epreuve } from "../../epreuves/types";

export default function EditButton({ performance, competiteurs, epreuves }: { performance: Performance, competiteurs: Competiteur[], epreuves: Epreuve[] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="btn btn-warning btn-xs mr-2" onClick={() => setOpen(true)}>Modifier</button>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded shadow-lg">
            <EditPerformanceForm performance={performance} competiteurs={competiteurs} epreuves={epreuves} onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
} 