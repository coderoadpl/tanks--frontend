import React from 'react'
import { io } from 'socket.io-client'

import WelcomeScreen from './components/WelcomeScreen'

import { ThemeProvider, createTheme } from '@mui/material'

// eslint-disable-next-line no-unused-vars
const socket = io(process.env.REACT_APP_SOCKET_URL, { secure: true, autoConnect: false })

export const App = () => {
  const connectionRef = React.useRef(null)
  const [errorMessage, setErrorMessage] = React.useState(null)
  const [gameId, setGameId] = React.useState(null)

  const onJoinClick = React.useCallback(async (gameId) => {
    setErrorMessage(null)
    const response = await fetch(process.env.REACT_APP_API_URL + '/join', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ gameId, connectionId: connectionRef.current })
    })
    const data = await response.json()
    if (data.error) {
      setErrorMessage(data.error)
      return
    }
    setGameId(data.gameId)
  }, [])

  const onNewGameClick = React.useCallback(async () => {
    setErrorMessage(null)
    const response = await fetch(process.env.REACT_APP_API_URL + '/new', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ connectionId: connectionRef.current })
    })
    const data = await response.json()
    setGameId(data.gameId)
  }, [])

  console.log(gameId)

  return (
    <ThemeProvider
      theme={createTheme({ palette: { primary: { main: '#000' } } })}
    >
      <WelcomeScreen
        errorMessage={errorMessage}
        onJoinClick={onJoinClick}
        onNewGameClick={onNewGameClick}
      />
    </ThemeProvider>
  )
}

export default App
