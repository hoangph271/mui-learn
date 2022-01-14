import { Box, Chip, CircularProgress, Container, CssBaseline, Typography } from '@mui/material'
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

const formatUsd = (amount: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  return formatter.format(amount)
}

const CoinsList: StyledFC<{
  coinStats: CoinStats
}> = (props) => {
  const { coinStats } = props
  const coinNames = Object.keys(coinStats.paids)

  return (
    <Box sx={{
      '&': {
        display: 'flex',
        justifyContent: 'space-evenly',
        maxWidth: '100%',
        flexWrap: 'wrap'
      }
    }}>
      {coinNames.map(coinName => {
        const paids = coinStats.paids[coinName]
        const price = coinStats.prices[coinName]

        const totalSpent = paids.reduce((prev, val) => prev + val.amountUsd, 0)
        const totalCoins = paids.reduce((prev, val) => prev + val.amount, 0)
        const totalHave = totalCoins * price
        const isRed = totalSpent > totalHave

        return (
          <Chip
            variant="outlined"
            sx={{ m: 0.5 }}
            key={coinName}
            label={coinName}
            color={isRed ? 'error' : 'success'}
          />
        )
      })}
    </Box>
  )
}

const PortfolioSummary: StyledFC = () => {
  const { isLoading, data: coinStats } = useApiGet<CoinStats>('/api/coins')

  if (isLoading) {
    return (
      <Container sx={{ mx: 'auto', width: 200, my: 2 }}>
        <CircularProgress />
      </Container>
    )
  }

  const netGain = coinStats!.totalHave - coinStats!.totalSpent
  const ratioGain = coinStats!.totalHave / coinStats!.totalSpent

  return (
    <Container maxWidth="sm" sx={{ my: 2 }}>
      <Box>
        <Box>
        <span>{'You spent '}</span>
          <span>{formatUsd(coinStats!.totalSpent)}</span>
          <span>{` on ${Object.keys(coinStats!.prices).length} cryptos...!`}</span>
        </Box>
        <Box sx={{ mb: 1 }}>
          <span>
            {`You ${netGain > 0 ? 'earned ' : 'lost '}`}
          </span>
          <Typography component="span" color={netGain > 0 ? 'green' : 'red'}>
            {`${formatUsd(Math.abs(netGain))}, `}
          </Typography>
          <span>{' that\'s '}</span>
          <Typography component="span" color={netGain > 0 ? 'green' : 'red'}>
            {`${Math.round(ratioGain * 100)}%`}
          </Typography>
          <span>{'...!'}</span>
        </Box>
      </Box>
      <CoinsList coinStats={coinStats as CoinStats} />
    </Container>
  )
}

const App: StyledFC = (props) => {
  const { className } = props

  return (
    <Router>
      <CssBaseline />
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
