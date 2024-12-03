import { pocketbase } from "@/lib/pocketbase";

export const fetchZbiorki = async () => {
  return await pocketbase.collection("Zbiorki").getFullList({});
};

export const fetchZbiorkaByTitle = async (title) => {
  return await pocketbase.collection("Zbiorki").getFirstListItem(
    `Tytul="${title}"`,
    { expand: "relField1,relField2.subRelField" }
  );
};

export const fetchUczen = async () => {
  return await pocketbase.collection("uczniowe").getFullList({ sort: "-id" });
};

export const fetchKomentarze = async () => {
  return await pocketbase.collection("komentarze").getFullList({ sort: "-tresc" });
};

export const fetchWplaty = async () => {
  return await pocketbase.collection("wplaty").getFullList({ sort: "-id" });
};

export const fetchUsers = async () => {
  return await pocketbase.collection("users").getFullList({ sort: "-id" });
};

export async function zakonczZbiorkeFinal(zbiorkaID) {
  try {
    const data = { status: false };
    await pocketbase.collection("Zbiorki").update(zbiorkaID, data);
  } catch (error) {
    throw new Error(error);
  }
}
