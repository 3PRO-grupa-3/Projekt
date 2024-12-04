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
export async function przelaczNaUcznia(userId) {
  try {
    console.log(pocketbase.collection('<correct_collection_name>'))

    const record = await pocketbase.collection('users').update(userId, { typ: 'uczen' })
  } catch (error) {
    throw new Error(error)
  }
}
export async function przelaczNaAdmina(userId) {
  try {
    console.log(userId)
    const record = await pocketbase.collection('users').update(userId, { typ: 'admin' })
    console.log(record)
  } catch (error) {
    throw new Error(error)
  }
}
