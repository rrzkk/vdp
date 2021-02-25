import request from "supertest";

const address = "http://localhost:8080";

it("should connect to database", async () => {
  const res = await request(address).get("/api/getall");
  expect(res.body.rowCount).not.toBeNull();
  expect(res.body.rowCount).not.toBe(0);
});

it("should processed the data", async () => {
  const res = await request(address).get("/api/getSelectedEntry");
  expect(Object.keys(res.body[0]).length).toBe(7);
});
