import SignIn from "./components/SignIn";
import React, {useState} from "react";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Game from "./components/Game";

const theme = createTheme();

function App() {
    const [wallet, setWallet] = useState();
    const view = wallet ? <Game wallet={wallet} setWallet={setWallet}/> : <SignIn setWallet={setWallet}/>;
    return (
        <div className="App">
            <CssBaseline/>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    {view}
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default App;
