import request from "supertest";
import createTestServer from "@/app/server";

let server: any;

beforeAll(async () => {
  server = await createTestServer();
});

afterAll((done) => {
  server.close(done);
});

describe("Users API", () => {
  it("should create a new user", async () => {
    const newUser = {
      email: "testuser@example.com",
      password: "password123",
      phoneNotification: false,
    };

    const response = await request(server)
      .post("/api/users")
      .send(newUser)
      .set("Accept", "application/json");

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "User created successfully"
    );
  });

  it("should not create a user with existing email", async () => {
    const newUser = {
      email: "testuser@example.com",
      password: "password123",
      phoneNotification: false,
    };

    const response = await request(server)
      .post("/api/users")
      .send(newUser)
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Email already in use");
  });
});
