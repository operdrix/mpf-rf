"use client";
import EditClubForm from "./EditClubForm";
import type { Club } from "./types";

export default function EditButton({ club }: { club: Club }) {
  return (
    <>
      <button
        className="btn btn-warning btn-xs mr-2"
        onClick={() => (document.getElementById('EditFormModal') as HTMLDialogElement)?.showModal()}
      >
        Modifier {club.shortName}
      </button>
      <dialog id="EditFormModal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Modifier le club {club.shortName}</h3>
          <div className="py-4">
            <EditClubForm
              club={club}
              onClose={() => (document.getElementById('EditFormModal') as HTMLDialogElement)?.close()}
            />
          </div>
        </div>
      </dialog>
    </>
  );
} 