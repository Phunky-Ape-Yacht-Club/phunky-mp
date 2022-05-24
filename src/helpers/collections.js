export const networkCollections = {
  '0x1': [
    {
      image:
        'https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s130',
      name: 'Phunky Ape Yacht Club',
      addrs: '0x176e0fe17314def59f0f06e976e1b74203be4a55',
    },
  ],
}

export const getCollection = () => networkCollections['0x1'][0]

export const getCollectionsByChain = (chain) => networkCollections[chain]
