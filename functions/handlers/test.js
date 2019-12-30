const faker = require("faker");

exports.seedContacts = () => {
  faker.locale = "en_US";

  const id = faker.random.uuid().substr(0, 6);

  return db
    .collection("contacts")
    .doc(`${id}XXXX`)
    .set({
      address1: faker.address.streetAddress(),
      address2: `${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`,
      email: faker.internet.email(),
      company: faker.company.companyName(),
      created: faker.date.recent(),
      id: `${id}XX`,
      lastEdited: faker.date.recent(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      phone: faker.phone.phoneNumberFormat(),
      tagLine: faker.name.jobTitle(),
      title: faker.name.jobType(),
      uid: `${id}XXXX`,
      website: faker.internet.url()
    })
    .then(() => console.log(`${id} Created`))
    .catch(err => console.log(err));
};
