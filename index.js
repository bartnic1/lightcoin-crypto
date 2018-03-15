class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    // Calculate the balance using the transaction objects.
  let total = 0;
  this.transactions.forEach(function(transactionObject) {
    total += transactionObject.value;
  })
  return total;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  get isAllowed(){
    //Presumably, a transaction will never instantiated on its own, but always as part of a subclass that has
    //a value getter.
    //Thus it is safe to call this.value in the superclass
    return this.account.balance + this.value > 0;
  }

  commit() {
    if(this.isAllowed){
      // Keep track of the time of the transaction
      this.time = new Date();
      // Add the transaction to the account
      this.account.addTransaction(this);
      return true;
    }else{
      return false;
    }
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

console.log("Name", myAccount.username, "Initial balance", myAccount.balance)

t1 = new Withdrawal(50.25, myAccount);
let res1 = t1.commit();
console.log('Transaction 1:', t1);
console.log('Commit result:', res1);
console.log('Balance:', myAccount.balance);

t2 = new Deposit(10, myAccount);
let res2 = t2.commit();
console.log('Transaction 2:', t2);
console.log('Commit result:', res2);
console.log('Balance:', myAccount.balance);

t3 = new Withdrawal(9.99, myAccount);
let res3 = t3.commit();
console.log('Transaction 2:', t3);
console.log('Commit result:', res3);
console.log('Balance:', myAccount.balance);

t4 = new Deposit(120.00, myAccount);
let res4 = t4.commit();
console.log('Transaction 3:', t4);
console.log('Commit result:', res4);
console.log('Balance:', myAccount.balance);
