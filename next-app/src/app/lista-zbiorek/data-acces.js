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

export async function editZbiorkaFinal(zbiorkaID,editData) {
   try {
    const data = {
      Tytul: editData.tytul,
      opis: editData.opis,
      cel: editData.cel,
      tryb: [
          editData.typZbiorki
      ],
      cena_na_ucznia: editData.cena_na_ucznia,
  };
  
    await pocketbase.collection('Zbiorki').update(zbiorkaID, data);
  } catch (error) {
    throw new Error(error);
  }
}
