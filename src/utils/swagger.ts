export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Total Recall API",
    version: "1.0.0",
    description: "API pour la réservation de vols interplanétaires.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server on port 3000",
    },
  ],
  paths: {
    "/api/flights": {
      get: {
        summary: "Obtenir la liste des vols",
        responses: {
          "200": {
            description: "Liste des vols",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Flight" },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Créer un nouveau vol",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/FlightCreate" },
            },
          },
        },
        responses: {
          "201": { description: "Vol créé avec succès" },
          "400": { description: "Données invalides" },
        },
      },
    },
    "/api/flights/{id}": {
      get: {
        summary: "Obtenir les détails d'un vol",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID du vol",
          },
        ],
        responses: {
          "200": { description: "Détails du vol" },
          "404": { description: "Vol introuvable" },
        },
      },
      put: {
        summary: "Mettre à jour un vol (statut, etc.)",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID du vol",
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/FlightUpdate" },
            },
          },
        },
        responses: {
          "200": { description: "Vol mis à jour avec succès" },
          "400": { description: "Données invalides" },
          "404": { description: "Vol introuvable" },
        },
      },
    },
    "/api/bookings": {
      post: {
        summary: "Créer une nouvelle réservation",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BookingCreate" },
            },
          },
        },
        responses: {
          "201": { description: "Réservation créée" },
          "400": { description: "Données invalides" },
          "404": { description: "Utilisateur, vol, ou passager introuvable" },
        },
      },
    },
    "/api/bookings/{id}": {
      get: {
        summary: "Obtenir une réservation spécifique",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID de la réservation",
          },
        ],
        responses: {
          "200": { description: "Détails de la réservation" },
          "404": { description: "Réservation introuvable" },
        },
      },
      put: {
        summary: "Mettre à jour une réservation (confirmer, annuler)",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID de la réservation",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BookingUpdate" },
            },
          },
        },
        responses: {
          "200": { description: "Réservation mise à jour" },
          "400": { description: "Données invalides" },
          "404": { description: "Réservation introuvable" },
        },
      },
    },
    "/api/users": {
      post: {
        summary: "Créer un nouvel utilisateur",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserCreate" },
            },
          },
        },
        responses: {
          "201": { description: "Utilisateur créé" },
          "400": { description: "Email déjà utilisé ou données invalides" },
        },
      },
    },
    "/api/users/{id}": {
      get: {
        summary: "Obtenir les informations d'un utilisateur",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID de l'utilisateur",
          },
        ],
        responses: {
          "200": { description: "Informations de l'utilisateur" },
          "404": { description: "Utilisateur introuvable" },
        },
      },
    },
    "/api/airports": {
      get: {
        summary: "Lister les aéroports",
        responses: {
          "200": { description: "Liste des aéroports" },
          "500": { description: "Erreur serveur" },
        },
      },
      post: {
        summary: "Ajouter un nouvel aéroport",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AirportCreate" },
            },
          },
        },
        responses: {
          "201": { description: "Aéroport créé" },
          "400": { description: "Données invalides" },
          "404": { description: "Location introuvable" },
        },
      },
    },
    "/api/airlines": {
      get: {
        summary: "Lister les compagnies aériennes",
        responses: {
          "200": { description: "Liste des compagnies aériennes" },
          "500": { description: "Erreur serveur" },
        },
      },
      post: {
        summary: "Ajouter une nouvelle compagnie aérienne",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AirlineCreate" },
            },
          },
        },
        responses: {
          "201": { description: "Compagnie créée" },
          "400": { description: "Données invalides" },
        },
      },
    },
    "/api/flights/{id}/stopovers": {
      get: {
        summary: "Lister les escales d'un vol",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID du vol",
          },
        ],
        responses: {
          "200": { description: "Liste des escales du vol" },
          "404": { description: "Vol introuvable" },
        },
      },
      post: {
        summary: "Ajouter une escale à un vol",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID du vol",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/StopoverCreate" },
            },
          },
        },
        responses: {
          "201": { description: "Escale créée" },
          "400": { description: "Données invalides" },
          "404": { description: "Vol ou Location introuvable" },
        },
      },
    },
  },
  components: {
    schemas: {
      Flight: {
        type: "object",
        properties: {
          id: { type: "string" },
          bookingOpenStatus: { type: "boolean" },
          flightStatus: {
            type: "string",
            enum: ["SCHEDULED", "CANCELLED", "COMPLETED"],
          },
          departureAirportId: { type: "string" },
          arrivalAirportId: { type: "string" },
          departureDate: { type: "string", format: "date-time" },
          arrivalDate: { type: "string", format: "date-time" },
          airlineCompanyId: { type: "string" },
        },
      },
      FlightCreate: {
        type: "object",
        required: [
          "bookingOpenStatus",
          "flightStatus",
          "departureAirportId",
          "arrivalAirportId",
          "departureDate",
          "arrivalDate",
          "airlineCompanyId",
        ],
        properties: {
          bookingOpenStatus: { type: "boolean" },
          flightStatus: {
            type: "string",
            enum: ["SCHEDULED", "CANCELLED", "COMPLETED"],
          },
          departureAirportId: { type: "string" },
          arrivalAirportId: { type: "string" },
          departureDate: { type: "string", format: "date-time" },
          arrivalDate: { type: "string", format: "date-time" },
          airlineCompanyId: { type: "string" },
        },
      },
      FlightUpdate: {
        type: "object",
        properties: {
          bookingOpenStatus: { type: "boolean" },
          flightStatus: {
            type: "string",
            enum: ["SCHEDULED", "CANCELLED", "COMPLETED"],
          },
          departureAirportId: { type: "string" },
          arrivalAirportId: { type: "string" },
          departureDate: { type: "string", format: "date-time" },
          arrivalDate: { type: "string", format: "date-time" },
          airlineCompanyId: { type: "string" },
        },
      },
      BookingCreate: {
        type: "object",
        required: ["bookingStatus", "userId", "flightId", "passengersIds"],
        properties: {
          bookingStatus: { type: "string", enum: ["CONFIRMED", "CANCELLED"] },
          userId: { type: "string" },
          flightId: { type: "string" },
          passengersIds: {
            type: "array",
            items: { type: "string" },
          },
        },
      },
      BookingUpdate: {
        type: "object",
        required: ["bookingStatus"],
        properties: {
          bookingStatus: { type: "string", enum: ["CONFIRMED", "CANCELLED"] },
        },
      },
      UserCreate: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 6 },
          phoneNotification: { type: "boolean" },
          phoneNumber: { type: "string" },
        },
      },
      AirportCreate: {
        type: "object",
        required: ["airportName", "servedCities", "locationId"],
        properties: {
          airportName: { type: "string" },
          servedCities: {
            type: "array",
            items: { type: "string" },
          },
          locationId: { type: "string" },
        },
      },
      AirlineCreate: {
        type: "object",
        required: ["companyName"],
        properties: {
          companyName: { type: "string" },
        },
      },
      StopoverCreate: {
        type: "object",
        required: ["arrivalDate", "departureDate", "locationId"],
        properties: {
          arrivalDate: { type: "string", format: "date-time" },
          departureDate: { type: "string", format: "date-time" },
          locationId: { type: "string" },
        },
      },
    },
  },
};
