import React, { useState } from 'react'

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

export default function EdycjaZbiorki({ daneZbiorka }) {
  const [editZbiorka, setEditZbiorka] = useState({
    tytul: '',
    opis: '',
    cel: '',
    cena_na_ucznia: '',
    typZbiorki: '',
  })

  const handleEditZbiorkaChange = (e, field) => {
    if (field == 'typZbiorki') {
      setEditZbiorka(e)
    } else {
      const { value } = e.target
      setEditZbiorka((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edytuj Zbiórke</Button>
      </DialogTrigger>
      <DialogDescription></DialogDescription>
      <DialogContent>
        <DialogTitle>Edycja Zbiórki {daneZbiorka.Tytul}</DialogTitle>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='tytul' className='text-right'>
              Tytuł Zbiórki
            </Label>
            <Input
              placeholder={daneZbiorka.Tytul}
              type='text'
              className='col-span-3'
              onChange={(e) => handleEditZbiorkaChange(e, 'tytul')}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='opis' className='text-right'>
              Opis
            </Label>
            <Input
              placeholder={daneZbiorka.opis}
              type='text'
              className='col-span-3'
              onChange={(e) => handleEditZbiorkaChange(e, 'opis')}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='cel' className='text-right'>
              Cel
            </Label>
            <Input
              placeholder={daneZbiorka.cel}
              type='number'
              className='col-span-3'
              onChange={(e) => handleEditZbiorkaChange(e, 'cel')}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='cenanaucznia' className='text-right'>
              Cena na ucznia
            </Label>
            <Input
              placeholder={daneZbiorka.cena_na_ucznia}
              type='number'
              className='col-span-3'
              onChange={(e) => handleEditZbiorkaChange(e, 'cena_na_ucznia')}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='tryb' className='text-right'>
              Typ zbiórki: Publiczna/Prywatna
            </Label>
            {daneZbiorka.tryb[0] == 'publiczna' ? (
              <Button onClick={() => handleEditZbiorkaChange('prywatna', 'typZbiorki')}>
                zmień na zbiórke prywatną
              </Button>
            ) : (
              <Button onClick={() => handleEditZbiorkaChange('publiczna', 'typZbiorki')}>
                zmień na zbiórke publiczną
              </Button>
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button onClick={console.log(editZbiorka)} type='submit'>
              Zapisz zmiany
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
