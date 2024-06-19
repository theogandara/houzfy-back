import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
};

const property = {
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
};

test("Create a property", async function () {
  const responseNewProperty = await axios.post(
    "http://localhost:3000/new-property",
    property
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
