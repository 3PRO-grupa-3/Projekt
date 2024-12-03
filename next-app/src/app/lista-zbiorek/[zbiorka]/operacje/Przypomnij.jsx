import { Button } from '@/components/ui/button'
import ConfirmationAlert from '@/lib/basicComponents/ConfirmationAlert'
import React from 'react'

export default function Przypomnij({ mutation }) {
  return (
    <ConfirmationAlert
      message={'Czy napewno chcesz wysłać powiadomienie o zbiórce?'}
      cancelText={'Powrót'}
      triggerElement={<Button>Przypomnij o zbiórce</Button>}
      mutationFn={() => mutation.mutate('przypomnijZbiorka')}
      toastError={{
        variant: 'destructive',
        title: 'Nie udało się wykonać polecenia.',
        description: 'Spróbuj ponownie później.',
      }}
      toastSucces={{
        title: 'Przypomnienie zostało wysłane',
        description: '',
      }}
    />
  )
}
