// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('appFundraisers/getAllData', async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/fundraiser/list`)
  return response.data
})

export const getData = createAsyncThunk('appFundraisers/getData', async params => {
  const response = await axios.get('/api/fundraisers/list/data', params)
  return {
    params,
    data: response.data.fundraisers,
    totalPages: response.data.total
  }
})

export const getFundraiser = createAsyncThunk('appFundraisers/getFundraiser', async id => {
  const response = await axios.get('/api/fundraisers/fundraiser', { id })
  return response.data.fundraiser 
})

export const addFundraiser = createAsyncThunk('appFundraisers/addFundraiser', async (fundraiser, { dispatch, getState }) => {
  await axios.post('/fundraisers/add-fundraiser', fundraiser)
  await dispatch(getData(getState().fundraisers.params))
  await dispatch(getAllData())
  return fundraiser
})

export const deleteFundraiser = createAsyncThunk('appFundraisers/deleteFundraiser', async (id, { dispatch, getState }) => {
  await axios.delete('/fundraisers/delete', { id })
  await dispatch(getData(getState().fundraisers.params))
  await dispatch(getAllData())
  return id
})

export const appFundraisersSlice = createSlice({
  name: 'appFundraisers',
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
        console.log("getAllData --->  action.payload ", action.payload)
        state.allData = action.payload.data
      })
      // .addCase(getData.fulfilled, (state, action) => {
      //   console.log(action.payload)
      //   state.data = action.payload.data
      //   state.params = action.payload.params
      //   state.total = action.payload.totalPages
      // })
      .addCase(getFundraiser.fulfilled, (state, action) => {
        console.log(action.payload)
        state.selectedUser = action.payload
      })
  }
})

export default appFundraisersSlice.reducer
