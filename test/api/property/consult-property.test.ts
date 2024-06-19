import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
};

test("Get property infos by Id", async function () {
  const responseListProperty = await axios.get(
    `http://localhost:3000/property?propertyId=cff6bd2b-d172-41db-871a-4b546ce440c0`
  );
  const property = responseListProperty.data.property;

  expect(property.propertyId).toBeDefined();
  expect(property.title).toBeDefined();
  expect(property.price).toBeDefined();
  expect(property.description).toBeDefined();
  expect(property.purpose).toBeDefined();
  expect(property.category).toBeDefined();
  expect(property.address).toBeDefined();
  expect(property.number).toBeDefined();
  expect(property.neighborhood).toBeDefined();
  expect(property.city).toBeDefined();
  expect(property.state).toBeDefined();
  expect(property.zipCode).toBeDefined();
  expect(property.totalArea).toBeDefined();
  expect(property.builtArea).toBeDefined();
  expect(property.bedrooms).toBeDefined();
  expect(property.bathrooms).toBeDefined();
  expect(property.suites).toBeDefined();
  expect(property.parkingSpaces).toBeDefined();
  expect(property.pool).toBeDefined();
  expect(property.gym).toBeDefined();
  expect(property.elevator).toBeDefined();
  expect(property.petsAllowed).toBeDefined();
  expect(property.barbecueArea).toBeDefined();
  expect(property.security24h).toBeDefined();
  expect(property.furnished).toBeDefined();
  expect(property.others).toBeDefined();
  expect(new Date(property.createdAt).toISOString()).toBeDefined();
});
