// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('appLeagues/getAllData', async () => {
  const response = await axios.get('/api/leagues/list/all-data')
  return response.data
})

export const getData = createAsyncThunk('appLeagues/getData', async params => {
  const response = await axios.get('/api/leagues/list/data', params)
  return {
    params,
    data: response.data.leagues,
    totalPages: response.data.total
  }
})

export const getLeague = createAsyncThunk('appLeagues/getLeague', async id => {
  const response = await axios.get('/api/leagues/league', { id })
  return response.data.league 
})

export const addLeague = createAsyncThunk('appLeagues/addLeague', async (league, { dispatch, getState }) => {
  await axios.post('/leagues/add-league', league)
  await dispatch(getData(getState().leagues.params))
  await dispatch(getAllData())
  return league
})

export const deleteLeague = createAsyncThunk('appLeagues/deleteLeague', async (id, { dispatch, getState }) => {
  await axios.delete('/leagues/delete', { id })
  await dispatch(getData(getState().leagues.params))
  await dispatch(getAllData())
  return id
})

export const appLeaguesSlice = createSlice({
  name: 'appLeagues',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        console.log(action.payload)
        state.allData = action.payload
      })
      .addCase(getData.fulfilled, (state, action) => {
        console.log(action.payload)
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getLeague.fulfilled, (state, action) => {
        console.log(action.payload)
        state.selectedUser = action.payload
      })
  }
})

export default appLeaguesSlice.reducer
