// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('appDonations/getAllData', async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/donation/list`)
  return response.data
})

export const getData = createAsyncThunk('appDonations/getData', async params => {
  const response = await axios.get('/api/donations/list/data', params)
  return {
    params,
    data: response.data.donations,
    totalPages: response.data.total
  }
})

export const getDonation = createAsyncThunk('appDonations/getDonation', async id => {
  const response = await axios.get('/api/donations/donation', { id })
  return response.data.donation 
})

export const addDonation = createAsyncThunk(`${process.env.REACT_APP_BASE_URL}/admin/donation_form/`, async (donation, { dispatch, getState }) => {
  await axios.post('/donations/add-donation', donation)
  await dispatch(getData(getState().donations.params))
  await dispatch(getAllData())
  return donation
})

export const deleteDonation = createAsyncThunk('appDonations/deleteDonation', async (id, { dispatch, getState }) => {
  await axios.delete('/donations/delete', { id })
  await dispatch(getData(getState().donations.params))
  await dispatch(getAllData())
  return id
})

export const appDonationsSlice = createSlice({
  name: 'appDonations',
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
        console.log("getAllData -> appDonations", action.payload)
        state.allData = action.payload
      })
      // .addCase(getData.fulfilled, (state, action) => {
      //   console.log(action.payload)
      //   state.data = action.payload.data
      //   state.params = action.payload.params
      //   state.total = action.payload.totalPages
      // })
      .addCase(getDonation.fulfilled, (state, action) => {
        console.log(action.payload)
        state.selectedUser = action.payload
      })
  }
})

export default appDonationsSlice.reducer
