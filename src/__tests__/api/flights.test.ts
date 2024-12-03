import request from "supertest";
import createTestServer from "@/app/server";

let server: any;

beforeAll(async () => {
  server = await createTestServer();
});

afterAll((done) => {
  server.close(done);
});

describe("Flights API", () => {
  it("should fetch all flights", async () => {
    const response = await request(server).get("/api/flights");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should create a new flight", async () => {
    const newFlight = {
      bookingOpenStatus: true,
      flightStatus: "SCHEDULED",
      departureAirportId: "someDepartureAirportId",
      arrivalAirportId: "someArrivalAirportId",
      departureDate: new Date().toISOString(),
      arrivalDate: new Date().toISOString(),
      airlineCompanyId: "someAirlineCompanyId",
    };

    const response = await request(server)
      .post("/api/flights")
      .send(newFlight)
      .set("Accept", "application/json");

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.bookingOpenStatus).toBe(true);
  });
});
