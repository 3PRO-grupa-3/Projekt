'use client'
import React, { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchUczen, fetchUsers, fetchZbiorkaByTitle, zakonczZbiorkeFinal } from '../data-acces'
import { useUser } from '@/hooks/useUser'
import ListaUczniow from './ListaUczniow'
import ListaKomentarzy from './ListaKomentarzy'
import ActionButtons from './ActionButtons'

export default function Page({ params }) {
  const zbiorkaParams = React.use(params)
  const userInfo = useUser()

  const {
    data: daneZbiorka,
    isLoading: isLoadingZbiorka,
    refetch,
  } = useQuery({
    queryKey: ['zbiorka', zbiorkaParams.zbiorka],
    queryFn: () => fetchZbiorkaByTitle(zbiorkaParams.zbiorka),
  })

  //dodac bardziej unikalne query key do useQuery
  const { data: daneUczen } = useQuery({
    queryKey: ['uczniowie'],
    queryFn: fetchUczen,
  })

  const { data: daneUzytkownik } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  const zakonczZbiorke = async () => {
    try {
      await zakonczZbiorkeFinal(daneZbiorka.id, daneZbiorka.Tytul)
      refetch()
    } catch (error) {
      console.error('Error while ending the zbiórka:', error)
    }
  }

  const przypomnijZbiorka = async () => {
    console.log('tu bedzie funkcja by przypomniec o zbiorce')
  }
  const dodajUcznia = async () => {
    console.log('tu bedzie funkcja by dodac ucznia do zbiorki')
  }

  const mutationFn = async (action) => {
    switch (action) {
      case 'zakonczZbiorke':
        return zakonczZbiorke()
      case 'przypomnijZbiorka':
        return przypomnijZbiorka()
      case 'dodajUcznia':
        return dodajUcznia()
      default:
        throw new Error('Unknown action')
    }
  }

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      console.log('mutacja')
    },
    onError: (error) => {
      console.error(error)
    },
  })

  if (isLoadingZbiorka) return <p>Loading...</p>

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

      <ActionButtons mutation={mutation} userInfo={userInfo} daneZbiorka={daneZbiorka} />
      {/* fajnie jakby to bylo pokazane z uzyciem tabeli z shadcn,  */}
      {/* https://ui.shadcn.com/docs/components/data-table*/}
      <ListaUczniow daneUczen={daneUczen} daneZbiorka={daneZbiorka} daneUzytkownik={daneUzytkownik} userInfo={userInfo} />

      <ListaKomentarzy daneZbiorka={daneZbiorka} daneUzytkownik={daneUzytkownik} userInfo={userInfo} />
    </div>
  )
}
