// Synchronous vs Asynchronous JavaScript
// console.log(1)
// console.log(2)
// setTimeout(()=>console.log('timeout1'), 500) 
// setTimeout(()=>console.log('timeout2'), 499) 
// console.log(3)
// console.log(4)
// HOW Asynchronous JS works - see https://dev.to/nodedoctors/an-animated-guide-to-nodejs-event-loop-3g62?ref=dailydev


// Async callback functions
// Need to pass a callback function to process a result of async function execution.
// In this case we need to keep in mind all possible variants - positive case and errors
import request from 'request'

request.get('https://pokeapi.co/api/v2/pokemon/1/', (error, response, body)=>{
  if(error){
    console.error(error)
  } else {
    console.log(response.statusCode)
    const pokemonObj = JSON.parse(body)
    console.log(pokemonObj.name)

    request.get(pokemonObj.species.url, (error, response, body)=>{
      if(error){
        console.error(error)
      } else {
        console.log(response.statusCode)
        const species = JSON.parse(body)
        console.log(species)

      }
    })
  }
} )

// Promises
// Promises provides more clear and convenient interface to work with async functions

const promise = new Promise((resolve, reject)=> {
  request.get('https://pokeapi.co/api/v2/pokemon/1/',(error, response, body)=>{
    if(error){
      reject(error)
    } else {
      resolve(JSON.parse(body))
    }
  })
})

promise
.then(b=> {console.log(b.name); return 1}) 
.then(r=> console.log(r))
.catch(e=>console.error(e))

fetch('https://pokeapi.co/api/v2/pokemon/1/')
.then(res=> res.json())
.then(body => fetch(body.species.url))
.then(res=> res.json())
.then(body=> console.log(body))
.catch(e=> console.log(e))

async function getPokemonApi(url){
  return new Promise((resolve, reject)=> {
    request.get(url,(error, response, body)=>{
          if(error){
            reject(error)
          } else {
            resolve(JSON.parse(body))
          }
        })
  })
  }

getPokemonApi('https://pokeapi.co/api/v2/pokemon/1/')
.then(pokemon => {console.log(pokemon.name); return getPokemonApi(pokemon.species.url)})
.then(body=> console.log(body))


Promise.all([getPokemonApi('https://pokeapi.co/api/v2/pokemon/1/'), getPokemonApi('https://pokeapi.co/api/v2/pokemon/2'), getPokemonApi('https://pokeapi.co/api/v2/pokemon/12')])
.then(arr => arr.map(p=> p.name))
.then(r=> console.log(r.name))

Promise.race([getPokemonApi('https://pokeapi.co/api/v2/pokemon/1/'), getPokemonApi('https://pokeapi.co/api/v2/pokemon/2'), getPokemonApi('https://pokeapi.co/api/v2/pokemon/12')])
.then(r=> console.log(r.name))

// Async/Await
// the "syntax sugar"  to work with promise like it is simple synchronous code

try {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/1/')
  const body = await res.json()
  const res2 = await fetch(body.species.url)
  const body2 = await res2.json()
  console.log(body2)
} catch (e){
  console.error(e)
}
