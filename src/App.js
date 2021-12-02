import React from 'react'

import WelcomeScreen from './components/WelcomeScreen'

export const App = () => {
  const onJoinClick = React.useCallback((gameId) => {
    console.log('onJoinClick', gameId)
  }, [])
  const onNewGameClick = React.useCallback(() => {
    console.log('onNewGameClick')
  }, [])

  return (
    <div>
      <WelcomeScreen
        onJoinClick={onJoinClick}
        onNewGameClick={onNewGameClick}
      />
    </div>
  )
}

export default App
