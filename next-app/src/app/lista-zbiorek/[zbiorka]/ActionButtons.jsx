import ConfirmationAlert from '@/lib/basicComponents/ConfirmationAlert'
import React, { useEffect, useState } from 'react'
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
import { addNewProblem, fetchUczen } from '../data-acces'
import { useQuery } from '@tanstack/react-query'

export default function ActionButtons({ mutation, userInfo, daneZbiorka }) {
  const [problemInputValue, setProblemInputValue] = useState('');

  const { data: daneRelacje} = useQuery({
    queryKey: ['kluucz'],
    queryFn: fetchUczen,
  });
  const [isCurrentUser,setIsCurrentUser] = useState(null)
  useEffect(() => {
    if (daneRelacje && userInfo?.user) {
      daneRelacje.map((relacja) => {
        if (
          relacja.id_zbiorki === daneZbiorka.id &&
          relacja.id_ucznia === userInfo.user.id
        ) {
          setIsCurrentUser(true)
        }else(setIsCurrentUser(false))
      });
    }
  }, [daneRelacje, daneZbiorka.id, userInfo?.user?.id]);
  

  const handleGetProblemInfo = (e) => {
    try {
      setProblemInputValue(e.target.value);
    } catch (error) {
      throw new Error(error);
    }
  };

  const problemFinalFunction = async () => {
    try {
      await addNewProblem(daneZbiorka.id, userInfo.user.id, problemInputValue);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div id="action-buttons" className="space-y-6">
      {isCurrentUser==true && userInfo?.user?.rola === 'uczen' && daneZbiorka?.status && (
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full py-3 text-white border border-gray-300 rounded-md"
            >
              Zgłoś zbiórke
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-secondary rounded-lg shadow-lg p-6">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-white">Zgłoś błąd w zbiórce</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                id="problem"
                placeholder="Treść Problemu"
                className="w-full p-3 bg-dialog border border-gray-300 rounded-md text-white"
                onChange={handleGetProblemInfo}
              />
            </div>
            <DialogFooter className="flex justify-between items-center mt-4 space-x-2">
              <DialogTrigger asChild>
                {/* <ConfirmationAlert
                  message={"Czy napewno chcesz dodać ten problem?"}
                  cancelText={"Powrót"}
                  triggerElement={
                    <Button className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-3 rounded-md">
                      Zapisz zmiany
                    </Button>
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
                  onSuccesCustomFunc={problemFinalFunction}
                /> */}
                <Button onClick={problemFinalFunction} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">
                  Submit</Button>

              </DialogTrigger>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {userInfo?.user?.rola === "admin" && daneZbiorka?.status ? (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <EdycjaZbiorki daneZbiorka={daneZbiorka} />
            <ZakonczZbiorke mutation={mutation} />
            {/* <Przypomnij mutation={mutation} /> */}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <DodajUczniaLista
              daneZbiorka={daneZbiorka}
              onStudentAdded={() => mutation.mutate("dodajUcznia")}
            />
          </div>
        </div>
      ) : daneZbiorka?.status ? (
        <></>
      ) : (
        <h1 className="text-center text-xl text-gray-500">Zbiórka jest zakończona</h1>
      )}
    </div>
  );
}
