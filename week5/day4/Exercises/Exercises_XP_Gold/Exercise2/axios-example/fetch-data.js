const axios = require('axios');

async function fetchData() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        response.data.forEach(element => {
            console.log(element.title);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

module.exports = fetchData;