import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import SpinnerLoading from './basicComponents/SpinnerLoading'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
export function formatDate(dateString) {
  const date = new Date(dateString)

  const day = String(date.getUTCDate()).padStart(2, '0') // Ensures two digits
  const month = String(date.getUTCMonth() + 1).padStart(2, '0') // Months are zero-indexed
  const year = date.getUTCFullYear()

  return `${day}.${month}.${year}`
}
export function renderContent({ isLoading, loadingMess, isError, errorMess, data, renderData }) {
  if (isLoading) {
    return (
      <div className='flex justify-center items-center w-full h-full'>
        <SpinnerLoading />
      </div>
    )
  }

  if (isError) {
    return (
      <div className='flex justify-center items-center w-full h-full'>
        <h1>{errorMess !== null || (undefined && errorMess)}</h1>
      </div>
    )
  }

  if (data) {
    return renderData(data)
  }
}
