"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";
import ConfirmationAlert from "@/lib/basicComponents/ConfirmationAlert";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { fetchKomentarze, fetchUczen, fetchUsers, fetchWplaty, fetchZbiorkaByTitle, zakonczZbiorkeFinal } from "../data-acces";
import { useUser } from "@/hooks/useUser";
import { Switch } from "@/components/ui/switch";

export default function Page({ params }) {
  const zbiorkaParams = React.use(params);

   const { data: daneZbiorka, isLoading: isLoadingZbiorka, refetch } = useQuery({
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
  const userInfo = useUser()

  const [editZbiorka, setEditZbiorka] = useState({
		tytul: "",
		opis: "",
		cel: "",
		cena_na_ucznia: "",
		typZbiorki: "",
	});

  const zakonczZbiorke = async () => {
    try {
      await zakonczZbiorkeFinal(daneZbiorka.id, daneZbiorka.Tytul);
      refetch();
    } catch (error) {
      console.error("Error while ending the zbiórka:", error);
    }
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

  const handleEditZbiorkaChange = (e, field) => {
    if(field=="typZbiorki"){
      setEditZbiorka(e)
    }else{
		const { value } = e.target;
		setEditZbiorka((prev) => ({
			...prev,
			[field]: value,
		}))}
	};

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
      {userInfo?.user?.typ == "Admin" && 
        <Dialog>
        <DialogTrigger asChild>
          <Button>Edytuj Zbiórke</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Edycja Zbiórki {daneZbiorka.Tytul}</DialogTitle>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tytul" className="text-right">
              Tytuł Zbiórki
            </Label>
            <Input
              placeholder={daneZbiorka.Tytul}
              type="text"
              className="col-span-3"
              onChange={(e) => handleEditZbiorkaChange(e, "tytul")}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="opis" className="text-right">
              Opis
            </Label>
            <Input
              placeholder={daneZbiorka.opis}
              type="text"
              className="col-span-3"
              onChange={(e) => handleEditZbiorkaChange(e, "opis")}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cel" className="text-right">
              Cel
            </Label>
            <Input
              placeholder={daneZbiorka.cel}
              type="number"
              className="col-span-3"
              onChange={(e) => handleEditZbiorkaChange(e, "cel")}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cenanaucznia" className="text-right">
              Cena na ucznia
            </Label>
            <Input
              placeholder={daneZbiorka.cena_na_ucznia}
              type="number"
              className="col-span-3"
              onChange={(e) => handleEditZbiorkaChange(e, "cena_na_ucznia")}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tryb" className="text-right">
              Typ zbiórki: Publiczna/Prywatna
            </Label>
            {daneZbiorka.tryb[0] == "publiczna" ? 
            <Button onClick={()=> handleEditZbiorkaChange("prywatna","typZbiorki")}>zmień na zbiórke prywatną</Button>
             : <Button onClick={()=> handleEditZbiorkaChange("publiczna","typZbiorki")} >zmień na zbiórke publiczną</Button>}
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button onClick={console.log(editZbiorka)}type="submit">Zapisz zmiany</Button>
          </DialogTrigger>
        </DialogFooter>
        </DialogContent>
      </Dialog>
      
      }
      {userInfo?.user?.typ == "Admin" && daneZbiorka?.status==true ? (<ConfirmationAlert
        message={"Czy napewno chcesz zakończyć zbiórkę?"}
        cancelText={"Powrót"}
        triggerElement={<Button>Zakończ zbiórke</Button>}
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
      />) : <Button>Zbiórka jest zakończona</Button>}
      {userInfo?.user?.typ == "Admin" && <ConfirmationAlert
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
      />}
    </div>


      <div>
        {userInfo?.user?.typ == "Admin" ? (
        <>
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
        </>) : <Label>Lista Uczniów</Label>}

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
                  {userInfo?.user?.typ == "Admin" && <ConfirmationAlert
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
                  />}
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
