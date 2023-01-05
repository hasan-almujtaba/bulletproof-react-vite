import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Store } from '~/types'
import { createBearSlice } from './bear'
import { createFishSlice } from './fish'

/**
 * Create Store
 * @see https://github.com/pmndrs/zustand/blob/main/docs/typescript.md#interdependent-slices-pattern
 */
export const store = create<Store>()(
  devtools(
    persist(
      (...a) => ({
        ...createBearSlice(...a),
        ...createFishSlice(...a),
      }),
      {
        name: 'zustand',
      }
    )
  )
)
