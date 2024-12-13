import React, { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { editZbiorkaFinal } from '../data-acces'
import { useRouter } from 'next/navigation';

export default function EdycjaZbiorki({ daneZbiorka, mutation }) {
  const [editZbiorka, setEditZbiorka] = useState({
    tytul: daneZbiorka.Tytul,
    opis: daneZbiorka.opis,
    cel: daneZbiorka.cel,
    cena_na_ucznia: daneZbiorka.cena_na_ucznia,
    typZbiorki: daneZbiorka.tryb,
  });

  const router = useRouter();

  useEffect(() => {
    setEditZbiorka({
      tytul: daneZbiorka.Tytul,
      opis: daneZbiorka.opis,
      cel: daneZbiorka.cel,
      cena_na_ucznia: daneZbiorka.cena_na_ucznia,
      typZbiorki: daneZbiorka.tryb,
    });
  }, [daneZbiorka]);

  const handleEditZbiorkaChange = (e, field) => {
    if (field === 'typZbiorki') {
      setEditZbiorka((prev) => ({
        ...prev,
        [field]: e,
      }));
    } else {
      const { value } = e.target;
      setEditZbiorka((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = () => {
    const finalZbiorka = {
      tytul: editZbiorka.tytul || daneZbiorka.Tytul,
      opis: editZbiorka.opis || daneZbiorka.opis,
      cel: editZbiorka.cel || daneZbiorka.cel,
      cena_na_ucznia: editZbiorka.cena_na_ucznia || daneZbiorka.cena_na_ucznia,
      typZbiorki: editZbiorka.typZbiorki || daneZbiorka.tryb,
    };

    editZbiorkaFinal(daneZbiorka.id, finalZbiorka);
    router.push(finalZbiorka.tytul);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edytuj Zbiórke</Button>
      </DialogTrigger>
      <DialogDescription></DialogDescription>
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
              onChange={(e) => handleEditZbiorkaChange(e, 'tytul')}
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
              onChange={(e) => handleEditZbiorkaChange(e, 'opis')}
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
              onChange={(e) => handleEditZbiorkaChange(e, 'cel')}
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
              onChange={(e) => handleEditZbiorkaChange(e, 'cena_na_ucznia')}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tryb" className="text-right">
              Typ zbiórki: Publiczna/Prywatna
            </Label>
            {daneZbiorka.tryb === 'publiczna' ? (
              <Button
                onClick={() => handleEditZbiorkaChange('prywatna', 'typZbiorki')}
              >
                zmień na zbiórke prywatną
              </Button>
            ) : (
              <Button
                onClick={() => handleEditZbiorkaChange('publiczna', 'typZbiorki')}
              >
                zmień na zbiórke publiczną
              </Button>
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button onClick={handleSubmit} type="submit">
              Zapisz zmiany
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
