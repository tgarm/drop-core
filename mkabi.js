const chalk = require('chalk')
const rmSuffix = require('remove-suffix')
const fs = require('fs')

const abipath = 'abi'
const ctrnames = ['Airdrop']


function lowerName(name){
    const [pre] = rmSuffix(name, 'Token')
    return pre.toLowerCase()
}

function artifact(name){
    const art = require(`./build/contracts/${name}.json`)
    return art
}

function mkabi(art){
    const abi = JSON.stringify(art.abi, null, 2)
    const lname = lowerName(art.contractName)
    const fname = `${abipath}/${lname}-abi.json`
    fs.writeFileSync(fname, abi)
    return abi
}

function main(){
    for(let i in ctrnames){
        mkabi(artifact(ctrnames[i]))
    }
}

main()
