import React from 'react'
import { TailSpin } from 'react-loader-spinner'

function Loader() {
  return (
    <>
    <TailSpin
  visible={true}
  height="60"
  width="60"
  color="#00f5e1"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </>
  )
}

export default Loader