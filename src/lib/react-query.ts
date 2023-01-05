import { DefaultOptions, QueryClient } from '@tanstack/react-query'

const queryConfig: DefaultOptions = {
  queries: {
    retry: false,
    refetchOnWindowFocus: false,
  },
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })
