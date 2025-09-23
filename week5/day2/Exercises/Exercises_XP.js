//Exercise 1 : Giphy API
const Giphy_API = async() =>{
    try{
        const response=await fetch("https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
            console.log(response);
            const data=await response.json();
            console.log(data);
        }
    }
    catch(error){
        console.error('There was a problem with the fetch operation:', error);
    }
}
Giphy_API();

//Exercise 2 : Giphy API
const Giphy_API2 = async() =>{
    try{
        const response=await fetch(`https://api.giphy.com/v1/gifs/search?q=sun&limit=10&offset=2&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
            console.log(response);
            const data=await response.json();
            console.log(data);
        }       
    }
    catch(error){
        console.error('There was a problem with the fetch operation:', error);
    }   
}
Giphy_API2();

//Exercise 3 : Async function
const fetchstarships= async()=>{
    try{
        const response=await fetch("https://www.swapi.tech/api/starships/9/");
         if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }
        const data=await response.json();
        console.log(data);
    }
    catch(error){
        console.error("Error fetching data:", error);
    }
}
fetchstarships();

//Exercise 4: Analyze
function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

async function asyncCall() {
    console.log('calling');
    let result = await resolveAfter2Seconds();
    console.log(result);
}

asyncCall();
//output:
// il va affiche "calling" immediatement
// puis il attend 2 secondes avant d'afficher "resolved"
// car la fonction resolveAfter2Seconds retourne une promesse qui se résout après 2 secondes
// et le mot clé await fait que la fonction asyncCall attend que cette promesse soit résolue avant de continuer