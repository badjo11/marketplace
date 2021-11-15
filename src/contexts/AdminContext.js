import axios from 'axios';
import React, { useReducer } from 'react';
import { API } from '../helpers/const';

export const adminContext = React.createContext()

const INIT_STATE = {
    phones: null,
    phone: null,
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_PHONES":
            return { ...state, phones: action.payload }
        case "GET_PHONE_BY_ID":
            return { ...state, phone: action.payload }
        case "CLEAR_STATE":
            return { ...state, phone: action.payload }
        default:
            return state
    }
}

const AdminContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)
    const addPhone = async (phone) => {
        try {
            const response = await axios.post(API, phone)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
    const getAllPhone = async () => {
        try {
            const response = await axios(API)
            let action = {
                type: 'GET_PHONES',
                payload: response.data
            }
            dispatch(action)
        } catch (e) {
            console.log(e)
        }
    }
    const getPhoneById = async (id) => {
        try {
            const response = await axios(`${API}/${id}`)
            let action = {
                type: 'GET_PHONE_BY_ID',
                payload: response.data
            }
            dispatch(action)
        } catch (e) {
            console.log(e)
        }
    }
    const editPhone = async (phone, id) => {
        try {
            const response = await axios.patch(`${API}/${id}`, phone)
            getAllPhone()
        } catch (e) {
            console.log(e)
        }
    }
    const clearState = () => {
        dispatch({
            type: "CLEAR_STATE",
            payload: null,
        })
    }
    const deletePhone = async (id) => {
        try {
            const response = await axios.delete(`${API}/${id}`)
            getAllPhone()

        } catch (e) {
            console.log(e)
        }
    }
    return (
        <adminContext.Provider
            value={{
                addPhone,
                getAllPhone,
                editPhone,
                getPhoneById,
                deletePhone,
                clearState,
                phones: state.phones,
                phone: state.phone,
            }}
        >
            {props.children}
        </adminContext.Provider>
    );
};

export default AdminContextProvider;