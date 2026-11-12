import { API_URL } from "../../config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"


const initialState = {
    Customers: [],
    status: ""
}

const headers = {
    'Content-Type': 'application/json'
}

export const InitCustomer = createAsyncThunk("InitCustomers",
    async () => {
        let data
        await axios.get(`${API_URL}/Customers/ReadAll`).then(res => {
            data = res.data
        })
        return data
    })

export const addCustomer = createAsyncThunk("addCustomer",
    async (Customer) => {
        await axios.post(`${API_URL}/Customers/Add`, Customer,
            {
                headers: headers
            }).then(res => { })
        return Customer
    })

export const deleteCustomer = createAsyncThunk("deleteCustomer",
    async (Customer) => {
        axios.delete(`${API_URL}/Customers/Delete`, {
            data: Customer,
            headers
        }).then(res => { })
        return Customer
    })

export const updateCustomer = createAsyncThunk("updateCustomer",
    async (Customer) => {
        await axios.post(`${API_URL}/Customers/Update`, Customer,
            {
                headers: headers
            }
        ).then(res => { })
        return Customer
    })

const CustomerSlice = createSlice({
    name: "Customer",
    initialState,
    reducers: {
        Customer: (state, action) => {
            return state.Customers.find(c => c.code == action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(InitCustomer.pending, (state) => {
                state.status = "loading"
            })
            .addCase(InitCustomer.fulfilled, (state, action) => {
                state.status = "succesfull"
                state.Customers = action.payload;
            })
            .addCase(InitCustomer.rejected, (state) => {
                state.status = "faild"
            })
            .addCase(addCustomer.fulfilled, (state, action) => {
                const diagnoser = action.payload;
                state.status = "succesfull";
                state.Customers.push(diagnoser)
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                const diagnoser = action.payload;
                state.status = "succesfull";
                state.Customers = state.Customers.filter(d => d.mail != diagnoser.mail)
            })
            .addCase(deleteCustomer.pending, (state) => {
                state.status = "loading"
            })
            .addCase(deleteCustomer.rejected, (state) => {
                state.status = "faild"
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                const Customer = action.payload;
                let i = state.Customers.findIndex(d => d.mail == Customer.mail)
                state.Customers[i] = Customer
            });
    }
})

export const { Customer } = CustomerSlice.actions;
export default CustomerSlice.reducer;