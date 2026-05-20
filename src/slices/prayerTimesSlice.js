import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchPrayerTimes = createAsyncThunk("prayerTimes",async(_ , {rejectWithValue})=>{
    try {
        const response = await axios.get("https://api.aladhan.com/v1/timings?latitude=33.5731&longitude=-7.5898&method=3")
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data || error.message)
    }
    
})

const prayerTimesSlice = createSlice({
    name: "salatHour" ,
    initialState :{
        selectedSalat: "" ,
        timings: null ,
        loading : false ,
        error: null
    },
    reducers:{
        setSelectedSalat: (state , action)=>{
            state.selectedSalat = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder 
            .addCase(fetchPrayerTimes.pending , (state)=>{
                state.loading = true ,
                state.error = null
            })
            .addCase(fetchPrayerTimes.fulfilled , (state , action)=>{
                state.loading = false , 
                state.timings = action.payload.data.timings ,
                state.error = null
            })
            .addCase(fetchPrayerTimes.rejected , (state ,action)=>{
                state.loading = false ,
                state.error = action.payload
            })
    }
})

export const {setSelectedSalat} =  prayerTimesSlice.actions
export default prayerTimesSlice.reducer