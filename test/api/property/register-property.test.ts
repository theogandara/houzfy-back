import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
};

test("Create a property", async function () {
  const responseNewProperty = await axios.post(
    "http://localhost:3000/new-property",
    {
      title: "Luxurious Beachfront Villa",
      price: 1500000,
      description:
        "Stunning villa with panoramic ocean views, featuring 5 bedrooms, private pool, and BBQ area.",
      purpose: "sale",
      category: "house",
      address: "Ocean Drive",
      number: "123",
      neighborhood: "Beachfront Paradise",
      city: "Coastal City",
      state: "SP",
      zipCode: "54321",
      totalArea: 800,
      builtArea: 450,
      bedrooms: 5,
      bathrooms: 6,
      suites: 4,
      parkingSpaces: 3,
      pool: true,
      gym: false,
      elevator: false,
      petsAllowed: true,
      barbecueArea: true,
      security24h: true,
      furnished: true,
      others: "Includes home theater room and spacious outdoor terrace.",
    }
  );
  const outputNewProperty = responseNewProperty.data;
  expect(outputNewProperty.propertyId).toBeDefined();
});

test("List properties", async function () {
  const responseListProperties = await axios.get(
    `http://localhost:3000/properties?page=1`
  );
  const outputNewProperty = responseListProperties.data;
  expect(outputNewProperty.pages).toBeDefined();
  expect(outputNewProperty.pageNumber).toBeDefined();
  expect(outputNewProperty.perPage).toBeDefined();
  expect(outputNewProperty.pageSize).toBeDefined();
  expect(outputNewProperty).toBeInstanceOf(Object);
});

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
