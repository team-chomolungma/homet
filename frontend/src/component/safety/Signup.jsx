import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import {
    Container,
    Box,
    Typography,
    Button,
    Stack,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    ListSubheader,
    OutlinedInput,
    IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

//ログイン
    const processingRegister = async () => {
        try {

            //ログイン
            const res = await axios.post(" /api/users", {
                mail: email,
                password: password,
                name:username,
            });
            //保存
            localStorage.setItem("userId", res.data.id)

            navigate("/main");
        } catch (err) {
            alert("登録失敗");
            console.error(err);
        }
    };
    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    processingRegister();
                }}
            >
                <Typography variant="h4" align="center" mb={4}>
                    アカウント作成
                </Typography>

                <Stack spacing={3}>
                    <TextField
                        label="ユーザーネーム"
                        placeholder="ユーザーネームを入力"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    ></TextField>

                    <TextField
                        label="メールアドレス"
                        type="email"
                        placeholder="メールアドレスを入力"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></TextField>

                    <TextField
                        label="パスワード"
                        type="password"
                        placeholder="パスワード"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></TextField>

                    <Box mt={8}>
                        <Button type="submit"  fullWidth>
                            アカウント作成
                        </Button>
                    </Box>
                </Stack>
            </Box>
            {/* 左下 */}
            <IconButton
                onClick={() => navigate(-1)}
                sx={{
                    position: "fixed",
                    bottom: 16,
                    left: 16,
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
        </Container>
    );
}

export default Signup;
