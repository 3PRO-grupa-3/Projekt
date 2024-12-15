'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUser } from '@/hooks/useUser'
import PageTitle from '@/lib/basicComponents/PageTitle'
import React from 'react'

export default function ResetEmail() {
  const { user } = useUser()
  return (
    <div className='w-2/3 flex flex-col gap-2 justify-start items-start '>
      <PageTitle title='Email' description='Zmień swój aktualny email.' />
    </div>
  )
}
