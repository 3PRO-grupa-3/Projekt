'use client'
import { useQuery } from '@tanstack/react-query'
import Problem from './Problem'
import { useEffect, useState } from 'react'
import FilterProblems from './FilterProblems'
import PageTitle from '@/lib/basicComponents/PageTitle'
import { renderContent } from '@/lib/utils'
import { useUser } from '@/hooks/useUser'
import { pocketbase } from '@/lib/pocketbase'

export default function page() {
  const { user } = useUser()
  const [problems, setProblems] = useState([])
  const {
    data: problemsList,
    isLoading,
    isError,
    isSuccess,
    isRefetching,
  } = useQuery({
    queryKey: ['problemList'],
    queryFn: async () => await getProblems(user),
  })

  useEffect(() => {
    if (isSuccess) {
      setProblems(problemsList)
    }
  }, [isSuccess, problemsList])
  // console.log(problemsList);

  return renderContent({
    isLoading,
    isError,
    data: { problems, problemsList, setProblems },
    renderData: ({ problems, problemsList, setProblems }) => (
      <div className='w-full flex flex-col justify-center items-center pt-14 pb-14'>
        {user?.rola === 'admin' ? (
          <PageTitle
            title='Problemy'
            description='Zarządzaj i rozwiązuj zgłoszone przez użytkowników problemy dotyczące zbiórek.'
          />
        ) : (
          <PageTitle title='Moje problemy' description='Przeglądaj swoje zgłoszone problemy.' />
        )}
        <FilterProblems setProblems={setProblems} problemList={problemsList} />
        <div className='w-2/3 flex flex-col justify-center items-center mt-8 gap-8'>
          {problems?.length === 0 ? (
            <h1>Brak problemów.</h1>
          ) : (
            problems?.map((problem) => <Problem key={problem.id} problem={problem} isRefetching={isRefetching} />)
          )}
        </div>
      </div>
    ),
  })
}
async function getProblems(user) {
  pocketbase.autoCancellation(false)

  try {
    let problemsList
    if (user?.rola === 'admin') {
      problemsList = await pocketbase.collection('problemy').getFullList({
        sort: '-data_utworzenia',
      })
    } else if (user?.rola === 'uczen') {
      problemsList = await pocketbase.collection('problemy').getFullList({
        sort: '-data_utworzenia',
        filter: pocketbase.filter(`id_ucznia ~ {:id_usera}`, {
          id_usera: user.id,
        }),
      })
    }
    // Use Promise.all to handle async operations for each problem
    const problemsWithDetails = await Promise.all(
      problemsList.map(async (problem) => {
        // console.log("loop");

        // Fetch Zbiorka and user details for each problem
        const zbiorkaProblemu = await pocketbase.collection('Zbiorki').getOne(problem.id_zbiorki)

        problem.tytulZbiorki = zbiorkaProblemu.Tytul

        const uczenProblemu = await pocketbase.collection('users').getOne(problem.id_ucznia)

        problem.imieUcznia = uczenProblemu.imie
        problem.nazwiskoUcznia = uczenProblemu.nazwisko

        return problem
      })
    )
    // console.log(problemsWithDetails);

    pocketbase.autoCancellation(true)

    return problemsWithDetails
  } catch (error) {
    console.log(error)

    throw new Error(error)
  }
}
