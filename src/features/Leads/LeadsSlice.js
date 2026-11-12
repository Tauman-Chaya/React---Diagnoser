import { API_URL } from "../../config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"


const initialState = {
    Leads: [],
    status: ""
}

const headers = {
    'Content-Type': 'application/json'
}


    export const InitLeads = createAsyncThunk("InitLeads",
    async () => {
        const res = await axios.get(`${API_URL}/Leads/ReadAll`);
        // console.log(res.data); // חשוב
        return res.data;
    })

// export const addLead = createAsyncThunk("addLead",
//     async (Lead) => {
//         await axios.post(`${API_URL}/Leads/Add`, Lead,
//             {
//                 headers: headers
//             }).then(res => { })
//         return Lead
//     })

export const deleteLead = createAsyncThunk("deleteLead",
    async (Lead) => {
        await axios.delete(`${API_URL}/Leads/Delete`, {
            data: Lead,
            headers: headers
        }).then(res => { })
        return Lead
    })

// export const updateLead = createAsyncThunk("updateLead",
//     async (Lead) => {
//         await axios.post(`${API_URL}/Leads/Update`, Lead,
//             {
//                 headers: headers
//             }
//         ).then(res => { })
//         return Lead
//     })

const LeadsSlice = createSlice({
    name: "Lead",
    initialState,
    reducers: {
        Lead: (state, action) => {
            return state.Leads.find(c => c.code == action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(InitLeads.pending, (state) => {
                state.status = "loading"
            })
            .addCase(InitLeads.fulfilled, (state, action) => {
                state.status = "succesfull"
                state.Leads = action.payload;
            })
            .addCase(InitLeads.rejected, (state) => {
                state.status = "faild"
            })
            // .addCase(addLead.fulfilled, (state, action) => {
            //     const diagnoser = action.payload;
            //     state.status = "succesfull";
            //     state.Leads.push(diagnoser)
            // })
            .addCase(deleteLead.fulfilled, (state, action) => {
                state.status = "succesfull";
                const diagnoser = action.payload;
                state.Leads = state.Leads.filter(d => d.mail != diagnoser.mail)
            })
            .addCase(deleteLead.pending, (state) => {
                state.status = "loading"
            })
            .addCase(deleteLead.rejected, (state) => {
                state.status = "faild"
            })
            // .addCase(updateLead.fulfilled, (state, action) => {
            //     const Lead = action.payload;
            //     let i = state.Leads.findIndex(d => d.mail == Lead.mail)
            //     state.Leads[i] = Lead
            // });
    }
})

export const { Lead } = LeadsSlice.actions;
export default LeadsSlice.reducer;