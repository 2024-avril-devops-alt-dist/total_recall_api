import { z } from "zod";
import { BookingStatus, FlightStatus } from "@/enums/enums";

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  phoneNotification: z.boolean().optional(),
  phoneNumber: z.string().optional(),
});

export const userUpdateSchema = userSchema.partial();

export const locationSchema = z.object({
  city: z.string(),
  country: z.string(),
});

export const airlineCompanySchema = z.object({
  companyName: z.string(),
});

export const airportSchema = z.object({
  airportName: z.string(),
  servedCities: z.array(z.string()),
  locationId: z.string(),
});

export const flightSchema = z.object({
  bookingOpenStatus: z.boolean(),
  flightStatus: z.nativeEnum(FlightStatus),
  departureAirportId: z.string(),
  arrivalAirportId: z.string(),
  departureDate: z.string().transform((str) => new Date(str)),
  arrivalDate: z.string().transform((str) => new Date(str)),
  airlineCompanyId: z.string(),
});

export const stopoverSchema = z.object({
  arrivalDate: z.string().transform((str) => new Date(str)),
  departureDate: z.string().transform((str) => new Date(str)),
  locationId: z.string(),
  flightId: z.string(),
});

export const passengerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number().int().nonnegative(),
});

export const bookingSchema = z.object({
  bookingStatus: z.nativeEnum(BookingStatus),
  userId: z.string(),
  flightId: z.string(),
  passengersIds: z.array(z.string()),
});

export const bookingUpdateSchema = z.object({
  bookingStatus: z.nativeEnum(BookingStatus),
});

export const bookingPassengerSchema = z.object({
  bookingId: z.string(),
  passengerId: z.string(),
});
