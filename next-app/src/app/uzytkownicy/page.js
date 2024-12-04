'use client'
import React from 'react'
import { getUsers } from './data-acces'
import { useQuery } from '@tanstack/react-query'
import UsersTable from './UsersTable'
import SearchTable from './SearchTable'

export default function page() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['listOfUsers'],
    queryFn: () => getUsers(),
  })

  return (
    <div className='w-full h-[100vh] flex flex-col justify-start items-center pt-14'>
      {isLoading && <div>loading...</div>}
      {error && <div>error</div>}
      <div className='w-2/3'>
        <div className='flex flex-row justify-start items-center'>
          <h1 className='text-4xl'>Użytkownicy</h1>
        </div>
        <div className='mt-4 text-muted-foreground'>
          <p>Użyj tabeli poniżej aby zarządzaj uprawnieniami użytkowników</p>
        </div>
      </div>
      <SearchTable users={users} />
    </div>
  )
}
