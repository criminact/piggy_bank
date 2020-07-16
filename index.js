window.addEventListener('load', async () => {
  // New web3 provider
  if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
          // ask user for permission
          await ethereum.enable();
          // user approved permission
      } catch (error) {
          // user rejected permission
          console.log('user rejected permission');
      }
  }
  // Old web3 provider
  else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
      // no need to ask for permission
  }
  // No web3 provider
  else {
      console.log('No web3 provider detected');
  }
});

console.log(window.web3.currentProvider);

function overlayON(){
  document.getElementById("overlay").style.display = "block";
}

function overlayOFF(){
  document.getElementById("overlay").style.display = "none";
}

var abi = JSON.parse('[ { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [], "name": "balanceAdded", "type": "event" }, { "anonymous": false, "inputs": [], "name": "balanceWithdrawn", "type": "event" }, { "anonymous": false, "inputs": [], "name": "killAccount", "type": "event" }, { "constant": true, "inputs": [], "name": "accountHolder", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "addEther", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "bankBalance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "deleteAccount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "state", "outputs": [ { "internalType": "enum PiggyBank.State", "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "withdrawEther", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]');
var bytecode = '0x608060405234801561001057600080fd5b5033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160146101000a81548160ff0219169083600181111561007157fe5b0217905550610543806100856000396000f3fe6080604052600436106100555760003560e01c806328657aa51461005a5780633be32f7d146100855780633bed33ce1461009c5780638894dd2b146100d7578063be546079146100e1578063c19d93fb14610138575b600080fd5b34801561006657600080fd5b5061006f610171565b6040518082815260200191505060405180910390f35b34801561009157600080fd5b5061009a610177565b005b3480156100a857600080fd5b506100d5600480360360208110156100bf57600080fd5b81019080803590602001909291905050506102c6565b005b6100df61040a565b005b3480156100ed57600080fd5b506100f66104d5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561014457600080fd5b5061014d6104fb565b6040518082600181111561015d57fe5b60ff16815260200191505060405180910390f35b60005481565b600080600181111561018557fe5b600160149054906101000a900460ff1660018111156101a057fe5b146101aa57600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461020457600080fd5b7f40bfd1b8b4f2ccbcc1c913c040de63f3d7fdfac1f7c56ba419cb2de5366e137760405160405180910390a16000808190555060018060146101000a81548160ff0219169083600181111561025557fe5b0217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f193505050501580156102c2573d6000803e3d6000fd5b5050565b60008060018111156102d457fe5b600160149054906101000a900460ff1660018111156102ef57fe5b146102f957600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461035357600080fd5b60005482111561036257600080fd5b7f647219982e76ea961dd3be4fdec8d523cc4577a2f04f7d97fe47759110fa893060405160405180910390a1816000808282540392505081905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f19350505050158015610405573d6000803e3d6000fd5b505050565b600080600181111561041857fe5b600160149054906101000a900460ff16600181111561043357fe5b1461043d57600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461049757600080fd5b7f58d3f201e80c719d465495214712ebf90d922268ab4f7ad55244fa0ca4117d0560405160405180910390a134600080828254019250508190555050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160149054906101000a900460ff168156fea265627a7a723158205e29cffff378421cf73ddc7df42f61d5af007011811bd12ba372c63c3c8c2cf964736f6c63430005100032';
var deploy_contract = web3.eth.contract(abi);
var searchContract = web3.eth.contract(abi);

var account;

 web3.eth.getAccounts(function(err, accounts) {
  if (err != null) {
    alert("Error retrieving accounts.");
    return;
  }
  if (accounts.length == 0) {
    alert("No account found! Make sure the Ethereum client is configured properly.");
    return;
  }
  account = accounts[0];
  console.log('Account: ' + account);
  web3.eth.defaultAccount = account;
});

function contractCreation(){

document.getElementById("creating").style.display = "block";

parameter = {
    from: account,
    data: bytecode,
    //NON PAYABLE - value: web3.utils.toWei(price, 'ether'), //price
    gas: '4700000',
}

deploy_contract.new(parameter, function(err, result){
  if(err) {
            console.error(err);
            return;
        } else{
            myContract = result;
            if(result.address != undefined){
            document.getElementById("contract_address").style.display = "block";
            document.getElementById("address_copy").style.display = "block";
            document.getElementById("contract_address").innerHTML = myContract.address;
            console.log('address: ' + myContract.address);
            document.getElementById("creating").style.display = "none";
            }
        }
});

}

function copyText(){
  var copyText = document.getElementById("contract_address");
  var copiedText = copyText.textContent;
  navigator.clipboard.writeText(copiedText);
  alert("Content Copied - " + copiedText);
}

var useContract;
var bankbalance, owner, state;

function searchContractAll(){
  var searchAddress = document.getElementById("search_contract").value;
  useContract = searchContract.at(searchAddress);

  console.log(useContract);

  doItAll(useContract, setItAll);
}

function setItAll(){
      document.getElementById("contract_main").innerHTML = '<h1>Piggy bank Details</h1><p>This is an example <strong>Piggy Bank</strong> contract,This is built to work on Ropsten network.</p><hr><h4>Balance</h4><h5 id="value">' + bankbalance + ' Ether(s)</h5><br><h4>Account holder</h4><h5 id="owner">' + owner +'</h5><br><h4>State</h4><h5 id="state">' + state + '</h5><br><h5>Add Ethers to your account</h5><input type="number" id="add_ether" name="add_ether" class="float-left" placeholder="Ether(s)" style="width: 100px;"><a onclick="addBalance()" class="btn btn-primary btn-sm" style="color: #ffffff; margin-left: 10px; " role="button">Confirm, Add</a><hr><h5>Withdraw Ethers from your account</h5><input type="text" id="withdraw_ether" name="withdraw_ether" class="float-left" placeholder="Ether(s)" style="width: 100px;"><a onclick="withdrawBalance()" class="btn btn-primary btn-sm" style="color: #ffffff; margin-left: 10px;" role="button">Yes, Withdraw</a><hr><h5>All your Ethers will be sent back to you on deletion.</h5><a onclick="killContract();" class="btn btn-danger btn-sm" style="color: #ffffff" role="button">Delete Contract</a>';
}

function doItAll(useContract, callback){
    //get bank balance
    useContract.bankBalance(function (err, result){
      if(result != undefined){
          bankbalance = result/1000000000000000000;
      }else{
        bankbalance = "Reload to get data.";
      }
  });

    //get account holder address
  useContract.accountHolder(function (err, result){
      owner = result;
  });

    //get state of the contract
  useContract.state(function (err, result){
      state = result.c[0];
      if(state == 0){
        state = "Active";
      }else{
          state = "Inactive";
      }

      callback();
  });

  callback();
}

function addBalance(){
  var eth_count = document.getElementById("add_ether").value;

  console.log(eth_count);

  useContract.addEther({from: account, value: web3.utils.toWei(eth_count, 'ether'), gas: '4700000'}, function(err, result){
      console.log(result);
  });
}

function withdrawBalance(){
var eth_count = document.getElementById("withdraw_ether").value;

  useContract.withdrawEther(eth_count * 1000000000000000000, function(err, result){
      if(err == null){
        console.log(result);
      }
  });
}

function killContract(){
  useContract.deleteAccount(function(err, result){
      if(err == null){
        console.log(result);
      }
  });
}
