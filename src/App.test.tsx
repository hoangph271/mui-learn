import { render, screen } from '@testing-library/react'
import App from './App'

test('renders #App', () => {
  render(<App />)

  const appEl = screen.queryByTestId('App')

  expect(appEl).toBeInTheDocument()
})
