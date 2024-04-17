/* eslint-disable no-unused-vars */
import { createContext, useState } from 'react'

export const newContext = createContext()

export const NewProvider = (props) => {
  const [reload, setReload] = useState(false)

  const reloadPage = () => {
    setReload(value => !value)
  }
  const val = {
    reloadPage,
    reload,
  }

  return (
    <newContext.Provider value={val}>
      {props.children}
    </newContext.Provider>
  )
}
