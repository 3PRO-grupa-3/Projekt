import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';
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

  const handleConfirmPayment = (wplata) => {
    potwierdzWplate(wplata.id);
    setPaymentStatus((prevStatus) => ({
      ...prevStatus,
      [wplata.id]: true,
    }));
  };

  const [metodaPlatnosci, setMetodaPlatnosci] = useState(null);
  const [disabledUseState, setDisabledUseState] = useState(true);

  const handleMetodaPlatnosci = (metodaPlatnosci) => {
    setMetodaPlatnosci(metodaPlatnosci);
    setDisabledUseState(false);
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
                    {/* Show the method of payment only after payment is confirmed */}
                    {paymentStatus[wplata.id] && metodaPlatnosci && (
                      <p>Metoda płatności: {metodaPlatnosci}</p>
                    )}
                  </div>
                ) : (
                  <p>Brak płatności</p>
                )}
              </CardContent>
            </Card>
          );
        }
        return null;
      })}
    </div>
  );
}
