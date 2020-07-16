pragma solidity ^0.5.16;

contract PiggyBank{
    
    uint256 public bankBalance;
    address payable public accountHolder;
    
    event balanceAdded();
    event balanceWithdrawn();
    event killAccount();
    
    enum State{Active, Inactive}
    
    State public state;
    
    modifier onlyHolder(){
        require(msg.sender == accountHolder);
        _;
    }
    
    modifier inState(State _state){
        require(state == _state);
        _;
    }
    
    constructor() public {
        accountHolder = msg.sender;
        state = State.Active;
    }
    
    function withdrawEther(uint256 _amount) public inState(State.Active) onlyHolder {
        require(_amount <= bankBalance);
        emit balanceWithdrawn();
        bankBalance -= _amount;
        accountHolder.transfer(_amount);
    }
    
    function addEther() public inState(State.Active) onlyHolder payable {
        emit balanceAdded();
        bankBalance += msg.value;
    }
    
    function deleteAccount() public inState(State.Active) onlyHolder {
        emit killAccount();
        bankBalance = 0;
        state = State.Inactive;
        accountHolder.transfer(address(this).balance);
    }
    
}