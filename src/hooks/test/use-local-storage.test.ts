import { act, renderHook } from '@testing-library/react'

import { useLocalStorage } from '../use-local-storage'

describe('local storage', () => {
  it('should set initial value', () => {
    const initialValue = { isExist: true }

    const { result } = renderHook(() => useLocalStorage('key', initialValue))

    expect(result.current[0]).toEqual(initialValue)
  })

  it('should change value when value updated', () => {
    const { result } = renderHook(() =>
      useLocalStorage('key', { isExist: false })
    )

    act(() => result.current[1]({ isExist: true }))

    expect(result.current[0]).toEqual({ isExist: true })
  })
})
