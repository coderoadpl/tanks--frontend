import React from 'react'
import PropTypes from 'prop-types'

import { Box, Card, Typography, TextField, Button } from '@mui/material'

export const WelcomeScreen = (props) => {
  const { errorMessage, onJoinClick, onNewGameClick } = props

  const [gameId, setGameId] = React.useState('')

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Card
        sx={{
          width: 320,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography
          sx={{ marginBottom: 2 }}
          variant={'h5'}
        >
          🔥 TANKS 🔥
        </Typography>
        {
          errorMessage ?
            <Typography
              sx={{ marginBottom: 2 }}
              color={'error'}
            >
              {errorMessage}
            </Typography>
            :
            null
        }
        <TextField
          sx={{
            width: '100%',
            marginBottom: 2
          }}
          size={'small'}
          label={'Game ID'}
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
        />
        <Button
          sx={{
            width: '100%',
            marginBottom: 2
          }}
          variant={'contained'}
          onClick={() => onJoinClick(gameId)}
        >
          JOIN
        </Button>
        <Button
          sx={{
            width: '100%'
          }}
          variant={'contained'}
          onClick={() => onNewGameClick()}
        >
          NEW GAME
        </Button>
      </Card>
    </Box>
  )
}

WelcomeScreen.propTypes = {
  errorMessage: PropTypes.string,
  onJoinClick: PropTypes.func.isRequired,
  onNewGameClick: PropTypes.func.isRequired
}

export default WelcomeScreen
