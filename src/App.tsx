import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import { NonStopWatch } from './components/NonStopWatch'
import type { StyledFC } from './types'

const PortfolioSummary: StyledFC = () => {
  return (
    <div>
      {'PortfolioSummary'}
    </div>
  )
}

const App: StyledFC = (props) => {
  const { className } = props

  return (
    <Router>
      <div className={className} data-testid="App">
        <Routes>
          <Route path="/" element={<PortfolioSummary />} />
          <Route path="*" element={<NonStopWatch />} />
        </Routes>
      </div>
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
