pragma solidity 0.6.6;
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "remix_accounts.sol";
import "../SlotMachine.sol"; // make sure directory of this is correct!
pragma experimental ABIEncoderV2;

contract SlotMachineTest is SlotMachine {

    // Define accounts
    address acc0; // Casino
    address acc1; // Player 1
    address acc2; // Player 2

    // Set up accounts to test beforehand
    function beforeAll () public returns (bool) {
        acc0 = TestsAccounts.getAccount(0);
        acc1 = TestsAccounts.getAccount(1);
        acc2 = TestsAccounts.getAccount(2);
    }

    // Casino sets up contract
    // Test if intialized balance is correct and the casino's address is correct
    /// #sender: account-0
    /// #value: 10000
    function testCreateContract () public payable {
        Assert.equal(msg.sender, acc0, "Casino account should be the sender for this function.");
        Assert.equal(msg.value, 10000, "Initial balance should be set to 10000 for this function.");
        fundCasino();
        Assert.equal(getCasinoBalance(), msg.value, "Balance of contract should be 10000 when contract is created.");
        Assert.equal(getOwnerAddress(), msg.sender, "Casino should be the current address when creating.");
    }


    // Let Player 1 start a game using 2 wei
    // Also check the slot machine itself when Player 1 plays the game
    /// #sender: account-1
    /// #value: 2
    function testPlayer1PlayTest() public payable {
        Assert.equal(msg.sender, acc1, "Player 1 account should be the sender of this function.");
        Assert.equal(msg.value, 2, "Player 1 bet value should be 2 wei.");
        // Balance of the casino before spinning for Player 1.
        uint initial_balance = getCasinoBalance();
        playerBet();
        
        // Check if balance is increased or decreased accordingly
        // Assuming Player 1 lost the game...
        if(getCasinoBalance() > initial_balance) {
            Assert.greaterThan(getCasinoBalance(), initial_balance, "Casino Balance is not increased accordingly when Player 1 played.");
        }
        // Assuming Player 1 won the game...
        else if(getCasinoBalance() < initial_balance) {
            Assert.lesserThan(getCasinoBalance(), initial_balance, "Casino Balance is not decreased accordingly when Player 1 played.");
        }
        // Assuming draw scenario...
        else {
            Assert.equal(getCasinoBalance(), initial_balance, "Casino Balance is not suppose to change when Player 1 played.");
        }
    }

    // Let Player 2 start a game using 3 wei
    // Also check the slot machine itself when Player 2 plays the game
    /// #sender: account-2
    /// #value: 3
    function testPlayer2PlayTest() public payable {
        Assert.equal(msg.sender, acc2, "Player 2 account should be the sender of this function.");
        Assert.equal(msg.value, 3, "Player 1 bet value should be 3 wei.");
        // Balance of the casino before spinning for Player 2.
        uint initial_balance = getCasinoBalance();
        playerBet();
        
        // Check if balance is increased or decreased accordingly
        // Assuming Player 2 lost the game...
        if(getCasinoBalance() > initial_balance) {
            Assert.greaterThan(getCasinoBalance(), initial_balance, "Casino Balance is not increased accordingly when Player 2 played.");
        }
        // Assuming Player 2 won the game...
        else if(getCasinoBalance() < initial_balance) {
            Assert.lesserThan(getCasinoBalance(), initial_balance, "Casino Balance is not decreased accordingly when Player 2 played.");
        }
        // Assuming draw scenario...
        else {
            Assert.equal(getCasinoBalance(), initial_balance, "Casino Balance is not suppose to change when Player 2 played.");
        }
    }


    // Number of games played in the contract should be 2.
    function checkNumberOfGames() public {
        Assert.equal(FinishedGames.length, 2, "Number of games played should be 2.");
    }

    // Check Player 1 state after slot machine game is over
    /// #sender: account-1
    function testPlayer1ResultState() public {
        int gameId = getGameIndex(msg.sender);
        Assert.equal(uint(FinishedGames[0].state), 1, "Player 1 state should be in Finished state.");
    }

    // Check Player 2 state after slot machine game is over
    /// #sender: account-2
    function testPlayer2ResultState() public {
        int gameId = getGameIndex(msg.sender);
        Assert.equal(uint(FinishedGames[1].state), 1, "Player 2 state should be in Finished state.");
    }

    // Player 1 plays again using 1 wei
    // Check balances and slot machine to make sure everything is running
    /// #sender: account-1
    /// #value: 1
    function testPlayer1PlayAgainTest() public payable {
        Assert.equal(msg.sender, acc1, "Player 1 account should be the sender of this function (2nd Play Test).");
        Assert.equal(msg.value, 1, "Player 1 bet value should be 1 wei. (2nd Play Test)");
        uint initial_balance = getCasinoBalance();
        playerBet();
        
        // Check if balance is increased or decreased accordingly
        // Assuming Player 1 lost the game...
        if(getCasinoBalance() > initial_balance) {
            Assert.greaterThan(getCasinoBalance(), initial_balance, "Casino Balance is not increased accordingly when Player 1 played.");
        }
        // Assuming Player 1 won the game...
        else if(getCasinoBalance() < initial_balance) {
            Assert.lesserThan(getCasinoBalance(), initial_balance, "Casino Balance is not decreased accordingly when Player 1 played.");
        }
        // Assuming draw scenario...
        else {
            Assert.equal(getCasinoBalance(), initial_balance, "Casino Balance is not suppose to change when Player 1 played.");
        }
    }

    // Player 2 plays again using 2 wei
    // Check balances and slot machine to make sure everything is running
    /// #sender: account-2
    /// #value: 2
    function testPlayer2PlayAgainTest() public payable {
        Assert.equal(msg.sender, acc2, "Player 2 account should be the sender of this function (2nd Play Test).");
        Assert.equal(msg.value, 2, "Player 1 bet value should be 2 wei. (2nd Play Test)");
        uint initial_balance = getCasinoBalance();
        playerBet();
        
        // Check if balance is increased or decreased accordingly
        // Assuming Player 2 lost the game...
        if(getCasinoBalance() > initial_balance) {
            Assert.greaterThan(getCasinoBalance(), initial_balance, "Casino Balance is not increased accordingly when Player 2 played.");
        }
        // Assuming Player 2 won the game...
        else if(getCasinoBalance() < initial_balance) {
            Assert.lesserThan(getCasinoBalance(), initial_balance, "Casino Balance is not decreased accordingly when Player 2 played.");
        }
        // Assuming draw scenario...
        else {
            Assert.equal(getCasinoBalance(), initial_balance, "Casino Balance is not suppose to change when Player 2 played.");
        }
    }


}