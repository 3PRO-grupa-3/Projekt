import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchWplaty } from '../data-acces'

export default function ListaUczniow({ daneUczen, daneZbiorka, daneUzytkownik }) {
  const { data: daneWplaty } = useQuery({
    queryKey: ['wplaty'],
    queryFn: fetchWplaty,
  })
  return (
    <div>
      <h1 className='text-3xl'>Uczniowie</h1>
      {daneUczen?.map((tenUczen) => {
        if (tenUczen && daneZbiorka && tenUczen.id_zbiorki === daneZbiorka.id) {
          const user = daneUzytkownik?.find((user) => user.id === tenUczen.id_ucznia)
          const wplata = daneWplaty?.find(
            (payment) => payment.id_ucznia === tenUczen.id_ucznia && payment.id_zbiorki === daneZbiorka.id
          )

          return (
            <Card key={tenUczen.id}>
              <CardHeader>
                <CardTitle>{user ? `${user.imie} ${user.nazwisko}` : null}</CardTitle>
              </CardHeader>
              <CardContent>
                {wplata ? (
                  <div>
                    <p>Data Zapłaty: {wplata.data_utworzenia}</p>
                    <p>Status płatności: {wplata.wplacono ? 'Zapłacono' : 'Nie zapłacono'}</p>
                    {wplata.wplacono && <p>Metoda płatności: {wplata.typ_platnosci}</p>}
                  </div>
                ) : (
                  <p>Nie zapłacono</p>
                )}
              </CardContent>
            </Card>
          )
        }
        return null
      })}
    </div>
  )
}
