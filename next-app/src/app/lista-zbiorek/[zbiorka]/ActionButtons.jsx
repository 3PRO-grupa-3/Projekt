<<<<<<< Updated upstream
import ConfirmationAlert from "@/lib/basicComponents/ConfirmationAlert";
import React from "react";
import EdycjaZbiorki from "./EdycjaZbiorki";
import ZakonczZbiorke from "./operacje/ZakonczZbiorke";
import Przypomnij from "./operacje/Przypomnij";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
=======
import ConfirmationAlert from '@/lib/basicComponents/ConfirmationAlert'
import React from 'react'
import EdycjaZbiorki from './EdycjaZbiorki'
import ZakonczZbiorke from './operacje/ZakonczZbiorke'
import Przypomnij from './operacje/Przypomnij'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import DodajUczniaLista, { addUczenToZbiorka } from './dodajUcznia';


>>>>>>> Stashed changes

export default function ActionButtons({ mutation, userInfo, daneZbiorka }) {
  console.log(userInfo);

  return (
    <div id="action-buttons">
<<<<<<< Updated upstream
      {userInfo?.user?.typ === "uczen" && <Button>ZGŁOŚ PROBLEM</Button>}

      {userInfo?.user?.typ == "admin" && daneZbiorka?.status ? (
=======
      {userInfo?.user?.rola === "uczen" && <Button>ZGŁOŚ PROBLEM</Button>}

      {userInfo?.user?.rola === "admin" && daneZbiorka?.status ? (
>>>>>>> Stashed changes
        <div>
          <div className="flex flex-row justify-between items-center ">
            <EdycjaZbiorki daneZbiorka={daneZbiorka} />
            <ZakonczZbiorke mutation={mutation} />
            <Przypomnij mutation={mutation} />
          </div>

          <div className="flex flex-row justify-between items-center ">
<<<<<<< Updated upstream
            {/* docelowo: input select, lista rozwijana mozna wybrac tylko ucznia z listy, lista to uczniowie (users table) */}
            <Input placeholder="Dodaj ucznia do zbiórki" />
            <ConfirmationAlert
=======
          <DodajUczniaLista daneZbiorka={daneZbiorka} />
          <ConfirmationAlert
>>>>>>> Stashed changes
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
              onSuccesCustomFunc={
                addUczenToZbiorka(daneZbiorka)
              }
            />
          </div>
        </div>
      ) : (
        <p>Zbiórka jest zakończona</p>
      )}
    </div>
  );
}
