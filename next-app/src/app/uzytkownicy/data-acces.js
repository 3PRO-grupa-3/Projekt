import { useUser } from "@/hooks/useUser";
import { pocketbase } from "@/lib/pocketbase";

export async function getUsers() {
  try {
    const records = await pocketbase.collection("users").getFullList({
      sort: "-created",
    });
    return records;
  } catch (error) {
    throw new Error(error);
  }
}
export async function przelaczNaUcznia(user) {
  try {
    console.log(pocketbase.collection("users"));

    const record = await pocketbase
      .collection("users")
      .update(user.id, { ...user, rola: "uczen" });
  } catch (error) {
    throw new Error(error);
  }
}
export async function przelaczNaAdmina(user) {
  try {
    console.log(user.id);
    const record = await pocketbase
      .collection("users")
      .update(user.id, { ...user, rola: "admin" });
    console.log(record);
  } catch (error) {
    throw new Error(error);
  }
}
// export async function usunUzytkownika(user) {
//   try {
//     console.log(user.id);
//     await pocketbase.collection("users").delete(user.id);
//   } catch (error) {
//     throw new Error(error);
//   }
// }
