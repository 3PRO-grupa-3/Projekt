'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { login, register } from '../data-acces'
import { pocketbase, user } from '@/lib/pocketbase'
import { useRouter } from 'next/navigation'
import SpinnerLoading from '@/lib/basicComponents/SpinnerLoading'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { renderContent } from '@/lib/utils'
import InputWithLabel from '@/lib/basicComponents/InputWithLabel'
export default function page() {
  const router = useRouter()
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    imie: '',
    nazwisko: '',
  })

  useEffect(() => {
    pocketbase.authStore?.isValid && router.push('/lista-zbiorek')
  }, [])

  const loginMutation = useMutation({
    mutationFn: async () => {
      await login({
        email: registerData.email,
        password: registerData.password,
      })
    },
    onError: (error) => {
      console.log('Error occurred:', error)
    },
    onSuccess: () => {
      // console.log('mutation worked')
      router.push('/lista-zbiorek')
    },
  })
  // react query mutation
  // https://tanstack.com/query/latest/docs/framework/react/reference/useMutation
  const registerMutation = useMutation({
    mutationFn: async () => {
      await register(registerData)
    },
    onError: (error) => {
      console.log('Error occurred:', error)
    },
    onSuccess: async () => {
      // console.log('mutation worked')
      router.push('/lista-zbiorek')

      await loginMutation.mutateAsync()
    },
  })

  if (loginMutation.isPending || registerMutation.isPending) {
    return (
      <div className='w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
        <SpinnerLoading />
      </div>
    )
  }

  return (
    <div className='w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
      <div className='flex flex-col gap-4 w-1/5'>
        <div className='flex justify-center items-center'>
          {loginMutation.isLoading && <SpinnerLoading />}

          <h1 className='text-3xl'>Zarejestruj się</h1>
        </div>

        <div className='flex flex-col gap-4'>
          <InputWithLabel
            inputType={'text'}
            labelText={'Email'}
            datafield={'email'}
            inputValue={registerData}
            dataSetter={setRegisterData}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <InputWithLabel
            inputType={'password'}
            labelText={'Hasło'}
            datafield={'password'}
            inputValue={registerData}
            dataSetter={setRegisterData}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <InputWithLabel
            inputType={'text'}
            labelText={'Imię'}
            datafield={'imie'}
            inputValue={registerData}
            dataSetter={setRegisterData}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <InputWithLabel
            inputType={'text'}
            labelText={'Nazwisko'}
            datafield={'nazwisko'}
            inputValue={registerData}
            dataSetter={setRegisterData}
          />
        </div>

        <div className='flex flex-col'>
          <div className='flex justify-center items-center flex-row'>
            {registerMutation.isError && <p className='text-destructive'>Wystąpił błąd podczas logowania.</p>}
          </div>
          <div className='w-full mt-4 flex justify-end items-end'>
            <Button
              onClick={async () => {
                await registerMutation.mutateAsync()
              }}
            >
              Zarejestruj się
            </Button>
          </div>
        </div>

        <div className='flex flex-col justify-center items-center '>
          <h2>Posiadasz konto?</h2>
          <Link href={'/auth/login'}>
            <h1 className='underline'>Zaloguj się.</h1>
          </Link>
        </div>
      </div>
    </div>
  )
}
