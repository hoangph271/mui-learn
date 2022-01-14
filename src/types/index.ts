import { FC } from 'react'

export type StyledFC<T = {}> = FC<T & { className?: string }>
