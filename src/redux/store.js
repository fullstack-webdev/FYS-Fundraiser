import { configureStore } from '@reduxjs/toolkit'

// ** Redux Imports
import rootReducer from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false
    })
  }
})

export { store }
