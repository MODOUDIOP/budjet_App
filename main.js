//Iteme controler

const itemCtrl = (function(){
//item controler
const Item = function(id, description, account){
    this.id = id;
    this.description = description;
    this.account = account;
}
    //data structure
    const data ={
        items:[]
    }
    //public method
    return{
      logData: function(){
        return data;
      },
      addMoney: function(description, amount){
        // create randon id
        let ID = itemCtrl.createID();
        // create new item
        newMoney = new Item(ID, description, amount);
        // push it into the array
        data.items.push(newMoney);
        return newMoney;
      },
      createID: function(){
        // create randon id number between 0 and 10000
        const idNum = Math.floor(Math.random()*10000);
        return idNum;
      },
      getIdNumber: function(item){
        // get the item id
        const amountId = (item.parentElement.id);
        // break the id into an array
        const itemArr = amountId.split('-');
        // get the id number
        const id = parseInt(itemArr[1]);
        return id;
      }  
    }
})();
//UI CONTROLER
const UICtrl = (function(){
    //UI selectotrs
    const UIselectors = {
        inComeBnt: '#add-income',
        expenseBtn: '#add-expense',
        description: '#description',
        amount: '#account',
        moneyEarned: '#account-earned',
        moneyAvailable: '#account-available',
        moneySpent: '#account-speat',
        incomeList: '#income-contenair',
        expenseList: '#expreses-contenair',
        incomeItem: '.income-account',
        expenseItem: '.expreses-account',
        itemsContainer: '.items-contenair'
    }
        // public method
        return{
            // return UI selectors
            getSelectors: function(){
                return UIselectors
            },
            getDescriptionInput: function(){
                return{
                    descriptionInput:document.querySelector(UIselectors.description).value
                }
            },
            getValueInput: function(){
            return{
                amountInput: document.querySelector(UIselectors.amount).value
            }
           },
           addIncomeItem: function(item){
            // create new div
            const div = document.createElement('div');
            // add class
            div.classList = 'item income'
            // add id to the item
            div.id = `item-${item.id}`
            // add html
            div.innerHTML = `
            
            <h4>${ item.description}</h4>
            <div class="items_income">
                <p class="symbole">$</p>
                <span class="income-account">${item.account}</span>

            </div>
            <i class="fa-solid fa-pen" id="pen" ></i>
            <i class="far fa-trash-alt" ></i>
           
            `;
            
            // insert income into the list
            document.querySelector(UIselectors.incomeList).insertAdjacentElement('beforeend', div);
           },
           clearInputs: function(){
            document.querySelector(UIselectors.description).value = ''
            document.querySelector(UIselectors.amount).value = ''
           },
           updateEarned: function(){
            // all income elements
            const allIcome = document.querySelectorAll(UIselectors.incomeItem);
            //array with all incomes
            const incomeCount = [...allIcome].map(item => +item.innerHTML);
            // calculate the total earned
            const incomeSun = incomeCount.reduce(function(a,b){
                return a+b
            },0);
            // display the total earned
            const earnedTotal = document.querySelector(UIselectors.moneyEarned).innerHTML = incomeSun.toFixed(2);
           },
           addExpenseItem: function(item){

            // create new div
            const div = document.createElement('div');
            // add class
            div.classList = 'item expense'
            // add id to the item
            div.id = `item-${item.id}`
            // add html
            div.innerHTML = `
            
            <h4>${ item.description}</h4>
            <div class="items_expreses">
                <p class="symbole">$</p>
                <span class="expreses-account">${item.account}</span>

            </div>
            <i class="fa-solid fa-pen" id="pen" ></i>
            <i class="far fa-trash-alt" ></i>
            `;
            // insert income into the list
            document.querySelector(UIselectors.expenseList).insertAdjacentElement('beforeend', div);

           },
           updateSpent: function(){
            // all expenses elements
            const allExpenses = document.querySelectorAll(UIselectors.expenseItem);
            // array with all expenses
            const expenseCount = [... allExpenses].map(item => +item.innerHTML)
            console.log(expenseCount);
            // calculate the total
            const expenseSum = expenseCount.reduce(function(a,b){
                return a+b
            },0)
            // display the total spent
           const expenseTotal = document.querySelector(UIselectors.moneySpent).innerHTML=expenseSum;
           },
           updateAvailable: function(){
            const earned = document.querySelector(UIselectors.moneyEarned);
            const spent = document.querySelector(UIselectors.moneySpent);
            const available = document.querySelector(UIselectors.moneyAvailable);
            available.innerHTML = ((+earned.innerHTML)-(+spent.innerHTML)).toFixed(2)
           },
           deleteAmount: function(id){
            // create the id we will select
            const amountId = `#item-${id}`;
            // select the amount with the id we passed
            const amountDelete = document.querySelector(amountId);
            // remove from ui
            amountDelete.remove();
           }
        }
})();
/// APP CONTROLER
const App =(function(){
    // event listeners
    const loadEvenlisteners = function(){
        // get ui selectors
        const UIselectors = UICtrl.getSelectors();
        // add new income
        document.querySelector(UIselectors.inComeBnt).addEventListener
        ('click', addIncome);
        // add new expense
        document.querySelector(UIselectors.expenseBtn).addEventListener
        ('click', addExpense);
        // delete item
        document.querySelector(UIselectors.itemsContainer).addEventListener('click',deleteItem);
    }
    // int function
    // add new income
    const addIncome = function(){
       // get description and account values
       const description = UICtrl.getDescriptionInput();
       const amount = UICtrl.getValueInput();
       // if input are not empty
       if(description.descriptionInput !== 
        '' && amount.amountInput !==
        ''){
            // add new item
            const newMoney = itemCtrl.addMoney(description.descriptionInput,amount.amountInput);
            // add item to the list
            UICtrl.addIncomeItem(newMoney);
            // clear input
            UICtrl.clearInputs();
            // update Earned
            UICtrl.updateEarned();
             // calculate money available
             UICtrl.updateAvailable();

        }

    }
    // add new expense
    const addExpense = function(){
         // get description and account values
       const description = UICtrl.getDescriptionInput();
       const amount = UICtrl.getValueInput();
       // if input are not empty
       if(description.descriptionInput !== 
        '' && amount.amountInput !==
        ''){
            // add new item
            const newMoney = itemCtrl.addMoney(description.descriptionInput,amount.amountInput);
            // add item to the list
           UICtrl.addExpenseItem(newMoney);
             // clear input
            UICtrl.clearInputs();
            // uptate total spent
            UICtrl.updateSpent();
            // calculate money available
            UICtrl.updateAvailable();
          
        }
       
       


    }
    // delete item
    const deleteItem = function(e){
        if (e.target.classList.contains('far')) {
           //get id number
           const id = itemCtrl.getIdNumber(e.target)
           // delete amount from ui
           UICtrl.deleteAmount(id);
        }
        e.preventDefault()
    }

    // init function
    return{
        init: function(){
            loadEvenlisteners();
        }
    }
})(itemCtrl,UICtrl);
App.init()



