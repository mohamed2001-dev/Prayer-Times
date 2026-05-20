import { configureStore } from "@reduxjs/toolkit";
import prayerTimesReducer from "./slices/prayerTimesSlice"

export const store = configureStore({
    reducer :{
        prayerTimes : prayerTimesReducer
    }
})