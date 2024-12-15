'use client'
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import SearchTable from './SearchTable'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import PageTitle from '@/lib/basicComponents/PageTitle'
import { renderContent } from '@/lib/utils'
import { pocketbase } from '@/lib/pocketbase'

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

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['listOfUsers'],
    queryFn: () => getUsers(),
  })

  return renderContent({
    isLoading,
    isError,
    data: users,
    renderData: (users) => (
      <div className='w-full h-[100vh] flex flex-col justify-start items-center pt-14'>
        <PageTitle title='Użytkownicy' description='Użyj tabeli poniżej aby zarządzaj uprawnieniami użytkowników.' />
        <SearchTable users={users} />
      </div>
    ),
  })
}
async function getUsers() {
  try {
    const records = await pocketbase.collection('users').getFullList({
      sort: '-created',
    })
    return records
  } catch (error) {
    throw new Error(error)
  }
}
