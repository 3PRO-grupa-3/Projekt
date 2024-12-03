import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { fetchKomentarze } from '../data-acces'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ConfirmationAlert from '@/lib/basicComponents/ConfirmationAlert'

export default function ListaKomentarzy({ daneZbiorka, daneUzytkownik, userInfo }) {
  const { data: daneKomentarz } = useQuery({
    queryKey: ['komentarze'],
    queryFn: fetchKomentarze,
  })

  return (
    <div>
      <h1 className='text-3xl'>Komentarze</h1>
      {daneKomentarz?.map((komentarz) => {
        if (komentarz && daneZbiorka && komentarz.id_zbiorki === daneZbiorka.id) {
          const user = daneUzytkownik?.find((user) => user.id === komentarz.id_autora)

          return (
            <Card key={komentarz.id}>
              <CardHeader>
                <CardTitle>{user ? `${user.imie} ${user.nazwisko}` : 'Brak autora'}</CardTitle>
              </CardHeader>
              {/* jezeli tego nie ma to jest jakies ostrzezenie w konsoli */}
              <CardDescription></CardDescription>
              <CardContent>
                <p>Data komentarza: {komentarz.data_utworzenia}</p>
                <p>{komentarz.tresc}</p>
                {userInfo?.user?.typ == 'Admin' && (
                  <ConfirmationAlert
                    message={'Czy na pewno chcesz usunąć ten komentarz?'}
                    cancelText={'Powrót'}
                    triggerElement={<Button>Usuń komentarz</Button>}
                    mutationFn={() => mutation.mutate('usunKomentarz')}
                    toastError={{
                      variant: 'destructive',
                      title: 'Nie udało się wykonać polecenia.',
                      description: 'Spróbuj ponownie później.',
                    }}
                    toastSucces={{
                      title: 'Komentarz został usunięty',
                      description: '',
                    }}
                  />
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
