import { Button } from '@/components/ui/button'
import ConfirmationAlert from '@/lib/basicComponents/ConfirmationAlert'
import React from 'react'

export default function ZakonczZbiorke({ mutation }) {
  return (
    <ConfirmationAlert
      message={'Czy napewno chcesz zakończyć zbiórkę?'}
      cancelText={'Powrót'}
      triggerElement={<Button>Zakończ zbiórke</Button>}
      mutationFn={() => mutation.mutate('zakonczZbiorke')}
      toastError={{
        variant: 'destructive',
        title: 'Nie udało się wykonać polecenia.',
        description: 'Spróbuj ponownie później.',
      }}
      toastSucces={{
        title: 'Zbiórka została zakończona',
        description: '',
      }}
    />
  )
}
