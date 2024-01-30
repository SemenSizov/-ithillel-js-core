// За допомогою StarWars Api https://swapi.dev/ and fetch API зробити наступне:
import request from 'request'

// 1. Використовуючи методи классу Proimse отримати масив назв плданет перших 10 id
function getPlanetNames(url){
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

Promise.all([
    getPlanetNames('https://swapi.dev/api/planets/1'),
    getPlanetNames('https://swapi.dev/api/planets/2'),
    getPlanetNames('https://swapi.dev/api/planets/3'),
    getPlanetNames('https://swapi.dev/api/planets/4'),
    getPlanetNames('https://swapi.dev/api/planets/5'),
    getPlanetNames('https://swapi.dev/api/planets/6'),
    getPlanetNames('https://swapi.dev/api/planets/7'),
    getPlanetNames('https://swapi.dev/api/planets/8'),
    getPlanetNames('https://swapi.dev/api/planets/9'),
    getPlanetNames('https://swapi.dev/api/planets/10')
])
    .then(arr => arr.map(planet => planet.name))
    .then(names => console.log(names))

//////OR OTHER VARIANT
// const planetUrls = [];
// for (let i = 1; i <= 10; i++) {
//     planetUrls.push(`https://swapi.dev/api/planets/${i}`);
// }
// Promise.all(planetUrls.map(url => getPlanetNames(url)))
//     .then(arr => arr.map(planet => planet.name))
//     .then(names => console.log(names))


// 2 Вивеcти в консоль назви всіх "starships" котрими володів Han Solo (id = 14):
//    2.1 Використовуючи методи классу Proimse
function getHanSoloStarshipsPromise() {
    const hanSoloUrl = 'https://swapi.dev/api/people/14/';
    return fetch(hanSoloUrl)
        .then(response => {
            return response.json();
        })
        .then(hanSoloData => {
            const starshipPromises = hanSoloData.starships.map(starshipUrl => {
                return fetch(starshipUrl)
                    .then(response => {
                        return response.json();
                    })
                    .then(starshipData => starshipData.name);
            });
            return Promise.all(starshipPromises);
        });
}
getHanSoloStarshipsPromise()
    .then(starshipNames => console.log('promices',starshipNames))

//    2.2 Використовуючи async/await
async function getHanSoloStarshipsAsync() {
    try {
        const hanSoloUrl = 'https://swapi.dev/api/people/14/';
        const hanSoloResponse = await fetch(hanSoloUrl);
        if (!hanSoloResponse.ok) {
            throw new Error('error');
        }
        const hanSoloData = await hanSoloResponse.json();
        const starshipPromises = hanSoloData.starships.map(async starshipUrl => {
            const starshipResponse = await fetch(starshipUrl);
            if (!starshipResponse.ok) {
                throw new Error('error');
            }
            const starshipData = await starshipResponse.json();
            return starshipData.name;
        });

        const starshipNames = await Promise.all(starshipPromises);
        console.log('async/await', starshipNames);
    } catch (error) {
        console.error('error', error);
    }
}

await getHanSoloStarshipsAsync();

// 3. Зібрати в масив назви вісіх резидентів "residents", з усіх планет що були у фільмі "Return of the Jedi" (id = 3). Використовуйте async/await
// Масив має мати наступний вигляд
// [
//   {
//     planetName: 'SomePlanet1', 
//     residents: ['Han Solo', 'r2d2']
//   },
//   {
//     planetName: 'SomePlanet2',
//     residents: ['Luke Skywalker', 'C3PO']
//   }
// }
async function fetchPlanetResidents() {
    try {
        const response = await fetch('https://swapi.dev/api/films/3/');
        const data = await response.json();
        const planets = data.planets;
        const planetResidentsPromises = planets.map(async (planetUrl) => {
            const planetResponse = await fetch(planetUrl);
            const planetData = await planetResponse.json();

            const residentsPromises = planetData.residents.map(async (residentUrl) => {
                const residentResponse = await fetch(residentUrl);
                const residentData = await residentResponse.json();
                return residentData.name;
            });
            const residents = await Promise.all(residentsPromises);
            return {
                planetName: planetData.name,
                residents: residents,
            };
        });
        const planetResidents = await Promise.all(planetResidentsPromises);
        console.log(planetResidents);
        return planetResidents;
    } catch (error) {
        console.error('error', error);
    }
}

await fetchPlanetResidents();