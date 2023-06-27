import React, { useEffect, useState } from 'react'

import { DashboardContextModel, ProviderModel } from '../models/ContextModels'

const DashContext = React.createContext<DashboardContextModel>({
  content: '',
  setContent: () => {
    return
  }
})

export const DashContextProvider: React.FC<ProviderModel> = ({ children }) => {
  const [content, setContent] = useState('')

  useEffect(() => {
    const savedContent = sessionStorage.getItem('content')
    if (savedContent) {
      setContent(savedContent)
    }
  }, [])

  const handleChangeContent = (mark: string) => {
    setContent(mark)
    sessionStorage.setItem('content', mark)
  }

  return (
    <DashContext.Provider value={{ content: content, setContent: handleChangeContent }}>
      {children}
    </DashContext.Provider>
  )
}

export default DashContext
