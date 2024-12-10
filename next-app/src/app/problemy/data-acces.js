import { pocketbase } from "@/lib/pocketbase";

export async function getProblems() {
  try {
    const problemsList = await pocketbase
      .collection("problemy")
      .getFullList({});

    // Use Promise.all to handle async operations for each problem
    const problemsWithDetails = await Promise.all(
      problemsList.map(async (problem) => {
        // console.log("loop");

        // Fetch Zbiorka and user details for each problem
        const zbiorkaProblemu = await pocketbase
          .collection("Zbiorki")
          .getOne(problem.id_zbiorki);

        problem.tytulZbiorki = zbiorkaProblemu.Tytul;

        const uczenProblemu = await pocketbase
          .collection("users")
          .getOne(problem.id_ucznia);

        problem.imieUcznia = uczenProblemu.imie;
        problem.nazwiskoUcznia = uczenProblemu.nazwisko;

        return problem;
      })
    );

    return problemsWithDetails;
  } catch (error) {
    throw new Error(error);
  }
}
export async function wykonano(problem) {
  try {
    const record = await pocketbase
      .collection("problemy")
      .update(problem.id, { ...problem, wykonano: !problem.wykonano });
  } catch (error) {
    throw new Error(error);
  }
}
