let form = document.querySelector(".expense-form");
let expenseTitle = document.querySelector("#title");
let expenseAmount = document.querySelector("#amount");
let date = document.querySelector("#date");
let category = document.querySelector("#category");
let totalBudget = document.querySelector("#total-budget");
let totalSpent = document.querySelector("#total-spent");
let remainingBudget = document.querySelector("#remaining");

// Page load hone par cards show karo
window.addEventListener("DOMContentLoaded", addToCard);


function saveToLocal(obj){
   if(localStorage.getItem("task") === null){
    let oldStorage = [];
    oldStorage.push(obj);
    localStorage.setItem("task", JSON.stringify(oldStorage));
   }
   else{
    let oldStorage = localStorage.getItem("task");
    oldStorage = JSON.parse(oldStorage);
    oldStorage.push(obj);
    localStorage.setItem("task" , JSON.stringify(oldStorage));
   }
}

function addToCard(){
    let allStorage = JSON.parse(localStorage.getItem("task"));

    allStorage.forEach(function(item) {
  // Main card div
  const card = document.createElement("div");
  card.classList.add("expense-card");

  // Expense Info Container
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("expense-info");

  // Title
  const titleSpan = document.createElement("span");
  titleSpan.classList.add("expense-title");
  titleSpan.textContent = item.titleCheck;

  // Category
  const categorySpan = document.createElement("span");
  categorySpan.classList.add("expense-category");
  categorySpan.textContent = `Category: ${item.categoryCheck}`;

  // Date
  const dateSpan = document.createElement("span");
  dateSpan.classList.add("expense-date");
  dateSpan.textContent = `Date: ${item.dateCheck}`;

  // Append title, category, date to infoDiv
  infoDiv.appendChild(titleSpan);
  infoDiv.appendChild(categorySpan);
  infoDiv.appendChild(dateSpan);

  // Amount div
  const amountDiv = document.createElement("div");
  amountDiv.classList.add("expense-amount");
  amountDiv.textContent = item.amountCheck;

  // Append infoDiv and amountDiv to card
  card.appendChild(infoDiv);
  card.appendChild(amountDiv);

  // Append card to container (example: .expense-list)
  document.querySelector(".expense-list").appendChild(card);

    });
}

form.addEventListener("submit" , function(dets){
    dets.preventDefault();

    let titleCheck = expenseTitle.value.trim();
    let amountCheck = expenseAmount.value;
    let dateCheck = date.value;
    let categoryCheck = category.value;

    if(titleCheck === ""){
        alert("Enter a Title.");
        return;
    }
    if(amountCheck <= 0 ){
        alert("Enter a Amount or Valid Amount.");
        return;
    }
    if(dateCheck === ""){
        alert("Enter a date.");
        return;
    }
    if(categoryCheck == ""){
        alert("Enter a Category.");
        return;
    }

    saveToLocal({
        titleCheck,
        amountCheck,
        dateCheck,
        categoryCheck,
    });
 form.reset();
 addToCard();
  let budgetValue = Number(totalBudget.textContent);    // Total budget span ka value
  let spentValue = Number(totalSpent.textContent);      // Ab tak ka kharcha
  let newSpent = spentValue + Number(amountCheck);      // Naya kharcha add karo
  let newRem = budgetValue - newSpent;                  // Remaining nikal lo

  totalSpent.textContent = newSpent;
  remaining.textContent = newRem;

});

let filter = document.querySelector("#filterCategory");

filter.addEventListener("change" , function(){
    let selectedCategory = filter.value;

    let cards = document.querySelectorAll(".expense-card");

    cards.forEach(function(card){
        let categoryText = card.querySelector(".expense-category").textContent.toLowerCase();

        if(selectedCategory === "all" || categoryText.includes(selectedCategory)){
            card.style.display = "flex";
        }
        else{
            card.style.display = "none";
        }
    });
});


