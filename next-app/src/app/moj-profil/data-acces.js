import { pocketbase } from "@/lib/pocketbase";

export const fetchZBiorkiInUzytkownik = async (idUser) => {
    return await pocketbase.collection('Zbiorki').getFullList({
        filter: `id_autora = ${idUser}`,
    });
  };

  export const fetchKomentarzeInUzytkownik = async (idUser) => {
    return await pocketbase.collection('komentarze').getFullList({
        filter: `id_autora = ${idUser}`,
    });
  };

  export const fetchProblemyInUzytkownik = async (idUser) => {
    return await pocketbase.collection('problemy').getFullList({
        filter: `id_autora = ${idUser}`,
    });
  };

  export const fetchWplatyInUzytkownik = async (idUser) => {
    return await pocketbase.collection('wplaty').getFullList({
        filter: `id_autora = ${idUser}`,
    });
  };