"use client";

import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ConfirmationAlert from "@/lib/basicComponents/ConfirmationAlert";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { fetchKomentarze, fetchUczen, fetchUsers, fetchWplaty, fetchZbiorkaByTitle } from "../data-acces";

export default function Page({ params }) {
  const zbiorkaParams = React.use(params);

  const { data: daneZbiorka, isLoading: isLoadingZbiorka } = useQuery({
    queryKey: ["zbiorka", zbiorkaParams.zbiorka],
    queryFn: () => fetchZbiorkaByTitle(zbiorkaParams.zbiorka),
  });

  const { data: daneUczen } = useQuery({
    queryKey: ["uczniowie"],
    queryFn: fetchUczen,
  });

  const { data: daneKomentarz } = useQuery({
    queryKey: ["komentarze"],
    queryFn: fetchKomentarze,
  });

  const { data: daneWplaty } = useQuery({
    queryKey: ["wplaty"],
    queryFn: fetchWplaty,
  });

  const { data: daneUzytkownik } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

const zakonczZbiorke = async () => {
  console.log("tu bedzie funkcja by zakonczyc zbiorke")
};
const przypomnijZbiorka = async () => {
  console.log("tu bedzie funkcja by przypomniec o zbiorce")
};
const dodajUcznia = async () => {
  console.log("tu bedzie funkcja by dodac ucznia do zbiorki")
};

const mutationFn = async (action) => {
  switch (action) {
    case "zakonczZbiorke":
      return zakonczZbiorke();
    case "przypomnijZbiorka":
      return przypomnijZbiorka();
    case "dodajUcznia":
      return dodajUcznia();
    default:
      throw new Error("Unknown action");
  }
};

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
        console.log("mutacja")
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const zbiorkaZakonczona = daneZbiorka?.status === false ? "Zbiórka Zakończona" : "Zakończ Zbiórkę";

  if (isLoadingZbiorka) return <p>Loading...</p>;
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{daneZbiorka?.Tytul}</CardTitle>
          <CardDescription>{daneZbiorka?.data_zakonczenia}</CardDescription>
        </CardHeader>
        <CardContent>
          <h1>{daneZbiorka?.opis}</h1>
          <p>{daneZbiorka?.cena_na_ucznia}</p>
        </CardContent>
      </Card>

      <div>
        <Button>ZGŁOŚ PROBLEM</Button>
        <Button>EDYTUJ SZCZEGÓŁY</Button>
        <ConfirmationAlert
          message={"Czy napewno chcesz zakończyć zbiórkę?"}
          cancelText={"Powrót"}
          triggerElement={<Button>{zbiorkaZakonczona}</Button>}
          mutationFn={() => mutation.mutate("zakonczZbiorke")}
          toastError={{
            variant: "destructive",
            title: "Nie udało się wykonać polecenia.",
            description: "Spróbuj ponownie później.",
          }}
          toastSucces={{
            title: "Zbiórka została zakończona",
            description: "",
          }}
        />
        <ConfirmationAlert
          message={"Czy napewno chcesz wysłać powiadomienie o zbiórce?"}
          cancelText={"Powrót"}
          triggerElement={<Button>Przypomnij o zbiórce</Button>}
          mutationFn={() => mutation.mutate("przypomnijZbiorka")}
          toastError={{
            variant: "destructive",
            title: "Nie udało się wykonać polecenia.",
            description: "Spróbuj ponownie później.",
          }}
          toastSucces={{
            title: "Przypomnienie zostało wysłane",
            description: "",
          }}
        />
      </div>

      <div>
        <Label>Lista Uczniów</Label>
        <Input placeholder="Wpisz Ucznia bu go dodać do zbiórki" />
        <ConfirmationAlert
          message={"Czy napewno chcesz dodać tego ucznia do zbiórki"}
          cancelText={"Powrót"}
          triggerElement={<Button>Dodaj Ucznia</Button>}
          mutationFn={() => mutation.mutate("dodajUcznia")}
          toastError={{
            variant: "destructive",
            title: "Nie udało się wykonać polecenia.",
            description: "Spróbuj ponownie później.",
          }}
          toastSucces={{
            title: "Uczeń został dodany do zbiórki",
            description: "",
          }}
        />

        {daneUczen?.map((tenUczen) => {
          if (tenUczen && daneZbiorka && tenUczen.id_zbiorki === daneZbiorka.id) {
            const user = daneUzytkownik?.find((user) => user.id === tenUczen.id_ucznia);
            const wplata = daneWplaty?.find(
              (payment) =>
                payment.id_ucznia === tenUczen.id_ucznia &&
                payment.id_zbiorki === daneZbiorka.id
            );

            return (
              <Card key={tenUczen.id}>
                <CardHeader>
                  <CardTitle>{user ? `${user.imie} ${user.nazwisko}` : null}</CardTitle>
                </CardHeader>
                <CardContent>
                  {wplata ? (
                    <div>
                      <p>Data Zapłaty: {wplata.data_utworzenia}</p>
                      <p>Status płatności: {wplata.wplacono ? "Zapłacono" : "Nie zapłacono"}</p>
                      {wplata.wplacono && <p>Metoda płatności: {wplata.typ_platnosci}</p>}
                    </div>
                  ) : (
                    <p>Nie zapłacono</p>
                  )}
                </CardContent>
              </Card>
            );
          }
          return null;
        })}

        {daneKomentarz?.map((komentarz) => {
          if (komentarz && daneZbiorka && komentarz.id_zbiorki === daneZbiorka.id) {
            const user = daneUzytkownik?.find((user) => user.id === komentarz.id_autora);

            return (
              <Card key={komentarz.id}>
                <CardHeader>
                  <CardTitle>{user ? `${user.imie} ${user.nazwisko}` : "Brak autora"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Data komentarza: {komentarz.data_utworzenia}</p>
                  <p>{komentarz.tresc}</p>
                  <ConfirmationAlert
                    message={"Czy na pewno chcesz usunąć ten komentarz?"}
                    cancelText={"Powrót"}
                    triggerElement={<Button>Usuń komentarz</Button>}
                    mutationFn={() => mutation.mutate("usunKomentarz")}
                    toastError={{
                      variant: "destructive",
                      title: "Nie udało się wykonać polecenia.",
                      description: "Spróbuj ponownie później.",
                    }}
                    toastSucces={{
                      title: "Komentarz został usunięty",
                      description: "",
                    }}
                  />
                </CardContent>
              </Card>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
