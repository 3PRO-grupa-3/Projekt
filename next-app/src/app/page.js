'use client'
import { useUser } from '@/hooks/useUser'
import SpinnerLoading from '@/lib/basicComponents/SpinnerLoading'
import { pocketbase } from '@/lib/pocketbase'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  // console.log(pocketbase);
  const { user } = useUser()

  const {
    data: adminList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['adminList'],
    queryFn: () => getAdminList(),
    initialData: [],
    enabled: user === 'admin',
  })

  // console.log(adminList);

  return (
    <div className='w-full h-[100vh] flex flex-col justify-start items-center pt-14'>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <div className='w-2/3'>
          <h1 className='text-4xl'>{user !== null ? `Witamy, ${user?.imie} ${user?.nazwisko}.` : 'Witamy.'}</h1>
          <p className='mt-4 text-muted-foreground'>Użyj panelu po lewej stronie do nawigacji.</p>
          <div>
            <p className='mt-4 text-muted-foreground'>
              {user?.rola === 'admin' &&
                'Aktualnie posiadasz uprawnienia administratora, ktore pozwalają ci zarządzać zbiórkami i użytkownikami.'}

              {user?.rola === 'uczen' &&
                'Aktualnie posiadasz uprawnienia ucznia, pozwala ci to jedynie na interakcje ze zbiórkami.'}

              {user?.rola === 'obserwator' &&
                'Aktualnie posiadasz uprawnienia obserwatora, pozwala ci to jedynie wyświetlanie informacji.'}

              {user === null && 'Zachęcamy do zalogowania się, aby wpełni korzystać z aplikacji.'}
            </p>
            {user?.rola !== 'admin' && (
              <div>
                <p className='mt-4 text-muted-foreground'>Skontaktuj się z administratorami aby poznać szczegóły.</p>
                {!error ? (
                  <ul className='mt-2 text-muted-foreground'>
                    {adminList?.map((admin) => {
                      return (
                        <li key={admin.id}>
                          - {admin.imie} {admin.nazwisko}
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <p className='text-destructive'>Wystąpił błąd przy wyświetleniu administatorów.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
async function getAdminList() {
  try {
    const record = await pocketbase.collection('users').getFullList({
      sort: 'created',
      filter: pocketbase.filter(`rola ~ {:rola}`, {
        rola: 'admin',
      }),
    })
    return record
  } catch (error) {
    throw new Error(error)
  }
}
