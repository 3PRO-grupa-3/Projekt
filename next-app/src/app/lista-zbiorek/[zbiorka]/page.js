"use client";

import { pocketbase } from "@/lib/pocketbase";
import { useEffect, useState, use } from "react";
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

export default function Page({ params }) {
  pocketbase.autoCancellation(false);

  const zbiorkaParams = use(params);

  const [daneZbiorka, setDaneZbiorka] = useState(null);
  const [daneUczen, setDaneUczen] = useState(null);
  const [daneKomentarz, setDaneKomentarz] = useState(null);
  const [daneWplaty, setDaneWplaty] = useState(null);
  const [daneUzytkownik, setDaneUzytkownik] = useState(null);

  const [zbiorkaZakonczona, setZbiorkaZakonczona] = useState("Zakończ Zbiórkę");

  useEffect(() => {
    const getData = async () => {
      try {
        const record = await pocketbase.collection("Zbiorki").getFirstListItem(
          `Tytul="${zbiorkaParams.zbiorka}"`,
          { expand: "relField1,relField2.subRelField" }
        );
        setDaneZbiorka(record);
        if (record.status === false) {
          setZbiorkaZakonczona("Zbiórka Zakończona");
        }
        console.log("Danezbiorka",record)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [zbiorkaParams.zbiorka]);

  useEffect(() => {
    if (daneZbiorka && daneZbiorka.status === false) {
      setZbiorkaZakonczona("Zbiórka Zakończona");
    }
  }, [daneZbiorka]);

  useEffect(() => {
    const getData = async () => {
      try {
        const record = await pocketbase.collection("uczniowe").getFullList({
          sort: "-id",
        });
        setDaneUczen(record);
        console.log("uczniowie (id)",record);
      } catch (error) {
        console.error("Error fetching uczniowe:", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const record = await pocketbase.collection("komentarze").getFullList({
          sort: "-tresc",
        });
        setDaneKomentarz(record);
        console.log("komentarze: ",record);
      } catch (error) {
        console.error("Error fetching komentarze:", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const record = await pocketbase.collection("wplaty").getFullList({
          sort: "-id",
        });
        setDaneWplaty(record);
        console.log("Wplaty: ",record);
      } catch (error) {
        console.error("Error fetching wplaty:", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const record = await pocketbase.collection("users").getFullList({
          sort: "-id",
        });
        setDaneUzytkownik(record);
        console.log("Users: ", record);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getData();
  }, []);

  const przypomnijZbiorka = () => {
    console.log("tu ma byc funkjca do przypomnienia o zbiorce");
  };

  const zakonczZbiorke = () => {
    console.log("tu ma byc funkjca do zakocnzenia zbiorki");
  };

  const dodajUcznia = () => {
    console.log("tu ma byc funkjca do dodania ucznia do zbiorki");
  };

  const usunKomentarz = () => {
    console.log("tu ma byc funkjca do usuniecia komentarza");
  };



  return (
    <div>
      {daneZbiorka ? (
        <Card>
          <CardHeader>
            <CardTitle>{daneZbiorka.Tytul}</CardTitle>
            <CardDescription>{daneZbiorka.data_zakonczenia}</CardDescription>
          </CardHeader>
          <CardContent>
            <h1>{daneZbiorka.opis}</h1>
            <p>{daneZbiorka.cena_na_ucznia}</p>
          </CardContent>
        </Card>
      ) : (
        <p>Loading...</p>
      )}

      <div>
        <Button>ZGŁOŚ PROBLEM</Button>
        <Button>EDYTUJ SZCZEGÓŁY</Button>
        <ConfirmationAlert
          message={"Czy napewno chcesz zakończyć zbiórkę?"}
          cancelText={"Powrót"}
          triggerElement={<Button>{zbiorkaZakonczona}</Button>}
          mutationFn={zakonczZbiorke}
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
          mutationFn={przypomnijZbiorka}
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
          <Input placeholder="Wpisz Ucznia bu go dodać do zbiórki"></Input>
          <ConfirmationAlert
          message={"Czy napewno chcesz dodać tego ucznia do zbiórki"}
          cancelText={"Powrót"}
          triggerElement={<Button>Dodaj Ucznia</Button>}
          mutationFn={dodajUcznia}
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
          {daneUczen &&
            daneUczen.map((tenUczen) => {
              if (tenUczen!=null && daneZbiorka!=null && tenUczen.id_zbiorki == daneZbiorka.id) {
                const user = daneUzytkownik ? daneUzytkownik.find((user) => user.id == tenUczen.id_ucznia) : null;                
                const wplata = daneWplaty ? daneWplaty.find((payment) => payment.id_ucznia == tenUczen.id_ucznia && payment.id_zbiorki === daneZbiorka.id) : null;

                return (
                  <Card key={tenUczen.id}>
                    <CardHeader>
                      <CardTitle>{user ? user.imie + " " + user.nazwisko : null}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {wplata ? (
                        <div>
                          <p>Data Zapłaty: {wplata.data_utworzenia}</p>
                          <p>Status płatności: {wplata.wplacono ? "Zapłacono" : "Nie zapłacono"}</p>
                          {wplata.wplacono && (
                            <p>Metoda płatności: {wplata.typ_platnosci}</p>
                          )}
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

{daneKomentarz && daneKomentarz.map((komentarz) => {
  if (komentarz && daneZbiorka && komentarz.id_zbiorki === daneZbiorka.id) {
    const user = daneUzytkownik ? daneUzytkownik.find((user) => user.id === komentarz.id_autora) : null;
    const komentarZmienna = komentarz ? daneKomentarz.find((kom) => kom.id_autora === komentarz.id_autora && kom.id_zbiorki === daneZbiorka.id) : null;

    return (
      <Card key={komentarz.id}>
        <CardHeader>
          <CardTitle>{user ? user.imie + " " + user.nazwisko : "Brak autora"}</CardTitle>
        </CardHeader>
        <CardContent>
          {komentarZmienna ? (
            <div>
              <p>Data komentarza: {komentarZmienna.data_utworzenia}</p>
              <p>{komentarZmienna.tresc}</p>
              <ConfirmationAlert
                message={"Czy na pewno chcesz usunąć ten komentarz?"}
                cancelText={"Powrót"}
                triggerElement={<Button>Usuń komentarz</Button>}
                mutationFn={usunKomentarz}
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
            </div>
          ) : null}
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
