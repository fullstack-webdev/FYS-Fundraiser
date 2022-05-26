// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('appCampaigns/getAllData', async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/campaign/list`)
  return response.data
})

export const getData = createAsyncThunk('appCampaigns/getData', async params => {
  const response = await axios.get('/api/campaigns/list/data', params)
  return {
    params,
    data: response.data.campaigns,
    totalPages: response.data.total
  }
})

export const getCampaign = createAsyncThunk('appCampaigns/getCampaign', async id => {
  const response = await axios.get('/api/campaigns/campaign', { id })
  return response.data.campaign 
})

export const addCampaign = createAsyncThunk('appCampaigns/addCampaign', async (campaign, { dispatch, getState }) => {
  await axios.post('/campaigns/add-campaign', campaign)
  await dispatch(getData(getState().campaigns.params))
  await dispatch(getAllData())
  return campaign
})

export const deleteCampaign = createAsyncThunk('appCampaigns/deleteCampaign', async (id, { dispatch, getState }) => {
  await axios.delete('/campaigns/delete', { id })
  await dispatch(getData(getState().campaigns.params))
  await dispatch(getAllData())
  return id
})

export const appCampaignsSlice = createSlice({
  name: 'appCampaigns',
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
      // .addCase(getData.fulfilled, (state, action) => {
      //   console.log(action.payload)
      //   // state.data = action.payload.data
      //   // state.params = action.payload.params
      //   // state.total = action.payload.totalPages
      // })
      .addCase(getCampaign.fulfilled, (state, action) => {
        console.log(action.payload)
        state.selectedUser = action.payload
      })
  }
})

export default appCampaignsSlice.reducer
