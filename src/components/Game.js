import React, {useState} from 'react';
import {Backdrop, Box, Button, ButtonGroup, CircularProgress, Typography} from "@mui/material";
import {ethers} from "ethers";
import {BET_SIZE, CONTRACT_ADDRESS} from "../constants";
import GAME_ABI from "../abi/contractAbi";
import GameModal from "./GameModal";

const Game = ({wallet, setWallet}) => {

    const [playerScore, setPlayerScore] = useState(0);
    const [contractScore, setContractScore] = useState(0);
    const [isWaiting, setIsWaiting] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState("Draw");

    const clearWallet = () => setWallet(null);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let gameInterface = new ethers.utils.Interface(GAME_ABI);
    const gameContract = new ethers.Contract(CONTRACT_ADDRESS, GAME_ABI, provider);
    const signer = provider.getSigner();

    const play = async (playerChoice) => {
        setIsWaiting(true);
        try {
            const transaction = await gameContract.connect(signer).play(playerChoice, {value: BET_SIZE});
            const receipt = await transaction.wait();
            showGameResults(gameInterface.parseLog(receipt.logs[0]).args[0]);
        } catch (ex) {
            showGameResults(ex);
        }
        setIsWaiting(false);
    }

    const showGameResults = (logRecord) => {
        switch (logRecord) {
            case 'You won!':
                setPlayerScore((prevState) => prevState + 1);
                setResult("Congratulations! You won!");
                break;
            case 'You lost!':
                setContractScore((prevState) => prevState + 1);
                setResult("Sorry! You lost!");
                break;
            case 'Draw!':
                setResult("The result is - Draw. Try again");
                break;
            default:
                setResult("An unknown error occurred – please try again later");
                break;
        }
        setShowResult(true);
    }


    return (
        <Box
            sx={{
                marginTop: 30,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <GameModal text={result}
                       open={showResult}
                       handleClose={() => setShowResult(false)}/>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isWaiting}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Typography component="div" variant="h6">
                Welcome {wallet}
            </Typography>
            <Button variant="outlined"
                    onClick={clearWallet}
                    size="small"
                    color="secondary">
                Back
            </Button>
            <Box
                sx={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h1">
                    {playerScore} : {contractScore}
                </Typography>
            </Box>
            <Box
                sx={{
                    marginTop: 10,
                    display: 'flex',
                }}
            >
                <ButtonGroup size="large" aria-label="large button group">
                    <Button onClick={() => play(0)}>
                        Rock
                    </Button>
                    <Button onClick={() => play(1)}>
                        Paper
                    </Button>
                    <Button onClick={() => play(2)}>
                        Scissors
                    </Button>
                </ButtonGroup>
            </Box>
        </Box>
    )
}

export default Game;