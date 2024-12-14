import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getWplaty } from '../data-acces'
import Wplata from './Wplata'
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { renderContent } from '@/lib/utils'

export default function HistoriaWplat() {
  const {
    data: wplaty,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['listaWplat'],
    queryFn: () => getWplaty(),
  })

  return renderContent({
    isLoading,
    loadingMess: null,
    isError,
    errorMess: null,
    data: wplaty,
    renderData: (wplaty) => (
      <div className='flex flex-row w-2/3'>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Tytuł zbiórki</TableHead>
              <TableHead>Wpłata</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wplaty?.map((wplata) => (
              <Wplata key={wplata.id} wplata={wplata} />
            ))}
          </TableBody>
        </Table>
      </div>
    ),
  })
}
