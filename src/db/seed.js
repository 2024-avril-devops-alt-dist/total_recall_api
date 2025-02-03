require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");

async function run() {
  const uri = process.env.DATABASE_URL;
  if (!uri) {
    console.error("DATABASE_URL is not defined in .env");
    process.exit(1);
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(); // will use the default database from the connection string

    // clean slate
    await db.collection("user").deleteMany({});
    await db.collection("location").deleteMany({});
    await db.collection("airlinecompany").deleteMany({});
    await db.collection("airport").deleteMany({});
    await db.collection("flight").deleteMany({});
    await db.collection("passenger").deleteMany({});
    await db.collection("booking").deleteMany({});
    await db.collection("bookingpassenger").deleteMany({});
    await db.collection("stopover").deleteMany({});

    // Hash passwords
    const adminPasswordHash = await bcrypt.hash("ImThe8055OfthiSapp", 10);
    const user0PasswordHash = await bcrypt.hash("user0pass", 10);
    const user1PasswordHash = await bcrypt.hash("user1pass", 10);

    // Insert Mock Users
    await db.collection("user").insertMany([
      {
        email: "admin@admin.com",
        password: adminPasswordHash,
        phoneNotification: false,
        phoneNumber: null,
        bookings: [],
        role: "ADMIN",
      },
      {
        email: "user0@example.com",
        password: user0PasswordHash,
        phoneNotification: true,
        phoneNumber: "+1234567890",
        role: "USER",
        bookings: [],
      },
      {
        email: "user1@example.com",
        password: user1PasswordHash,
        phoneNotification: true,
        phoneNumber: "+0987654321",
        role: "USER",
        bookings: [],
      },
    ]);

    // Insert Locations
    const [loc1Res, loc2Res] = await db
      .collection("location")
      .insertMany([
        {
          city: "Mars City",
          country: "Mars",
          airports: [],
          stopovers: [],
        },
        {
          city: "Luna Prime",
          country: "Moon",
          airports: [],
          stopovers: [],
        },
      ])
      .then((res) => [res.insertedIds[0], res.insertedIds[1]]);

    // Insert Airline Company
    const airlineRes = await db.collection("airlinecompany").insertOne({
      companyName: "Intergalactic Express",
      flights: [],
    });
    const airlineId = airlineRes.insertedId;

    // Insert Airports
    const airportRes = await db.collection("airport").insertMany([
      {
        airportName: "Mars Interstellar Hub",
        servedCities: ["Mars City"],
        locationId: loc1Res,
        departures: [],
        arrivals: [],
      },
      {
        airportName: "Luna Spaceport",
        servedCities: ["Luna Prime"],
        locationId: loc2Res,
        departures: [],
        arrivals: [],
      },
    ]);

    const marsAirportId = Object.values(airportRes.insertedIds)[0];
    const lunaAirportId = Object.values(airportRes.insertedIds)[1];

    // Insert Flights
    const flightRes = await db.collection("flight").insertMany([
      {
        bookingOpenStatus: true,
        flightStatus: "SCHEDULED",
        departureAirportId: marsAirportId,
        arrivalAirportId: lunaAirportId,
        departureDate: new Date("2025-01-01T10:00:00Z"),
        arrivalDate: new Date("2025-01-01T12:00:00Z"),
        airlineCompanyId: airlineId,
        stopovers: [],
        bookings: [],
      },
      {
        bookingOpenStatus: true,
        flightStatus: "SCHEDULED",
        departureAirportId: lunaAirportId,
        arrivalAirportId: marsAirportId,
        departureDate: new Date("2025-01-02T10:00:00Z"),
        arrivalDate: new Date("2025-01-02T14:00:00Z"),
        airlineCompanyId: airlineId,
        stopovers: [],
        bookings: [],
      },
    ]);
    const firstFlightId = Object.values(flightRes.insertedIds)[0];
    const secondFlightId = Object.values(flightRes.insertedIds)[1];

    // Insert Passengers
    const passengerRes = await db.collection("passenger").insertMany([
      {
        firstName: "John",
        lastName: "Doe",
        age: 30,
        bookings: [],
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        age: 25,
        bookings: [],
      },
    ]);
    const johnId = Object.values(passengerRes.insertedIds)[0];
    const janeId = Object.values(passengerRes.insertedIds)[1];

    // Insert Booking
    // Let's associate this booking with user1 and the first flight
    const user1 = await db
      .collection("user")
      .findOne({ email: "user1@example.com" });
    await db.collection("booking").insertOne({
      bookingStatus: "CONFIRMED",
      userId: user1._id,
      flightId: firstFlightId,
      passengers: [],
    });
    const booking = await db
      .collection("booking")
      .findOne({ userId: user1._id });

    // Insert BookingPassengers
    await db.collection("bookingpassenger").insertMany([
      {
        bookingId: booking._id,
        passengerId: johnId,
      },
      {
        bookingId: booking._id,
        passengerId: janeId,
      },
    ]);

    // Insert Stopover
    await db.collection("stopover").insertOne({
      arrivalDate: new Date("2025-01-01T11:00:00Z"),
      departureDate: new Date("2025-01-01T11:30:00Z"),
      locationId: loc2Res,
      flightId: firstFlightId,
    });

    console.log("Data inserted successfully!");
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    await client.close();
  }
}

run();
