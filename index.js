import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shopl-ebb82-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const ShoppingListInDB = ref(database, "ShoppingList")


const shoppingListEl = document.getElementById("shopping-list")
const inputField = document.getElementById("input-field")

const addBtn = document.getElementById("add-btn")
addBtn.addEventListener("click",function() {
    let inputvalue =  inputField.value

    push(ShoppingListInDB, inputvalue)

    clearInputFieldEl()
    
    // displayItemToShoppingListEl(inputvalue)
    
})


onValue(ShoppingListInDB, function(snapshot) {
    
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            displayItemToShoppingListEl(currentItem)
        }    
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
    
    
})


function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}


function clearInputFieldEl() {
    inputField.value = ""

}

function displayItemToShoppingListEl(item) {

   let itemID = item[0]
   let itemvalue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemvalue


    newEl.addEventListener("click", function(){
        
        let exactLocationOfItemInDb = ref(database, `ShoppingList/${itemID}`)
        remove(exactLocationOfItemInDb)
    })

    shoppingListEl.append(newEl)
}




