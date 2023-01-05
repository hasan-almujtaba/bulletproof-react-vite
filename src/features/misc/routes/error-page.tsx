import React from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export const ErrorPage = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error) && error.status === 404)
    return (
      <div>
        <h1>{error.status}</h1>
        <div>Page not found</div>
      </div>
    )

  return <div>Something went wrong</div>
}
