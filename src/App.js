import React from 'react'
import { io } from 'socket.io-client'

import WelcomeScreen from './components/WelcomeScreen'
import GameEndedOverlay from './components/GameEndedOverlay'

import { ThemeProvider, createTheme } from '@mui/material'

// eslint-disable-next-line no-unused-vars
const socket = io(process.env.REACT_APP_SOCKET_URL, { secure: true, autoConnect: false })

export const App = () => {
  const connectionRef = React.useRef(null)
  const [errorMessage, setErrorMessage] = React.useState(null)
  const [gameId, setGameId] = React.useState(null)
  const [board, setBoard] = React.useState(null)
  const [gameEnded, setGameEnded] = React.useState(false)

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

  const onReplayClick = React.useCallback(async () => {
    setGameEnded(false)
    setGameId(null)
    setBoard(null)
  }, [])

  React.useEffect(() => {
    socket.connect()

    socket.on('connect', () => {
      const connectionId = socket.id
      console.log(`Connected ${process.env.REACT_APP_SOCKET_URL} with id ${connectionId}`)
      connectionRef.current = connectionId
    })

    socket.on('connect_error', () => {
      setTimeout(() => {
        socket.connect()
      }, 100)
    })

    socket.on('BOARD_CHANGED', (newBoard) => setBoard(newBoard))
    socket.on('GAME_ENDED', () => setGameEnded(true))
  }, [])

  console.log(gameId, gameEnded, board)

  return (
    <ThemeProvider
      theme={createTheme({ palette: { primary: { main: '#000' } } })}
    >
      <WelcomeScreen
        errorMessage={errorMessage}
        onJoinClick={onJoinClick}
        onNewGameClick={onNewGameClick}
      />

      {
        gameEnded === true ?
          <GameEndedOverlay
            onReplayClick={onReplayClick}
          />
          :
          null
      }
    </ThemeProvider>
  )
}

export default App
