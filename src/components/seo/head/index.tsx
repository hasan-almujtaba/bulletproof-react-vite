import { Helmet } from 'react-helmet-async'

import { HeadProps } from './type'

export const Head = (props: HeadProps) => {
  const { title, description } = props

  return (
    <Helmet>
      <title>{title}</title>
      <meta
        name="description"
        content={description}
      />
    </Helmet>
  )
}
