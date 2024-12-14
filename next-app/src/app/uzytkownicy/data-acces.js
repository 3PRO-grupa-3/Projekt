import { useUser } from '@/hooks/useUser'
import { pocketbase } from '@/lib/pocketbase'

export async function getUsers() {
  try {
    const records = await pocketbase.collection('users').getFullList({
      sort: '-created',
    })
    return records
  } catch (error) {
    throw new Error(error)
  }
}
export async function zmienUprawnienia(user, naKogo) {
  try {
    // console.log(pocketbase.collection('users'))

    const record = await pocketbase.collection('users').update(user.id, { ...user, rola: naKogo })
  } catch (error) {
    throw new Error(error)
  }
}

export async function usunUzytkownika(user) {
  try {
    console.log(user.id)
    await pocketbase.collection('users').delete(user.id)
  } catch (error) {
    throw new Error(error)
  }
}
