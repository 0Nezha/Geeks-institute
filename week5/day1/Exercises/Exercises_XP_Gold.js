//Exercise 1 : Promise.all()
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'foo');
});
// expected output: Array [3, 42, "foo"]
Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log(values); 
  })
  .catch(error => {
    console.error(error);
  });
/*
Promise.all attend que toutes les promesses soient résolues et retourne un tableau avec leurs valeurs dans le même ordre.  
Si une seule promesse est rejetée, elle renvoie directement l’erreur et s’arrête.
*/


//Exercise 2 : Analyse Promise.all()
function timesTwoAsync(x) {
  return new Promise(resolve => resolve(x * 2));
}

const arr = [1, 2, 3];
const promiseArr = arr.map(timesTwoAsync);

Promise.all(promiseArr)
  .then(result => {
    console.log(result);
  });
//output : [ 2, 4, 6 ]  
// Chaque nombre de [1, 2, 3] est multiplié par 2 dans une promesse.
// Promise.all attend toutes les promesses et retourne [2, 4, 6].
