import { Button } from '@/components/ui/button'
import ConfirmationAlert from '@/lib/basicComponents/ConfirmationAlert'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UserRoundPen } from 'lucide-react'
import React from 'react'
import { przelaczNaAdmina } from './data-acces'

export default function NaAdmina({ userId }) {
  const queryClient = useQueryClient()

  const przelaczNaAdminaMutation = useMutation({
    mutationFn: () => przelaczNaAdmina(userId),
    onSuccess: () => {
      console.log('mutacja')
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return (
    <ConfirmationAlert
      message={'Czy napewno chcesz przełączyć tego użytkownika na administratora?'}
      description={
        'Administrator może wykonać dowolne operacje na zbiorkach, zarządzać użytkownikami, rozwiązywać problemy.'
      }
      cancelText={'Powrót'}
      triggerElement={
        <Button variant='destructive'>
          Przełącz na administratora <UserRoundPen />
        </Button>
      }
      mutationFn={() => przelaczNaAdminaMutation.mutateAsync()}
      toastError={{
        variant: 'destructive',
        title: 'Nie udało się wykonać polecenia.',
        description: 'Spróbuj ponownie później.',
      }}
      toastSucces={{
        title: 'Uczeń został dodany do zbiórki',
        description: '',
      }}
      onSuccesCustomFunc={() => queryClient.invalidateQueries({ queryKey: ['listOfUsers'] })}
    />
  )
}
