import { API_URL } from "../../config";
// import { createSlice } from "@reduxjs/toolkit";
// import { GrFavorite } from "react-icons/gr";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    Diagnosers: [],
    status: ""
}

const headers = {
    'Content-Type': 'application/json'
}

export const InitDiagnoser = createAsyncThunk("InitDiagnosers",
    async () => {
        let data
        await axios.get(`${API_URL}/Diagnosers/ReadAll`).then(res => {
            data = res.data
        }) 
        return data
    })

export const addDiagnoser = createAsyncThunk("addDiagnoser",
    async (diagnoser) => {
        await axios.post(`${API_URL}/Diagnosers/Add`, diagnoser,
            {
                headers: headers
            }).then(res => { })
        return diagnoser
    })

export const deleteDiagnoser = createAsyncThunk("deleteDiagnoser",
    async (diagnoser) => {
        await axios.delete(`${API_URL}/Diagnosers/Delete`, 
            {
                headers: headers,
                data:diagnoser
            }
        ).then(res => { })
        return diagnoser
    })

export const updateDiagnoser = createAsyncThunk("updateDiagnoser",
    async (diagnoser) => {
        await axios.post(`${API_URL}/Diagnosers/Update`, diagnoser,
            {
                headers: headers
            }
        ).then(res => { })
        return diagnoser
    })

export const payToManager = createAsyncThunk(
  "payToManager",
  async ({ code, num }) => {
    await axios.post(
      `${API_URL}/Diagnosers/PayToManager/${num}/${code}`,
      {},
      { headers: headers }
    );
  }
);

const DiagnoserSlice = createSlice({
    name: "diagnoser",
    initialState,
    reducers: {
        AddPrice:(state, action)=>{
            const d = state.Diagnosers.find(d=>d.code==action.payload.code)
            d.precentagePayment+=action.payload.price
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(InitDiagnoser.pending, (state) => {
                state.status = "loading"
            })
            .addCase(InitDiagnoser.fulfilled, (state, action) => {
                state.status = "succesfull"
                state.Diagnosers = action.payload;
            })
            .addCase(InitDiagnoser.rejected, (state) => {
                state.status = "faild"
            })
            .addCase(addDiagnoser.fulfilled, (state, action) => {
                state.status = "";
                const diagnoser = action.payload;
                state.Diagnosers =[...state.Diagnosers,diagnoser] //state.Diagnosers.push(diagnoser)
            })
            .addCase(deleteDiagnoser.fulfilled, (state, action) => {
                state.status = "succesfull";
                const diagnoser = action.payload;
                state.Diagnosers = state.Diagnosers?.filter(d => d.mail != diagnoser.mail)
            })
            .addCase(deleteDiagnoser.pending, (state) => {
                state.status = "loading"
            })
            .addCase(deleteDiagnoser.rejected, (state) => {
                state.status = "faild"
            })
            .addCase(updateDiagnoser.fulfilled, (state, action) => {
                const diagnoser = action.payload;
                let i = state.Diagnosers?.findIndex(d => d.mail == diagnoser.mail)
                state.Diagnosers[i] = diagnoser
            });
    }
})

export const { AddPrice } = DiagnoserSlice.actions;
export default DiagnoserSlice.reducer;