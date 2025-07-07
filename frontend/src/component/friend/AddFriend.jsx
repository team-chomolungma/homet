import {Box, FormControl, FormHelperText, OutlinedInput, Stack, Typography} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import React, {useRef, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import NavigationBar from '../NavigationBar.jsx';
import UserIcon from '../UserIcon.jsx';
import {useNavigate} from 'react-router-dom';
import axiosInstance from '../../lib/axios.js';

export default function AddFriend() {
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();


    const [searchResult, setSearchResult] = useState()

    //No5  { result: [{ id,displayname }]
    const userSearch = async (userId) => {
        if (!userId) return;
        const response = await axiosInstance.get(`/api/users/search${userId}`)
        setSearchResult(response.result)
    }

    return (
        <>
            <Stack
                alignItems="center"
                direction="row"
                spacing={0}
                sx={{margin: 2}}
            >
                <ArrowBackIosNewIcon sx={{
                    height: 24, width: 24, color: '#333333',
                }} onClick={() => navigate('/friendlist')}
                />
                <Typography sx={{fontSize: 24, color: '#333333', marginLeft: 3}}>送信先検索</Typography>

            </Stack>

            <Box display="flex" justifyContent="center">
                <Box
                    display="flex"//レイアウトモード
                    flexDirection="column"//縦並び
                    sx={{width: '75%'}}
                >
                    <Typography sx={{fontSize: 20, mb: 1, color: '#333333'}}>ユーザーID</Typography>
                    <FormControl
                        fullWidth
                        sx={{

                            backgroundColor: '#fff',
                            borderRadius: 1,
                            '& .MuiOutlinedInput-root': {
                                fontSize: 16,
                                height: 35,
                            },
                        }} variant="outlined">
                        <OutlinedInput
                            onChange={(e) => setInputValue(e.target.value)}
                            inputRef={inputRef}
                            id="outlined-adornment-weight"
                            endAdornment={<SearchIcon position="end"
                                                      sx={{
                                                          color: inputValue ? '#000' : '#ddd',
                                                          cursor: inputValue ? 'pointer' : 'not-allowed',
                                                      }}
                                                      onClick={() => userSearch(inputRef.current.value)}></SearchIcon>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                                'placeholder': '英数字',
                            }}
                            sx={{
                                'fieldset': {
                                    border: 'none'
                                }
                            }}
                        />
                        <FormHelperText id="outlined-weight-helper-text"></FormHelperText>
                    </FormControl>
                </Box>
            </Box>
            {searchResult[0] ? (
                    <Box onClick={() => navigate('/voice', {
                        state: {
                            displayname: searchResult[0].displayname,
                            receiver_id: searchResult[0].id
                        }
                    })}>
                        <UserIcon displayname={searchResult[0].displayname}/>
                    </Box>)
                :
                (<Typography sx={{fontSize: 14, color: '#333333'}}>ユーザーが見つかりません</Typography>)}
            <NavigationBar/>
        </>
    )
}