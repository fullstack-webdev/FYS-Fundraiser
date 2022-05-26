// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('appTeams/getAllData', async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/organization/teams/list`)
  return response.data
})

export const getData = createAsyncThunk('appTeams/getData', async params => {
  const response = await axios.get('/api/teams/list/data', params)
  return {
    params,
    data: response.data.teams,
    totalPages: response.data.total
  }
})

export const getTeam = createAsyncThunk('appTeams/getTeam', async id => {
  const response = await axios.get('/api/teams/team', { id })
  return response.data.team 
})

export const addTeam = createAsyncThunk('appTeams/addTeam', async (team, { dispatch, getState }) => {
  await axios.post('/teams/add-team', team)
  await dispatch(getData(getState().teams.params))
  await dispatch(getAllData())
  return team
})

export const deleteTeam = createAsyncThunk('appTeams/deleteTeam', async (id, { dispatch, getState }) => {
  await axios.delete('/teams/delete', { id })
  await dispatch(getData(getState().teams.params))
  await dispatch(getAllData())
  return id
})

export const appTeamsSlice = createSlice({
  name: 'appTeams',
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
        state.allData = action.payload.data
        state.total = action.payload.data.length
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.data.length
      })
      .addCase(getTeam.fulfilled, (state, action) => {
        console.log(action.payload)
        state.selectedUser = action.payload
      })
  }
})

export default appTeamsSlice.reducer
