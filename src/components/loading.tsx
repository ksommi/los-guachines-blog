import React from 'react'
import Header from './header'
import Spinner from './spinner'

const Loading = () => {
  return (
    <>
      <Header titlePre="Cargando.." />
      <Spinner />
    </>
  )
}

export default Loading
