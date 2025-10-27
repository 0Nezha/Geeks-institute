const { faker } = require("@faker-js/faker");

const users = [];

function addUser(name, address, country) {
  users.push({ name, address, country });
  console.log(`User ${name} added successfully.`);
}

addUser(
  faker.person.fullName(),
  faker.location.streetAddress(),
  faker.location.country()
);

console.log("Users:", users);