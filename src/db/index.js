import Fuse from 'fuse.js'

const localData = require('../db/data.json')
const fuseIndex = require('../db/fuse-index.json')
const numIndex = require('../db/num_index.json')
const myIndex = Fuse.parseIndex(fuseIndex)
const localDataFuse = generateFuseIndexFromLocalDb()

const fuse = createFuseDb(localData.items, myIndex)

function createFuseDb(data, index) {
  return new Fuse(
    data,
    {
      keys: ['attributes.value', 'attributes.trait_type', 'num', 'sale_status'],
      useExtendedSearch: true,
      tokenize: true,
    },
    index && index
  )
}

function getQuery(state) {
  const { bg, clothes, earring, eyes, fur, hat, mouth, id } = state
  let query = ''
  if (bg) {
    query += `="${bg}" | `
  }
  if (clothes) {
    query += `="${clothes}" | `
  }
  if (earring) {
    query += `="${earring}" | `
  }
  if (eyes) {
    query += `="${eyes}" | `
  }
  if (fur) {
    query += `="${fur}" | `
  }
  if (hat) {
    query += `="${hat}" | `
  }
  if (mouth) {
    query += `="${mouth}" | `
  }

  // remove pipe
  query = query.slice(0, -3)

  return query
}

function idIsValid(id) {
  for (let i = 0; i < id.length; i++) {
    if (id !== '') {
      return true
    }
  }
  return false
}

function generateFuseIndexFromLocalDb() {
  return localData.items.map((ape) => {
    return { item: ape }
  })
}

export function getApes(
  state,
  currentViewFuse = {},
  useNonDefaultFuse = false
) {
  if (useNonDefaultFuse) {
    return currentViewFuse.search(getQuery(state))
  } else {
    return fuse.search(getQuery(state))
  }
}

export function getAllApes() {
  return localDataFuse
}

export function getApeByID(id) {
  return localData.items.find((ape) => ape.num === parseInt(id))
}

export function createNewFuseDbFromApeIds(apes) {
  const apeDataMergedWithLocal = apes.map((ape) => {
    if (ape.phunkyApeId) {
      return {
        ...numIndex[ape.phunkyApeId],
        ...ape,
        goat: 'goat', // random string to get all data easier lol. probably a better way to do this.
      }
    } else if (ape.id) {
      // This is for listed price as it doesn't have phunkyApeId in the schema.
      const phunkyApeId = parseInt(ape.id)
      return {
        ...numIndex[phunkyApeId],
        ...ape,
        goat: 'goat',
        phunkyApeId: phunkyApeId,
      }
    }
  })
  return createFuseDb(apeDataMergedWithLocal)
}
