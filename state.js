require('dotenv').config()
const ethers = require('ethers')

const chain = {}

function connect(rpcUrl, walletKey){
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
    chain.provider = provider
    const wallet = new ethers.Wallet(walletKey, provider)
    chain.signer = wallet
    return wallet.address
}


async function state(){
    const balance = await chain.provider.getBalance(chain.signer.address)
    console.log('address', chain.signer.address)
    console.log('balance', ethers.utils.formatEther(balance))
}

async function main(){
    await connect(process.env.RPC_URL, process.env.WALLET_KEY)
    await state()
}

main()
