import React from 'react'
import PropTypes from 'prop-types'

import { Box, Card, Typography, Button } from '@mui/material'

export const GameEndedOverlay = (props) => {
  const { onReplayClick } = props

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 999,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.85)'
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
          GAME ENDED
        </Typography>
        <Button
          sx={{
            width: '100%'
          }}
          variant={'contained'}
          onClick={() => onReplayClick()}
        >
          NEW GAME
        </Button>
      </Card>
    </Box>
  )
}

GameEndedOverlay.propTypes = {
  onReplayClick: PropTypes.func.isRequired
}

export default GameEndedOverlay
