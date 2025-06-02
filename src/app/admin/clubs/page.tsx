import { PrismaClient } from "@prisma/client";
import AddClubForm from "./AddClubForm";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

const prisma = new PrismaClient();

export default async function ClubsPage() {
  const clubs = await prisma.club.findMany({
    orderBy: [{ name: "asc" }],
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Administration des clubs</h1>
      <AddClubForm />
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Licence</th>
                <th>Nom</th>
                <th>Nom court</th>
                <th>Ville</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clubs.map((club) => (
                <tr key={club.id}>
                  <td>{club.license}</td>
                  <td>{club.name}</td>
                  <td>{club.shortName || "-"}</td>
                  <td>{club.city || "-"}</td>
                  <td>
                    <EditButton club={club} />
                    <DeleteButton id={club.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

