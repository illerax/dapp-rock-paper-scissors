export default [{"inputs": [], "stateMutability": "payable", "type": "constructor"}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "string", "name": "_value", "type": "string"}],
    "name": "LogResult",
    "type": "event"
}, {
    "inputs": [{"internalType": "enum RockPaperScissors.Option", "name": "playerChoice", "type": "uint8"}],
    "name": "play",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
}, {"stateMutability": "payable", "type": "receive"}]