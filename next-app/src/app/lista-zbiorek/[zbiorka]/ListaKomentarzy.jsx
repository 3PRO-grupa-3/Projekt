import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { addNewKomentarz, deleteKomentarzFinal, fetchKomentarze } from '../data-acces'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import ConfirmationAlert from '@/lib/basicComponents/ConfirmationAlert'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ListaKomentarzy({ daneZbiorka, daneUzytkownik, userInfo }) {
  const { data: daneKomentarz,refetch } = useQuery({
    queryKey: ['komentarze'],
    queryFn: fetchKomentarze,
  })

  const [komentarzInputValue,setKomentarzInputValue] = useState(null)
  const handleAddComment = (e) => {
    setKomentarzInputValue(e.target.value);
  };

  const addKomentarzFinalFunction = async () => {
    await addNewKomentarz(daneZbiorka.id, userInfo.user.id, komentarzInputValue);
    refetch()
    document.getElementById("komentarzInput").value=""
  };

  const deleteKomentarz = async (komentarz) => {
    await deleteKomentarzFinal(komentarz.id);
    refetch()
  };

  return (
    <div>
      <h1 className='text-3xl'>Komentarze</h1>
      <div>
      {daneZbiorka?.status && <Card>
      <CardHeader>
        <CardTitle>Dodaj Komentarz</CardTitle>
      </CardHeader>
      <CardContent>
            <Label htmlFor='komentarzlabel' className='text-right'>
              Komentarz: 
            </Label>
            <Input
              type='text'
              className='col-span-3'
              onChange={handleAddComment}
              id="komentarzInput"
            />
      </CardContent>
      <CardFooter>
          <ConfirmationAlert
            message={"Czy napewno chcesz dodać ten komentarz?"}
            cancelText={"Powrót"}
            triggerElement={
              <Button>Dodaj komentarz</Button>
            }
            mutationFn={() => console.log("")}
            toastError={{
              variant: "destructive",
              title: "Nie udało się dodać komentarza.",
              description: "Spróbuj ponownie później.",
            }}
              toastSucces={{
              title: "Udało się dodać komentarz",
            }}
            onSuccesCustomFunc={
              addKomentarzFinalFunction
            }
              />  
      </CardFooter>
    </Card>}
      </div>
      <div>
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
                {(userInfo?.user?.rola == "admin" || user?.id == userInfo?.user?.id) && (
                  <ConfirmationAlert
                    message={'Czy na pewno chcesz usunąć ten komentarz?'}
                    cancelText={'Powrót'}
                    triggerElement={<Button>Usuń komentarz</Button>}
                    mutationFn={() => console.log("")}
                    toastError={{
                      variant: 'destructive',
                      title: 'Nie udało się wykonać polecenia.',
                      description: 'Spróbuj ponownie później.',
                    }}
                    toastSucces={{
                      title: 'Komentarz został usunięty',
                      description: '',
                    }}
                    onSuccesCustomFunc={
                      ()=> {deleteKomentarz(komentarz)}
                  }
                  />
                )}
              </CardContent>
            </Card>
          )
        }
        return null
      })}
      </div>
    </div>
  )
}
