import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
};

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
