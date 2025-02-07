const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  // Nettoyage de la base de données
  await prisma.bookingPassenger.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.passenger.deleteMany({});
  await prisma.stopover.deleteMany({});
  await prisma.flight.deleteMany({});
  await prisma.airport.deleteMany({});
  await prisma.location.deleteMany({});
  await prisma.airlineCompany.deleteMany({});
  await prisma.user.deleteMany({});

  // Création des utilisateurs
  const adminHashedPassword = await hash("admin123", 10);
  const baseUserHashedPassword = await hash("user123", 10);

  const adminUser = await prisma.user.create({
    data: {
      email: "admin@example.com",
      hashedPassword: adminHashedPassword,
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
      status: "ACTIVE",
      isAdmin: true,
      phoneNotification: false,
      phoneNumber: "+33123456789",
    },
  });

  const baseUser = await prisma.user.create({
    data: {
      email: "user@example.com",
      hashedPassword: baseUserHashedPassword,
      firstName: "Base",
      lastName: "User",
      role: "USER",
      status: "ACTIVE",
      isAdmin: false,
      phoneNotification: true,
      phoneNumber: "+33123456789",
    },
  });

  // Création des emplacements
  const paris = await prisma.location.create({
    data: {
      city: "Paris",
      country: "France",
    },
  });

  const mars = await prisma.location.create({
    data: {
      city: "New Mars City",
      country: "Mars",
    },
  });

  // Création des aéroports
  const parisSpaceport = await prisma.airport.create({
    data: {
      airportName: "Paris Spaceport",
      servedCities: ["Paris", "Lyon", "Marseille"],
      locationId: paris.id,
    },
  });

  const marsSpaceport = await prisma.airport.create({
    data: {
      airportName: "Mars Central Spaceport",
      servedCities: ["New Mars City", "Olympus Mons Colony"],
      locationId: mars.id,
    },
  });

  // Création de la compagnie spatiale
  const spaceX = await prisma.airlineCompany.create({
    data: {
      companyName: "SpaceX Interplanetary",
    },
  });

  // Création d'un vol
  const flight = await prisma.flight.create({
    data: {
      bookingOpenStatus: true,
      flightStatus: "SCHEDULED",
      departureAirportId: parisSpaceport.id,
      arrivalAirportId: marsSpaceport.id,
      departureDate: new Date("2024-12-24T10:00:00Z"),
      arrivalDate: new Date("2024-12-25T10:00:00Z"),
      airlineCompanyId: spaceX.id,
    },
  });

  // Création d'un passager
  const passenger = await prisma.passenger.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      age: 30,
    },
  });

  // Création d'une réservation
  const booking = await prisma.booking.create({
    data: {
      bookingStatus: "CONFIRMED",
      userId: baseUser.id,
      flightId: flight.id,
      passengers: {
        create: [
          {
            passengerId: passenger.id,
          },
        ],
      },
    },
  });

  console.log("Données de seed créées avec succès !");
  console.log({
    users: { adminUser, baseUser },
    locations: { paris, mars },
    airports: { parisSpaceport, marsSpaceport },
    airline: spaceX,
    flight,
    passenger,
    booking,
  });
}

main()
  .catch((error) => {
    console.error("Une erreur est survenue lors du seed :", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
