import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { StyledFC } from '../types'

const NonStopWatch: StyledFC = ({ className }) => {
  const [time, setTime] = useState(new Date().toTimeString())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toTimeString())
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className={className}>
      {time}
    </div>
  )
}

const StyledNonStopWatch = styled(NonStopWatch)`
  display: flex;
  justify-content: center;
  gap: 0.4rem;

  @media only screen and (max-width: 600px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;

    & > * {
      border-radius: 0;

      :nth-child(1) {
        border-top-left-radius: 0.4rem;
      }
      :nth-child(2) {
        border-top-right-radius: 0.4rem;
      }
      :nth-child(3) {
        border-bottom-left-radius: 0.4rem;
      }
      :nth-child(4) {
        border-bottom-right-radius: 0.4rem;
      }
    }
  }
`

export { StyledNonStopWatch as NonStopWatch }
