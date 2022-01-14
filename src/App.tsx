import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import useSWR from 'swr'
import { NonStopWatch } from './components/NonStopWatch'
import type { StyledFC } from './types'

type Error = string

type PaidEntry = {
  name: string,
  date: string,
  amountUsd: number,
  amount: number
}
type CoinStats = {
  prices: Record<string, number>
  usdPrice: number
  totalHave: number
  totalSpent: number
  paids: Record<string, PaidEntry[]>
}

const apiFetcher = (url: string) => {
  return fetch(`http://localhost:3000${url}`)
    .then(res => res.json())
}

const useApiGet = <T extends unknown>(url: string) => {
  const { data, error } = useSWR<T, Error>(url, apiFetcher)

  return {
    isLoading: !(data || error),
    data,
    error
  }
}

const PortfolioSummary: StyledFC = () => {
  const { isLoading, data } = useApiGet<CoinStats>('/api/coins')

  return isLoading ? (
    <div>
      {'...!'}
    </div>
  ) : (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )
}

const App: StyledFC = (props) => {
  const { className } = props

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioSummary />} />
        <Route path="*" element={(
          <div className={className} data-testid="App">
            <NonStopWatch />
          </div>
        )} />
      </Routes>
    </Router>
  )
}

const StyledApp = styled(App)`
  font-family: 'Courier New', Courier, monospace;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(background.jpg);
  background-size: cover;
`

export default StyledApp
