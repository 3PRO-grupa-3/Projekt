'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ConfirmationAlert from '@/lib/basicComponents/ConfirmationAlert'
import SpinnerLoading from '@/lib/basicComponents/SpinnerLoading'
import { ClipboardCheck } from 'lucide-react'
import { useUser } from '@/hooks/useUser'
import UsunProblem from './UsunProblem'
import { pocketbase } from '@/lib/pocketbase'

export default function Problem({ problem, isRefetching }) {
  const { user } = useUser()
  const queryClient = useQueryClient()

  // Define the mutation to mark the problem as completed
  const mutation = useMutation({
    mutationFn: async () => await wykonano(problem),
    onSuccess: async () => {
      await queryClient.invalidateQueries('problemList')
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return (
    <Card className='w-full border-none'>
      <CardHeader>
        <CardTitle>
          {problem.imieUcznia} {problem.nazwiskoUcznia}
        </CardTitle>
        <CardDescription>{formatDate(problem.data_utworzenia)}</CardDescription>
      </CardHeader>

      <CardContent className='overflow-hidden'>
        <div className='flex flex-col break-words'>
          <p className='whitespace-pre-wrap break-words'>{problem.tresc}</p>
        </div>
      </CardContent>

      <CardFooter className='flex flex-row justify-end'>
        {isRefetching ? (
          <SpinnerLoading />
        ) : user?.rola === 'admin' ? (
          <div className='flex flex-row gap-2'>
            <UsunProblem problem={problem} />

            <ConfirmationAlert
              message={
                !problem.wykonano ? 'Czy napewno problem został rozwiązany?' : 'Czy chcesz anulować wykonanie problemu?'
              }
              description={''}
              cancelText={'Powrót'}
              triggerElement={
                !problem.wykonano ? (
                  <Button>
                    Wykonano <ClipboardCheck />
                  </Button>
                ) : (
                  <Button variant='outline'>Anuluj wykonanie</Button>
                )
              }
              mutationFn={() => mutation.mutateAsync()}
              toastError={{
                variant: 'destructive',
                title: 'Nie udało się wykonać operacji.',
                description: 'Spróbuj ponownie później.',
              }}
              toastSucces={
                !problem.wykonano
                  ? {
                      title: `Wykonano problem.`,
                      description: '',
                    }
                  : {
                      title: `Anulowanie wykonania problemu.`,
                      description: '',
                    }
              }
            />
          </div>
        ) : (
          <div className='flex flex-row gap-2'>
            <UsunProblem problem={problem} />
            <Button disabled>{problem.wykonano ? 'Rozwiązano' : 'Nie rozwiązano'}</Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
async function wykonano(problem) {
  try {
    const record = await pocketbase
      .collection('problemy')
      .update(problem.id, { ...problem, wykonano: !problem.wykonano })
  } catch (error) {
    throw new Error(error)
  }
}
