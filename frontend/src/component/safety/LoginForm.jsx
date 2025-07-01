import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import {
    Container,
    Box,
    Typography,
    Button,
    Stack,
    IconButton,
    InputAdornment,
    OutlinedInput,
    InputLabel,
    FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ArrowBack } from "@mui/icons-material";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。

    const processingLogin = async () => {



        try {
            const res = await axios.post("/api/users/login", {
                mail: email,
                password:password,
            });

            const userId = res.data.id;
            localStorage.setItem("userId", userId);
            navigate("/main");

        } catch (err) {
            alert("ログイン失敗");
            console.error(err);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    //アカウント作成画面に遷移
    const makeAccount = () => {
        navigate('/signup');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    processingLogin();
                }}
                // sx={{ width: "100%", maxWidth: 360 }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    ログイン
                </Typography>


                <Stack spacing={3}>
                    {/* メールアドレス */}
                    {/* ラベル + 入力欄をグループ化するためのコンテナ */}
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="email" sx={{ color: "text.secondary" }}>
                            メールアドレスを入力
                        </InputLabel>
                        <OutlinedInput
                            id="email"
                            type="email"
                            label="メールアドレス"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>

                    {/* パスワード */}
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="password">
                            パスワードを入力
                        </InputLabel>
                        <OutlinedInput
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="パスワード"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                        aria-label="パスワードの表示切替"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <Box sx={ {justifyContent: 'center'}} >
                        <Button type="submit">ログイン</Button>
                        <Button onClick={makeAccount} >
                            新規登録
                        </Button>
                    </Box>
                </Stack>
            </Box>
            <IconButton
                onClick={() => navigate(-1)}
                sx={{
                    position: "fixed",
                    bottom: 16,
                    left: 16,
                    color: "#544739",
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    "&:hover": {
                        bgcolor: "#A0BEB5",
                    },
                }}
            >
                <ArrowBack />
            </IconButton>

        </Box>
    );
}

export default LoginForm;
