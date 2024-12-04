import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import NaUcznia from './NaUcznia'
import NaAdmina from './NaAdmina'

export default function UsersTable({ results }) {
  return (
    <Table>
      <TableCaption>Lista wszystkich zalogowanych użytkowników.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className=''>Imię</TableHead>
          <TableHead>Nazwisko</TableHead>
          <TableHead>Uprawnienia</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results?.map((result) => {
          return (
            <TableRow key={result.id}>
              <TableCell className='text-xl'>{result.imie}</TableCell>
              <TableCell className='text-xl'>{result.nazwisko}</TableCell>
              <TableCell className='text-xl'>{result.typ}</TableCell>
              <TableCell className='text-xl'>
                {result.typ === 'admin' ? <NaUcznia userId={result.id} /> : <NaAdmina userId={result.id} />}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
