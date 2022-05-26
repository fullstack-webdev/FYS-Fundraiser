// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

import { getUserData } from '@utils'


export const getAllData = createAsyncThunk('appClubs/getAllData', async () => {
  const user = getUserData()
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/organization/filter?organizationType=${process.env.REACT_APP_ORG_TYPE_CLUB}&user=${user.id}`)
  return response.data
})

export const getData = createAsyncThunk('appClubs/getData', async params => {
  const user = getUserData()
  // const response = await axios.get('/api/clubs/list/data', params)
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/organization/filter?organizationType=${process.env.REACT_APP_ORG_TYPE_CLUB}&user=${user.id}`, params)
  // const clubs = {
  //   clubs: response.data
  // }
  return {
    params,
    data: response.data,
    totalPages: response.data
    //totalPages: 1
  }
})

export const getClub = createAsyncThunk('appClubs/getClub', async id => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/organization/?organization=${id}`)
  return response.data 
})

export const getClubTeams = createAsyncThunk('appClubs/getClubTeams', async id => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/organization/filter?parent=${id}`)
  return response.data 
})
export const addClubTeam = createAsyncThunk('appClubs/addClubTeam', async (clubTeam, { dispatch }) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/organization/create`, clubTeam)
  await dispatch(getClubTeams())
  return clubTeam
})

export const getClubCampaigns = createAsyncThunk('appClubs/getClubCampaigns', async id => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/campaign/filter?organization=${id}`)

  return response.data 
})

export const getClubUsers = createAsyncThunk('appClubs/getClubUsers', async id => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/user_organizations/filter?organization=${id}`)

  return response.data 
})

export const addClub = createAsyncThunk('appClubs/addClub', async (club, { dispatch, getState }) => {
  await axios.post('/clubs/add-club', club)
  await dispatch(getData(getState().clubs.params))
  await dispatch(getAllData())
  return club
})

export const deleteClub = createAsyncThunk('appClubs/deleteClub', async (id, { dispatch, getState }) => {
  await axios.delete('/clubs/delete', { id })
  await dispatch(getData(getState().clubs.params))
  await dispatch(getAllData())
  return id
})

export const appClubsSlice = createSlice({
  name: 'appClubs',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    clubTeams:[],
    clubCampaigns:[],
    clubUsers:[],
    selectedUser: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload.data
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getClub.fulfilled, (state, action) => {
        state.selectedUser = action.payload.data
      })
      .addCase(getClubTeams.fulfilled, (state, action) => {
        state.clubTeams = action.payload.data
      })
      .addCase(getClubCampaigns.fulfilled, (state, action) => {
        state.clubCampaigns = action.payload.data
      })
      .addCase(getClubUsers.fulfilled, (state, action) => {
        state.clubUsers = action.payload.data
      })
  }
})

export default appClubsSlice.reducer
