/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { faker } = require("@faker-js/faker");

const createFakeRequests = () => {
  const fakeRequests = [];

  for (let i = 0; i < 10; i++) {
    const request = {
      id: i,
      date: faker.date.soon(90, "2022-12-10T00:00:00:.000Z"),
      location: faker.helpers.arrayElement([
        "Afghanistan",
        "Mexico City",
        "Greece",
        "Virgin Islands",
        "Cancun",
        "Spain",
        "Hawaii",
        "Greenland",
      ]),
      mission_title:
        faker.commerce.productMaterial() +
        " " +
        faker.commerce.productAdjective(),
      justification: faker.commerce.productDescription(),
      sme_status: faker.helpers.arrayElement([
        "Pending",
        "Approved",
        "Rejected",
      ]),
      cmd_status: faker.helpers.arrayElement([
        "Pending",
        "Approved",
        "Rejected",
      ]),
      user_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      file: 'CONOP.pdf',
      asset_id: faker.helpers.arrayElement([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23,
      ]),

      sme_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6]),
      cmd_id: 1,
    };
    fakeRequests.push(request);
  }
  return fakeRequests;
};

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("request").insert(createFakeRequests());
};
