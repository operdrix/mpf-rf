"use client";
import EditCompetiteurForm from "./EditCompetiteurForm";
import type { Competiteur } from "./types";

export default function EditButton({ competiteur }: { competiteur: Competiteur }) {
  return (
    <>
      <button
        className="btn btn-warning btn-xs mr-2"
        onClick={() => (document.getElementById('EditFormModal') as HTMLDialogElement)?.showModal()}
      >
        Modifier
      </button>
      <dialog id="EditFormModal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Modifier le compétiteur</h3>
          <div className="py-4">
            <EditCompetiteurForm
              competiteur={competiteur}
              onClose={() => (document.getElementById('EditFormModal') as HTMLDialogElement)?.close()}
            />
          </div>
        </div>
      </dialog>
    </>
  );
} 