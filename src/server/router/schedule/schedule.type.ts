import * as z from "zod";

export const bookingSchema = z.object({
  appointmentDate: z.date(),
  location: z.string(),
  description: z.string(),
  clientId: z.string(),
  workerId: z.string(),
});

export const appointmentSchema = z.object({
  userId: z.string(),
});

export const deleteAppointmentSchema = z.object({
  id: z.string(),
});

export const updateAppointmentSchema = z.object({
  id: z.string(),
});

export type IBooking = z.infer<typeof bookingSchema>;
export type IAppointment = z.infer<typeof appointmentSchema>;
export type IDeleteAppointment = z.infer<typeof deleteAppointmentSchema>;
export type IUpdateAppointment = z.infer<typeof updateAppointmentSchema>;