//Exercise 1 : Giphy API #3
let form=document.querySelector("form");
let input=document.querySelector("input");
let delete_btn=document.querySelector("#submit");
form.addEventListener("submit",async (event)=>{
    event.preventDefault();
    let search=input.value;
    //3
    const Giphy=async()=>{
        try{
            
            const response=await fetch(`https://api.giphy.com/v1/gifs/search?q=${search}&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My`);
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data=await response.json();
            console.log(data);
            const random_number=Math.floor(Math.random()*data.data.length);
            //4
            const GIF=data.data[random_number].images.original.url;
            const img= document.createElement("img");
            img.src=GIF;
            document.body.appendChild(img);
        }
        catch(error){
            console.error("Error fetching data from Giphy API:", error);
        }
    }
    Giphy();
}); 
//5
delete_btn.addEventListener("click",()=>{
    let images=document.querySelectorAll("img");
    images.forEach(img=>img.remove());
});

//Exercise 2 : Analyze #4
let resolveAfter2Seconds = function () {
    console.log("starting slow promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("slow");
            console.log("slow promise is done");
        }, 2000);
    });
};

let resolveAfter1Second = function () {
    console.log("starting fast promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("fast");
            console.log("fast promise is done");
        }, 1000);
    });
};

//The Promise.all() method returns a single Promise that fulfills when all of the promises passed as an iterable have been fulfilled.

let concurrentPromise = function () {
    console.log('==CONCURRENT START with Promise.all==');
    return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then((messages) => {
        console.log(messages[0]);
        console.log(messages[1]);
    });
}

setTimeout(concurrentPromise, 1000)
//output:
//wait 1 seconds
// ==CONCURRENT START with Promise.all==
// starting slow promise
// starting fast promise
// wait 1s ::(1s d’attente + 1s du fast)
// fast promise is done
// wait 2s ::(1s d’attente + 2s du fast)  pour afficher slow promise is done 
// slow promise is done
// slow
// fast

//Exercise 3 : Analyze #5
let resolveAfter2Seconds = function () {
    console.log("starting slow promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("slow");
            console.log("slow promise is done");
        }, 2000);
    });
};

let resolveAfter1Second = function () {
    console.log("starting fast promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("fast");
            console.log("fast promise is done");
        }, 1000);
    });
};

let parallel = async function () {
    console.log('==PARALLEL with await Promise.all==');
    // Start 2 "jobs" in parallel and wait for both of them to complete
    await Promise.all([
        (async () => console.log(await resolveAfter2Seconds()))(),
        (async () => console.log(await resolveAfter1Second()))()
    ]);
}

setTimeout(parallel, 5000)
//output:
// wait 5 seconds
// ==PARALLEL with await Promise.all==
// starting slow promise
// starting fast promise
// (fast termine après 1s)
// fast promise is done
// fast
// (slow termine après 2s)
// slow promise is done
// slow



// //Exercise 4 : Analyze #6
let resolveAfter2Seconds = function () {
    console.log("starting slow promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("slow");
            console.log("slow promise is done");
        }, 2000);
    });
};

let resolveAfter1Second = function () {
    console.log("starting fast promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("fast");
            console.log("fast promise is done");
        }, 1000);
    });
};

// This function does not handle errors. See warning below!
let parallelPromise = function () {
    console.log('==PARALLEL with Promise.then==');
    resolveAfter2Seconds().then((message) => console.log(message));
    resolveAfter1Second().then((message) => console.log(message));
}

setTimeout(parallelPromise, 13000)
//output:
// ==PARALLEL with Promise.then==
// starting slow promise
// starting fast promise
// fast promise is done
// fast
// slow promise is done
// slow
