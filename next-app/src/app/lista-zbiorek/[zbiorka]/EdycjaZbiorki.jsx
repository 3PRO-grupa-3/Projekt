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
import { useRouter } from 'next/navigation'
import SpinnerLoading from '@/lib/basicComponents/SpinnerLoading'

export default function EdycjaZbiorki({ daneZbiorka, mutation }) {
  const [editZbiorka, setEditZbiorka] = useState({
    tytul: daneZbiorka.Tytul,
    opis: daneZbiorka.opis,
    cel: daneZbiorka.cel,
    cena_na_ucznia: daneZbiorka.cena_na_ucznia,
    typZbiorki: daneZbiorka.tryb,
  })

  const router = useRouter()

  useEffect(() => {
    try {
      setEditZbiorka({
        tytul: daneZbiorka.Tytul,
        opis: daneZbiorka.opis,
        cel: daneZbiorka.cel,
        cena_na_ucznia: daneZbiorka.cena_na_ucznia,
        typZbiorki: daneZbiorka.tryb,
      })
    } catch (error) {
      throw new Error(error)
    }
  }, [daneZbiorka])

  const handleEditZbiorkaChange = (e, field) => {
    try {
      const { value } = e.target
      setEditZbiorka((prev) => ({
        ...prev,
        [field]: value,
      }))
    } catch (error) {
      throw new Error(error)
    }
  }

  const handleSubmit = async () => {
    try {
      const finalZbiorka = {
        tytul: editZbiorka.tytul || daneZbiorka.Tytul,
        opis: editZbiorka.opis || daneZbiorka.opis,
        cel: editZbiorka.cel || daneZbiorka.cel,
        cena_na_ucznia: editZbiorka.cena_na_ucznia || daneZbiorka.cena_na_ucznia,
        typZbiorki: editZbiorka.typZbiorki || daneZbiorka.tryb,
      }

      await editZbiorkaFinal(daneZbiorka.id, finalZbiorka)
      router.push(finalZbiorka.tytul)
    } catch (err) {
      throw new Error(error)
    } finally {
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-secondary hover:bg-secondary-600 text-white py-2 px-4 rounded-md">Edytuj Zbiórke</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-2xl font-bold text-center mb-6">Edycja Zbiórki: {daneZbiorka.Tytul}</DialogTitle>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tytul" className="text-right text-lg">Tytuł Zbiórki</Label>
            <Input
              placeholder={daneZbiorka.Tytul}
              type="text"
              className="col-span-3 p-3 rounded-md bg-input text-primary border border-gray-400 focus:ring-2 focus:ring-primary"
              onChange={(e) => handleEditZbiorkaChange(e, 'tytul')}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="opis" className="text-right text-lg">Opis</Label>
            <Input
              placeholder={daneZbiorka.opis}
              type="text"
              className="col-span-3 p-3 rounded-md bg-input text-primary border border-gray-400 focus:ring-2 focus:ring-primary"
              onChange={(e) => handleEditZbiorkaChange(e, 'opis')}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cel" className="text-right text-lg">Cel</Label>
            <Input
              placeholder={daneZbiorka.cel}
              type="number"
              className="col-span-3 p-3 rounded-md bg-input text-primary border border-gray-400 focus:ring-2 focus:ring-primary"
              onChange={(e) => handleEditZbiorkaChange(e, 'cel')}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cenanaucznia" className="text-right text-lg">Cena na ucznia</Label>
            <Input
              placeholder={daneZbiorka.cena_na_ucznia}
              type="number"
              className="col-span-3 p-3 rounded-md bg-input text-primary border border-gray-400 focus:ring-2 focus:ring-primary"
              onChange={(e) => handleEditZbiorkaChange(e, 'cena_na_ucznia')}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tryb" className="text-right text-lg">Typ zbiórki</Label>
            {daneZbiorka.tryb === 'publiczna' ? (
              <Button
                onClick={() => handleEditZbiorkaChange({ target: { value: 'prywatna' } }, 'typZbiorki')}
                className="col-span-3 py-2 px-4 bg-secondary text-white rounded-md"
              >
                Zmień na zbiórkę prywatną
              </Button>
            ) : (
              <Button
                onClick={() => handleEditZbiorkaChange({ target: { value: 'publiczna' } }, 'typZbiorki')}
                className="col-span-3 py-2 px-4 bg-secondary text-white rounded-md"
              >
                Zmień na zbiórkę publiczną
              </Button>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary-600 text-white py-2 px-6 rounded-md"
            type="submit"
          >
            Zapisz zmiany
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
