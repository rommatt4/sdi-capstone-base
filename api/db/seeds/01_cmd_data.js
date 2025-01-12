/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { faker } = require("@faker-js/faker");

const createFakeUsers = () => {
  const fakeUsers = [];

  for (let i = 0; i < 1; i++) {
    const user = {
      id: 1,
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      username: faker.internet.userName(),
      unit: faker.helpers.arrayElement(["A Co", "B Co", "C Co", "D Co"]),
      position: "Commander",
      password: faker.internet.password(),
      phone_number: faker.phone.number("813-###-###"),
      email: faker.internet.email(),
      type: "Commander",
    };
    fakeUsers.push(user);
  }
  return fakeUsers;
};
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("cmd_approver").del();
  await knex("cmd_approver").insert(createFakeUsers());
};
