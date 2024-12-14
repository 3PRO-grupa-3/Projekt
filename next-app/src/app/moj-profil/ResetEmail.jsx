'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUser } from '@/hooks/useUser'
import React from 'react'

export default function ResetEmail() {
  const { user } = useUser()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>zmień email</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>zmień email</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4s'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Podaj email:
            </Label>
            <Input defaultValue={user?.email} id='name' className='col-span-3' />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Zapisz</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
