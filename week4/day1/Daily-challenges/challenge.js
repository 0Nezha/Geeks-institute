let client = "John";

const groceries = {
    fruits : ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice : "20$",
    other : {
        paid : true,
        meansOfPayment : ["cash", "creditCard"]
    }
}
//1:
const displayGroceries = () =>{
groceries.fruits.forEach(fruit => console.log(fruit));
};
displayGroceries();
//2:
const cloneGroceries = () =>{
        let user = client;
        console.log("User:", user);
        client = "Betty"; 
        console.log("Client:", client);
        console.log("User after change:", user);
        //Will we also see this modification in the user variable ? NO
        //WHY? Strings, being primitive types, are copied by value, not linked by reference. That means user holds its own separate copy.
        const shopping = groceries; 
        shopping.totalPrice = "35$"; 
        console.log("Shopping totalPrice:", shopping.totalPrice);
        console.log("Groceries totalPrice:", groceries.totalPrice);
        //Will we also see this modification in the shopping object ? Yes
        //Why? Both variables point to the same memory location, since JavaScript handles objects by reference.
        shopping.other.paid = false; 
        console.log("Groceries paid:", groceries.other.paid);
        console.log("Shopping paid:", shopping.other.paid);
        //Will we also see this modification in the shopping object ? Yes
        //Why? because both shopping and groceries refer to the same object in memory, The paid value is shared between the two variables, so any update to it is visible from both shopping and groceries.

};
//3:
cloneGroceries();