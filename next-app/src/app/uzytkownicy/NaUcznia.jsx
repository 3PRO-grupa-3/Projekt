import { Button } from '@/components/ui/button'
import ConfirmationAlert from '@/lib/basicComponents/ConfirmationAlert'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UserRoundPen } from 'lucide-react'
import React from 'react'
import { przelaczNaUcznia } from './data-acces'

export default function NaUcznia({ userId }) {
  const queryClient = useQueryClient()

  const przelaczNaUczniaMutation = useMutation({
    mutationFn: () => przelaczNaUcznia(userId),
    onSuccess: () => {
      console.log('mutacja')
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return (
    <ConfirmationAlert
      message={'Czya napewno chcesz przełączyć tego użytkownika na ucznia?'}
      description={'Uczeń może przeglądać zbiórki, dodawać komentarze i zgłaszać problemy.'}
      cancelText={'Powrót'}
      triggerElement={
        <Button variant='secondary'>
          Przełącz na Ucznia <UserRoundPen />
        </Button>
      }
      mutationFn={() => przelaczNaUczniaMutation.mutateAsync()}
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
