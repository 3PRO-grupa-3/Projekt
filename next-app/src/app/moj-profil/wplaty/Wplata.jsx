import { useQuery } from '@tanstack/react-query'
import { getTitleFromWplata } from '../data-acces'
import { formatDate } from '@/lib/utils'
import { TableCell, TableRow } from '@/components/ui/table'
import SpinnerLoading from '@/lib/basicComponents/SpinnerLoading'

export default function Wplata({ wplata }) {
  const {
    data: zbiorkaWplaty,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['tytulZbiorki', `${wplata.id_zbiorki}`],
    queryFn: () => getTitleFromWplata(wplata.id_zbiorki),

    refetchOnWindowFocus: false, // Disable refetching when window is refocused
  })

  return (
    <>
      <TableRow>
        <TableCell className='text-xl'>
          {isLoading ? <SpinnerLoading /> : isError ? 'Błąd' : wplata !== null && formatDate(wplata.data_utworzenia)}
        </TableCell>
        <TableCell className='text-xl'>
          {isLoading ? <SpinnerLoading /> : isError ? 'Błąd' : zbiorkaWplaty !== undefined && zbiorkaWplaty[0].Tytul}
        </TableCell>
        <TableCell className='text-xl'>{isError ? 'Błąd' : wplata !== null && `${wplata.kwota} PLN`} </TableCell>
      </TableRow>
    </>
  )
}
