import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { queryClient } from './lib/react-query'
import router from './routes'

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </QueryClientProvider>
  )
}

export default App
