import ConfirmationAlert from '@/lib/basicComponents/ConfirmationAlert'
import React from 'react'
import EdycjaZbiorki from './EdycjaZbiorki'
import ZakonczZbiorke from './operacje/ZakonczZbiorke'
import Przypomnij from './operacje/Przypomnij'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import DodajUczniaLista, { addUczenToZbiorka } from './dodajUcznia';



export default function ActionButtons({ mutation, userInfo, daneZbiorka }) {

  return (
    <div id="action-buttons">
      {userInfo?.user?.rola === "uczen" && <Button>ZGŁOŚ PROBLEM</Button>}

      {userInfo?.user?.rola === "admin" && daneZbiorka?.status ? (
        <div>
          <div className="flex flex-row justify-between items-center ">
            <EdycjaZbiorki daneZbiorka={daneZbiorka} />
            <ZakonczZbiorke mutation={mutation} />
            <Przypomnij mutation={mutation} />
          </div>

          <div className="flex flex-row justify-between items-center ">
          <DodajUczniaLista
          daneZbiorka={daneZbiorka}
          onStudentAdded={() => mutation.mutate("dodajUcznia")}
        />
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
              // onSuccesCustomFunc={
              //   addUczenToZbiorka(daneZbiorka)
              // }
            />
          </div>
        </div>
      ) : (
        <p>Zbiórka jest zakończona</p>
      )}
    </div>
  );
}