import { Button } from '@/components/ui/button'

import { useUser } from '@/hooks/useUser'
import ConfirmationAlert from '@/lib/basicComponents/ConfirmationAlert'
import InputWithLabel from '@/lib/basicComponents/InputWithLabel'
import React, { useEffect, useState } from 'react'

export default function EdytujDane() {
  const { user } = useUser()
  const [newCredentials, setNewCredentials] = useState({
    imie: '',
    nazwisko: '',
  })

  function setDefaultCredentails() {
    setNewCredentials({
      imie: user.imie,
      nazwisko: user.nazwisko,
    })
  }
  useEffect(() => {
    if (user) {
      setDefaultCredentails()
    }
  }, [user])

  return (
    <div className='w-2/3 flex flex-col gap-2 justify-center items-center '>
      <div className='w-1/3 flex justify-start items-center'>
        <h1 className='text-2xl'>Edytuj swoje dane</h1>
      </div>

      <div className='w-1/3 flex flex-col gap-4 mt-4'>
        <InputWithLabel
          inputType='text'
          labelText='Imię'
          datafield='imie'
          inputValue={newCredentials}
          dataSetter={setNewCredentials}
        />
        <InputWithLabel
          inputType='text'
          labelText='Nazwisko'
          datafield='nazwisko'
          inputValue={newCredentials}
          dataSetter={setNewCredentials}
        />
      </div>
      <div className='w-1/3 flex justify-between items-center'>
        <Button variant='outline' onClick={setDefaultCredentails}>
          Wyczyść zmiany
        </Button>
        {newCredentials?.imie !== user?.imie ||
          (newCredentials?.nazwisko !== user?.nazwisko && (
            <ConfirmationAlert
              message={`Czy napewno chcesz zaktualizować swoje dane?`}
              description={'Zaktualizowanie swoich danych spowoduje wylogowanie z aplikacji.'}
              cancelText={'Powrót'}
              triggerElement={<Button>Zaktualizuj dane</Button>}
              mutationFn={() => console.log('zaktualizuj dane')}
              toastError={{
                variant: 'destructive',
                title: 'Nie udało się zaktualizować danych.',
                description: 'Spróbuj ponownie później.',
              }}
              toastSucces={{
                title: `Pomyślnie zaktualizowano dane.`,
                description: '',
              }}
              onSuccesCustomFunc={() => console.log('a')}
            />
          ))}
      </div>
    </div>
  )
}
