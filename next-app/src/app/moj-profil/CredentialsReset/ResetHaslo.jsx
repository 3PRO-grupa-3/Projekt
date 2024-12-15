'use client'
import { Button } from '@/components/ui/button'
import { useUser } from '@/hooks/useUser'
import ConfirmationAlert from '@/lib/basicComponents/ConfirmationAlert'
import PageTitle from '@/lib/basicComponents/PageTitle'
import { pocketbase } from '@/lib/pocketbase'
import React from 'react'

export default function ResetHaslo() {
  const { user } = useUser()
  return (
    <div className='w-2/3 flex flex-col gap-2 justify-start items-start '>
      <PageTitle title='Hasło' description='Nie pamiętasz swojego hasła? Możesz zmienić je tutaj.' />
      <ConfirmationAlert
        message={`Czy napewno chcesz zmienić swoje hasło?`}
        description={`Wyślemy link do zmiany hasła na twój email: ${user?.email}`}
        cancelText={'Powrót'}
        triggerElement={<Button>Zmien</Button>}
        mutationFn={async () => await resetHaslo(user)}
        toastError={{
          variant: 'destructive',
          title: 'Nie udało się wykonać polecenia.',
          description: 'Spróbuj ponownie później.',
        }}
        toastSucces={{
          title: `Sprawdź swoją skrzynkę email, aby zresetować hasło.`,
          description: '',
        }}
        onSuccesCustomFunc={() => console.log('zmien')}
      />
    </div>
  )
}
async function resetHaslo(user) {
  console.log(user)
  try {
    await pocketbase.collection('users').requestPasswordReset(user.email)
  } catch (error) {
    throw new Error(error)
  }
}
