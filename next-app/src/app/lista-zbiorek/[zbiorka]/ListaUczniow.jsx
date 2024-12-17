import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWplaty, potwierdzWplate } from '../data-acces';
import { Button } from '@/components/ui/button';
import ConfirmationAlert from '@/lib/basicComponents/ConfirmationAlert';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';

export default function ListaUczniow({ daneUczen, daneZbiorka, daneUzytkownik, userInfo }) {
  const { data: daneWplaty } = useQuery({
    queryKey: ['wplaty'],
    queryFn: fetchWplaty,
  });
  const [paymentStatus, setPaymentStatus] = useState({});
  const [metodaPlatnosci, setMetodaPlatnosci] = useState(null);
  const [disabledUseState, setDisabledUseState] = useState(true);
  const [buttonToRegisterWplata,setButtonToRegisterWplata] = useState(false)

  const handleMetodaPlatnosci = (metodaPlatnosci) => {
    setMetodaPlatnosci(metodaPlatnosci);
    setDisabledUseState(false);
  };

  useEffect(() => {
    if (userInfo?.user) {
      const userPayment = daneWplaty?.find((payment) => payment.id_ucznia === userInfo.user.id);
      if (userPayment==false) {
        buttonToRegisterWplata(true) 
      }
    }
  }, [userInfo, daneWplaty]);

  const handleConfirmPayment = (wplata) => {
    potwierdzWplate(wplata.id);
    setPaymentStatus((prevStatus) => ({
      ...prevStatus,
      [wplata.id]: true,
    }));
  };

  return (
    <div>
      <h1 className="text-3xl">Uczniowie</h1>
      {daneUczen?.map((tenUczen) => {
        if (tenUczen && daneZbiorka && tenUczen.id_zbiorki === daneZbiorka.id) {
          const user = daneUzytkownik?.find((user) => user.id === tenUczen.id_ucznia);
          const wplata = daneWplaty?.find(
            (payment) => payment.id_ucznia === tenUczen.id_ucznia && payment.id_zbiorki === daneZbiorka.id
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
                    {paymentStatus[wplata.id] || wplata.wplacono ? (
                      'Status Płatności Zapłacono'
                    ) : userInfo?.user?.rola === 'admin' ? (
                      <div>
                        <Select id="select" onValueChange={(value) => handleMetodaPlatnosci(value)} defaultValue="">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Potwierdź Wpłate" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gotowka">Gotówka</SelectItem>
                            <SelectItem value="karta">Karta</SelectItem>
                          </SelectContent>
                        </Select>
                        <ConfirmationAlert
                          message="Czy na pewno chcesz potwierdzić tą płatność?"
                          cancelText="Powrót"
                          triggerElement={<Button disabled={disabledUseState}>Potwierdź zapłate</Button>}
                          mutationFn={() => console.log("")}
                          toastError={{
                            variant: 'destructive',
                            title: 'Nie udało się wykonać polecenia.',
                            description: 'Spróbuj ponownie później.',
                          }}
                          toastSucces={{
                            title: 'Wpłata została potwierdzona',
                            description: '',
                          }}
                          onSuccesCustomFunc={() => handleConfirmPayment(wplata)}
                        />
                      </div>
                    ) : (
                      <p>Nie zapłacono</p>
                    )}
                    {paymentStatus[wplata.id] && metodaPlatnosci && (
                      <p>Metoda płatności: {metodaPlatnosci}</p>
                    )}
                  </div>
                ) : (
                  daneWplaty && daneWplaty.map((taWplata) => {
                    if (taWplata?.id_zbiorki === daneZbiorka.id && taWplata.id_ucznia !== userInfo.user.id) {
                      return;
                    }
                  })
                )}
                {buttonToRegisterWplata ? <ConfirmationAlert
                          message="Czy na pewno chcesz zarejestrować wpłate?"
                          cancelText="Powrót"
                          triggerElement={<Button>Zarejestruj zapłate</Button>}
                          mutationFn={() => console.log("")}
                          toastError={{
                            variant: 'destructive',
                            title: 'Nie udało się wykonać polecenia.',
                            description: 'Spróbuj ponownie później.',
                          }}
                          toastSucces={{
                            title: 'Wpłata została zarejestrowana',
                            description: '',
                          }}
                          onSuccesCustomFunc={() => addNewWplata(daneZbiorka.id,userInfo.user.id,daneZbiorka.cena_na_ucznia)}
                        /> : (<p>test</p>)}
              </CardContent>
            </Card>
          );
        }
        return null;
      })}
    </div>
  );
}


//na pozniej do zrobienia: jesli jestem zalogowany jako uzytkownik i wchodze do danej zbiorki to moge przy moim uzytkowniku w liscie uczniowie kliknac guzik WYSLIJ REQUEST DO WPLATY wtedy
//w bazie danych pojawi sie pusta wplata z wplacono jako false i typ platnosci null, wtedy admin bedzie mogl potwierdzic ta wplate i sigma