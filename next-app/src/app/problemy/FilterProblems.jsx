import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEffect, useState } from 'react'

export default function FilterProblems({ setProblems, problemList }) {
  const [filter, setFilter] = useState('Wszystkie')

  useEffect(() => {
    // console.log(filter);
    setProblems(() => {
      if (filter === 'Wszystkie') {
        return problemList
      } else if (filter === 'Wykonano') {
        return problemList.filter((problem) => problem.wykonano === true)
      } else if (filter === 'Do zrobienia') {
        return problemList.filter((problem) => problem.wykonano === false)
      }
    })
  }, [filter])

  return (
    <div className='pt-14 w-2/3 flex flex-row justify-between items-center'>
      <Select value='filter' onValueChange={setFilter}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue>{filter}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='Wszystkie'>Wszystkie</SelectItem>
          <SelectItem value='Wykonano'>Wykonano</SelectItem>
          <SelectItem value='Do zrobienia'>Do zrobienia</SelectItem>
        </SelectContent>
      </Select>

      <Button disabled>Sort po dacie (todo)</Button>
    </div>
  )
}
