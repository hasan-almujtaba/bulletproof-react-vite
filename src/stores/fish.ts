import { FishSlice, StoreCreator } from '~/types'

/**
 * Create independent slice
 * @param set - Set new value
 * @param get - Get value from store
 */
export const createFishSlice: StoreCreator<FishSlice> = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
})
