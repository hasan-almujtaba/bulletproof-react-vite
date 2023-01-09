import clsx from 'clsx'
import { ElementType, forwardRef } from 'react'

import { PolymorphicRef } from '~/types'

import { ButtonComponent, ButtonProps } from './type'

export const Button: ButtonComponent = forwardRef(function Button<
  C extends ElementType
>(props: ButtonProps<C>, reference: PolymorphicRef<C>) {
  const {
    as,
    children,
    className,
    variant = 'filled',
    colorScheme = 'primary',
    ...rest
  } = props

  const Component = as || 'button'

  const textWrapper = (
    <span className="relative inset-0 rounded-[inherit] bg-white px-5 py-2.5 transition-colors hover:text-white group-hover:bg-opacity-0">
      {children}
    </span>
  )

  return (
    <Component
      ref={reference}
      {...rest}
      className={clsx(
        className ?? undefined,
        'group',
        `btn btn-${variant} btn-${colorScheme}`
      )}
    >
      {variant === 'outlined' ? textWrapper : children}
    </Component>
  )
})
