import { BearSlice, StoreCreator } from '~/types'

/**
 * Create independent slice
 * @param set - Set new value
 * @param get - Get value from store
 */
export const createBearSlice: StoreCreator<BearSlice> = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
})
