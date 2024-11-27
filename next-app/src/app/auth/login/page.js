'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { login } from '../data-acces'
import { pocketbase, user } from '@/lib/pocketbase'
import { useRouter } from 'next/navigation'
import SpinnerLoading from '@/lib/basicComponents/SpinnerLoading'
import Link from 'next/link'

export default function page() {
  const router = useRouter()
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    pocketbase.authStore?.isValid && router.push('/lista-zbiorek')
  }, [])

  // react query mutation
  // https://tanstack.com/query/latest/docs/framework/react/reference/useMutation
  const loginMutation = useMutation({
    mutationFn: async () => {
      await login(loginData)
    },
    onError: (error) => {
      console.log('Error occurred:', error)
    },
    onSuccess: () => {
      // console.log('mutation worked')
      router.push('/lista-zbiorek')
    },
  })

  return (
    <div>
      {loginMutation.isLoading && <SpinnerLoading />}

      {loginMutation.isError && <p>Wystąpił błąd podczas logowania.</p>}
      <h1>Zaloguj się</h1>
      <Input value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
      <Input value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />

      <Button
        onClick={async () => {
          await loginMutation.mutateAsync()
        }}
      >
        Zaloguj się
      </Button>

      <Link href={'/auth/register'}>
        <h1 className='underline'>Zarejetruj się.</h1>
      </Link>
    </div>
  )
}
