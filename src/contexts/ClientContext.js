import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { calcSubPrice, calcTotalPrice } from '../helpers/calcPrice';
import { API } from '../helpers/const';

export const clientContext = React.createContext()
const INIT_STATE = {
    phones: null,
    phone: null,
    countOfPhones: JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')).phones.length : 0,
    cart: 0,
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_ALL_PHONES":
            return {...state, phones: action.payload }
        case "GET_PHONE_BY_ID":
            return {...state, phone: action.payload }
        case 'ADD_AND_DELETE_PHONE_IN_CART':
            return {...state, countOfPhones: action.payload }
        case 'GET_ALL':
            return {...state, cart: action.payload }
        default:
            return state
    }
}
const ClientContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getAllPhones = async() => {
        try {
            let filter = window.location.search
            const { data } = await axios(`${API}${filter}`)
                // let { data } = await axios(API)
            dispatch({
                type: "GET_ALL_PHONES",
                payload: data,
            })
        } catch (e) {
            console.log(e)
        }
    }

    const getPhoneById = async(id) => {
        try {
            let { data } = await axios(`${API}/${id}`)
            dispatch({
                type: "GET_PHONE_BY_ID",
                payload: data,
            })
        } catch (e) {
            console.log(e)
        }
    }

    // ! pagination

    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)
    useEffect(() => {
        if (state.phones) {
            const data = state.phones
            setPosts(data)
        }
    }, [state.phones])

    // const indexOfLastPost

    const numberOfLastPost = currentPage * postsPerPage
    const numberOfFirstPost = numberOfLastPost - postsPerPage
    const currentPosts = posts.slice(numberOfFirstPost, numberOfLastPost)
    const totalPosts = posts.length
    const handlePage = (newPage) => {
        setCurrentPage(newPage)
    }

    // ! Корзина
    const addAndDeletePhoneInCart = (phone) => {
        // console.log(item)
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                phones: [],
                totalPrice: 0,
            }
        } else {

        }
        let product = {
            phone: phone,
            count: 1,
            subPrice: 0,
        }
        product.subPrice = calcSubPrice(product)
        let checkArr = cart.phones.filter(item => {

            return item.phone.id === phone.id
        })
        if (checkArr.length === 0) {
            cart.phones.push(product)
        } else {
            cart.phones = cart.phones.filter(item => {
                return item.phone.id !== phone.id
            })
        }
        cart.totalPrice = calcTotalPrice(cart)
        localStorage.setItem('cart', JSON.stringify(cart))
        let action = {
            type: "ADD_AND_DELETE_PHONE_IN_CART",
            payload: cart.phones.length,
        }
        dispatch(action)
    }

    const checkPhoneInCart = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                phones: [],
                totalPrice: 0,
            }
        }
        let checkArr = cart.phones.filter(item => {
            return item.phone.id === id
        })
        if (checkArr.length === 0) {
            return false
        } else {
            return true
        }
    }

    const changeCountPhone = (count, id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart.phones = cart.phones.map(item => {
            if (item.phone.id === id) {
                item.count = count
                item.subPrice = calcSubPrice(item)
            }
            return item
        })
        cart.totalPrice = calcTotalPrice(cart)
        localStorage.setItem('cart', JSON.stringify(cart))
        getAll()
    }
    const getAll = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        dispatch({
            type: 'GET_ALL',
            payload: cart,
        })
    }
    return ( <clientContext.Provider value = {
            {
                getAllPhones,
                handlePage,
                getAll,
                getPhoneById,
                setCurrentPage,
                addAndDeletePhoneInCart,
                checkPhoneInCart,
                changeCountPhone,
                phones: state.phones,
                cart: state.cart,
                countOfPhones: state.countOfPhones,
                phone: state.phone,
                currentPosts: currentPosts,
                totalPosts: totalPosts,
                postsPerPage: postsPerPage,
                currentPage: currentPage,
            }
        } >
        { props.children } </clientContext.Provider>
    );
};

export default ClientContextProvider;