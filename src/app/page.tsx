import Image from "next/image";
import StudentTable from "../components/students-table";

export default function Home() {
  return (
    <div>
      <h1>
        vistula.network
      </h1>
      <div>
        <p>
          welcome to the official webring for Vistula University students.
        </p>
        <p>
          our campus is home to engineers, writers, artists, organizers, and people doing interesting work across disciplines. this is a place to find other cool people at Vistula University, a directory of the students who make the school more interesting.
        </p>
        <p>

          want to join? submit a pull request to this repository.

        </p>
        <p>Inspired by Oscar Gaske and Shayaan Azeem</p>
      </div>
      <StudentTable />
    </div>
  );
}
