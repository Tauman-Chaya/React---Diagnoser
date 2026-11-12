import { API_URL } from "../../config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"


export const fetchStatus = createAsyncThunk(
    'StatusSlice/fetchAll',
    async () => {
        const res = await axios.get(`${API_URL}/Statuses/ReadAll`);
        return res.data;
    }
);

const StatusSlice = createSlice({
    name: 'statusSlice',
    initialState: {
        statuss: [],
        status: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStatus.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStatus.fulfilled, (state, action) => {
                state.status = 'succesfull';
                state.statuss = action.payload;
            })
            .addCase(fetchStatus.rejected, (state) => {
                state.status = 'faild';
            });
    }
});

export default StatusSlice.reducer;