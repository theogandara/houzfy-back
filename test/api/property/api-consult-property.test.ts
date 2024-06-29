import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
};

test("Get property infos by Id", async function () {
  const responseListProperty = await axios.get(
    `http://localhost:3000/property?propertyId=cff6bd2b-d172-41db-871a-4b546ce440c0`
  );
  const property = responseListProperty.data.property;
});
