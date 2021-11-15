import { FormControl, FormLabel, Radio, FormControlLabel, RadioGroup } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import MediaCard from '../components/MediaCard';
import { clientContext } from '../contexts/ClientContext';
import Pagination from '../components/Pagination';
const MainPage = () => {
    const { getAllPhones, phones, currentPosts, setCurrentPage } = useContext(clientContext)
    const navigate = useNavigate()
    const [brandValue, setBrandValue] = useState('')
    let object = new URLSearchParams(window.location.search)
    function filterPhones(key, value) {
        object.set(key, value)
        let newUrl = `${window.location.pathname}?${object.toString()}`
        navigate(newUrl)
        console.log(newUrl)
        getAllPhones()
        setBrandValue(value)
    }
    useEffect(() => {
        setBrandValue(object.get('brand'))
    }, [object])
    useEffect(() => {
        getAllPhones()
    }, [])
    return (
        <>
            <div className="main-page">
                <div className="sidebar">
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Brand</FormLabel>
                        <RadioGroup
                            aria-label="brand"
                            value={brandValue}
                            name="radio-buttons-group"
                            onChange={(e) => {
                                filterPhones('brand', e.target.value)
                                setCurrentPage(1)
                            }}
                        >
                            <FormControlLabel value="iPhone" control={<Radio />} label="iPhone" />
                            <FormControlLabel value="Techno" control={<Radio />} label="Techno" />
                            <FormControlLabel value="Samsung" control={<Radio />} label="Samsung" />
                            <FormControlLabel value="Xiaomi" control={<Radio />} label="Xiaomi" />
                            <FormControlLabel value="OnePlus" control={<Radio />} label="OnePlus" />
                            <FormControlLabel value="Blackview" control={<Radio />} label="Blackview" />
                            <FormControlLabel value="INOI" control={<Radio />} label="INOI" />
                            <FormControlLabel value="Realme" control={<Radio />} label="Realme" />
                        </RadioGroup>
                    </FormControl>
                </div>
                {
                    currentPosts ? (
                        <>
                            <div className="phones">
                                {
                                    currentPosts.map(item => (
                                        <MediaCard key={item.id} phone={item} />
                                    ))
                                }

                            </div>

                        </>
                    ) : (
                        <h2>Loading</h2>
                    )
                }
            </div>
            <Pagination />

        </>
    );
};

export default MainPage;