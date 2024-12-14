import { pocketbase } from '@/lib/pocketbase'

export async function getWplaty() {
  try {
    const records = await pocketbase.collection('wplaty').getFullList({
      sort: 'data_utworzenia',
    })
    return records
  } catch (error) {
    throw new Error(error)
  }
}
export async function getTitleFromWplata(idZbiorki) {
  // console.log(idZbiorki);

  try {
    const records = await pocketbase.collection('Zbiorki').getFullList({
      filter: pocketbase.filter(`id ~ {:idZbiorki}`, {
        idZbiorki: idZbiorki,
      }),
    })

    // console.log(records);

    return records
  } catch (error) {
    throw new Error(error)
  }
}
