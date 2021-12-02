import React from 'react'
import PropTypes from 'prop-types'

import { Box, Stack, Card, Typography } from '@mui/material'

import tankDestroyedImage from '../images/tank--destroyed.png'
import tankFiringImage from '../images/tank--firing.png'
import tankImage from '../images/tank.png'

export const GameScreen = (props) => {
  const { gameId, board, sendEvent } = props

  const scale = window.innerWidth < board.dimensions.x ? window.innerWidth / board.dimensions.x : 1

  React.useEffect(() => {
    const keydownListener = (e) => {
      switch (e.key) {
        case 'ArrowDown':
          sendEvent({ key: 'ArrowDown', eventName: 'keydown' })
          break
        case 'ArrowUp':
          sendEvent({ key: 'ArrowUp', eventName: 'keydown' })
          break
        case 'ArrowLeft':
          sendEvent({ key: 'ArrowLeft', eventName: 'keydown' })
          break
        case 'ArrowRight':
          sendEvent({ key: 'ArrowRight', eventName: 'keydown' })
          break
        case ' ':
          sendEvent({ key: 'Space', eventName: 'keydown' })
          break
        default:
      }
    }

    const keyupListener = (e) => {
      switch (e.key) {
        case 'ArrowDown':
          sendEvent({ key: 'ArrowDown', eventName: 'keyup' })
          break
        case 'ArrowUp':
          sendEvent({ key: 'ArrowUp', eventName: 'keyup' })
          break
        case 'ArrowLeft':
          sendEvent({ key: 'ArrowLeft', eventName: 'keyup' })
          break
        case 'ArrowRight':
          sendEvent({ key: 'ArrowRight', eventName: 'keyup' })
          break
        case ' ':
          sendEvent({ key: 'Space', eventName: 'keyup' })
          break
        default:
      }
    }

    window.addEventListener('keydown', keydownListener)
    window.addEventListener('keyup', keyupListener)

    return () => {
      window.removeEventListener('keydown', keydownListener)
      window.removeEventListener('keyup', keyupListener)
    }
  }, [sendEvent])

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
      <Stack
        gap={2}
        sx={{
          transform: 'scale(' + scale + ')'
        }}
      >
        <Card
          sx={{
            padding: 2,
            textAlign: 'center'
          }}
        >
          <Typography
            sx={{ marginBottom: 2 }}
            variant={'h5'}
          >
            🔥 TANKS 🔥
          </Typography>
          GAME ID: {gameId} | TIME: {(board.time / 1000).toFixed(2)} / {(board.endTime / 1000).toFixed(2)}
        </Card>
        <Box
          sx={{
            width: board.dimensions.x,
            height: board.dimensions.y,
            backgroundColor: 'green',
            position: 'relative',
            borderRadius: 1
          }}
        >
          {
           board && board.objects && board.objects.map((object) => {
             const image = object.hp <= 0 ? tankDestroyedImage : object.isFiring ? tankFiringImage : tankImage

             return (
               <Box
                 key={object.id}
                 sx={{
                   position: 'absolute',
                   top: object.top,
                   left: object.left,
                   width: object.width,
                   height: object.height,
                   transform: 'rotate(' + object.rotation + 'deg)',
                   backgroundPosition: 'cover',
                   backgroundRepeat: 'no-repeat',
                   backgroundImage: 'url(' + image + ')'
                 }}
               />
             )
           })
         }
        </Box>
      </Stack>
    </Box>
  )
}

const PlayerPropType = PropTypes.shape({
  type: PropTypes.oneOf(['player']),
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  rotation: PropTypes.number.isRequired,
  hp: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  isFiring: PropTypes.bool.isRequired
})

const BoardPropType = PropTypes.shape({
  dimensions: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  time: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  objects: PropTypes.arrayOf(PropTypes.oneOfType([
    PlayerPropType
  ])).isRequired
}).isRequired

GameScreen.propTypes = {
  gameId: PropTypes.number.isRequired,
  board: BoardPropType,
  sendEvent: PropTypes.func.isRequired
}

export default GameScreen
