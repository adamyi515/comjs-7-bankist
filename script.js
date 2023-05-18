'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


// Application logic starts here ///////////////////////////////////////////////////////////////
// Initialize at the beginning of the applicaiton.
createUsernames(accounts);
let currentAcct;


// Login event handler
btnLogin.addEventListener('click', function(ev){
  ev.preventDefault();

  // Capture the userinput
  const username = inputLoginUsername.value;
  const pin = parseInt(inputLoginPin.value);

  // Remove values and focus from input fields.
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  inputLoginPin.blur();

  // Find the account. 
  currentAcct = accounts.find(function(acct){
    if(acct.username === username) return acct;
  });

  // If Account NOT FOUND then exit out current process.
  if(!currentAcct) return;

  if(currentAcct.pin === pin){
    // 1. Show the application (set the opacity)
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Welcome back ${currentAcct.owner.split(' ')[0]}`

    // 2. Display movements
    displayMovements(currentAcct.movements);

    // 3. Display balance
    calcAndDisplayBalance(currentAcct.movements);

    // 4. Display Summary
    calcAndDisplaySummary(currentAcct);
  }
});






// Functions ///////////////////////////////////////////////////////////////////////////

// Loop through each of the account's movements property and display them in the application.
function displayMovements(movements){

  // Clear out the default html.
  containerMovements.innerHTML = '';

  // 1. Loop through the movements array
  movements.forEach(function(mov, i){
    // 2. In each iteration, we want to render them onto the "movements" element.
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${mov}</div>
      </div>
    `;
    
    containerMovements.insertAdjacentHTML('afterbegin', html);

  });
  
}

// Loop through account's movement array and add all total deposit & withdraw to get the balance.
function calcAndDisplayBalance(movements){
  const balance = movements.reduce(function(acc, cur){
    return acc + cur;
  }, 0);

  labelBalance.textContent = `${balance} USD`;
}

// Create a username property and use the initials of their first, middle and last name as
// their username.
function createUsernames(accts){
  accts.forEach(function(acct){
    acct.username = acct.owner.toLowerCase().split(' ').map(function(name){
      return name[0];
    }).join('');
  })
}


// Calculate the total income, expenses (withdrawal) and the interests earned based on income.
function calcAndDisplaySummary(acct){
  const currentInterest = acct.interestRate;

  const totalIncome = acct.movements
    .filter((move) => move > 0)
    .reduce((acc, cur) => acc + cur, 0);

  const totalWithdrawal = Math.abs(acct.movements
    .filter((move) => move < 0)
    .reduce((acc, cur) => acc + cur, 0));

  // Interest is based on the total income in account. Default interest is defined
  // in each account.
  const interestEarned = acct.movements
    .filter((move) => move > 0)
    .map((move) => (move * currentInterest) / 100)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumIn.textContent = `$${totalIncome}`;
  labelSumOut.textContent = `$${totalWithdrawal}`;
  labelSumInterest.textContent = `$${interestEarned}`;

}


















/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// Sections to implement
/*

Section 158 - Implement login =================

1. When clicking the login button, use the input value to check whether that user
exist within the "accounts" array. 

2. If the user is found, then check the PIN number. 
- If user is NOT found, then update the UI to let the user know that the user does not exist.

3. Check if the PIN number matches.
- If PIN matches, then use user's login information to update the UI.
- If PIN DOES NOT match, then let the user know that the PIN does not match.






*/