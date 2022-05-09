// migrations/2_deploy.js
// SPDX-License-Identifier: GPL

const Airdrop = artifacts.require('Airdrop')

module.exports = async function(deployer) {
    await deployer.deploy(Airdrop)
 
    console.log('deploy done')
}
