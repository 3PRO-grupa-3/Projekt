import ConfirmationAlert from '@/lib/basicComponents/ConfirmationAlert'
import React, { useState } from 'react'
import EdycjaZbiorki from './EdycjaZbiorki'
import ZakonczZbiorke from './operacje/ZakonczZbiorke'
import Przypomnij from './operacje/Przypomnij'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import DodajUczniaLista, { addUczenToZbiorka } from './dodajUcznia';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { addNewProblem } from '../data-acces'


export default function ActionButtons({ mutation, userInfo, daneZbiorka }) {
  const [problemInputValue, setProblemInputValue] = useState('');

  const handleGetProblemInfo = (e) => {
    setProblemInputValue(e.target.value);
  };

  const problemFinalFunction = async () => {
    await addNewProblem(daneZbiorka.id, userInfo.user.id, problemInputValue);
  };

  return (
    <div id="action-buttons">
      {userInfo?.user?.rola === 'uczen' &&  daneZbiorka?.status  && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Zgłoś zbiórke</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Zgłoś błąd w zbiórce</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="problem"
                placeholder="Treść Problemu"
                className="col-span-3"
                onChange={handleGetProblemInfo}
              />
            </div>
            <DialogFooter>
              <DialogTrigger asChild>
              <ConfirmationAlert
                message={"Czy napewno chcesz dodać ten problem?"}
                cancelText={"Powrót"}
                triggerElement={
                  <Button>Zapisz zmiany</Button>
                }
                mutationFn={() => console.log("")}
                toastError={{
                  variant: "destructive",
                  title: "Nie udało się zgłosić problemu.",
                  description: "Spróbuj ponownie później.",
                }}
                toastSucces={{
                  title: "Udało się zgłosić problem",
                }}
                onSuccesCustomFunc={
                  problemFinalFunction
              }
              />  
              </DialogTrigger>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

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
          </div>
        </div>
      ) : daneZbiorka?.status ? (
        <></>
      ) : (
        <p>Zbiórka jest zakończona</p>
      )}
    </div>
  );
}