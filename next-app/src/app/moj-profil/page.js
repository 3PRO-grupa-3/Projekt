'use client'
import HistoriaWplat from './wplaty/HistoriaWplat'
import EdytujDane from './EdytujDane'
import ResetHaslo from './ResetHaslo'
import ResetEmail from './ResetEmail'
import PageTitle from '@/lib/basicComponents/PageTitle'

export default function Page() {
  return (
    <div className='w-full h-[100vh] flex flex-col justify-start items-center pt-14 gap-10'>
      <PageTitle title='Ustawienia' description='Ustawienia twojego konta.' />

      <div className='w-full flex  gap-4 justify-center items-center'>
        <EdytujDane />
      </div>
      <ResetHaslo />
      <ResetEmail />
      <HistoriaWplat />
    </div>
  )
}
