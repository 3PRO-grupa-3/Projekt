'use client'

import { useQuery } from '@tanstack/react-query'
import { getProblems } from './data-acces'
import Problem from './Problem'
import { useEffect, useState } from 'react'
import FilterProblems from './FilterProblems'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import PageTitle from '@/lib/basicComponents/PageTitle'
import { renderContent } from '@/lib/utils'

export default function page() {
  const router = useRouter()
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      // console.log(user?.rola);
      if (user?.rola !== 'admin') {
        router.push('/')
      }
    }
  }, [user, router])

  const [problems, setProblems] = useState([])
  const {
    data: problemsList,
    isLoading,
    isError,
    isSuccess,
    isRefetching,
  } = useQuery({
    queryKey: ['problemList'],
    queryFn: () => getProblems(),
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
        <PageTitle
          title='Problemy'
          description='Zarządzaj i rozwiązuj zgłoszone przez użytkowników problemy dotyczące zbiórek.'
        />
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
