import * as trpc from "@trpc/server";
import { useSession } from "next-auth/react";
import { createRouter } from "../context";
import {
  bookingSchema,
  appointmentSchema,
  deleteAppointmentSchema,
  updateAppointmentSchema,
  updateUpcomingAppointmentSchema,
  updateUpcomingApprovalAppointmentSchema,
  deleteUpcomingApprovalAppointmentSchema,
  deleteUpcomingAppointmentSchema
} from "./schedule.type";

export const scheduleRouter = createRouter()
  //query for canceling booking
  .query("appointments", {
    input: appointmentSchema,
    resolve: async ({ ctx, input }) => {
      const appointments = await ctx.prisma.appointment.findMany({
        where: {
          OR: [
            { clientId: { equals: input.userId } },
            { workerId: { equals: input.userId } },
          ],
        },
        include: {
          client: true,
          worker: true,
        },
      });

      if (!appointments.length) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "project not found.",
        });
      }

      return {
        status: 200,
        message: "Here project",
        appointments,
      };
    },
  })
  .mutation("deleteAppointments", {
    input: deleteAppointmentSchema,
    resolve: async ({ ctx, input }) => {
      const deleteAppointments = await ctx.prisma.appointment.delete({
        where: {
          id: input.id,
        },
      });

      return {
        status: 200,
        message: "Here project",
        deleteAppointments,
      };
    },
  })
  .mutation("updateAppointments", {
    input: updateAppointmentSchema,
    resolve: async ({ ctx, input }) => {
      const updateAppointments = await ctx.prisma.appointment.update({
        where: {
          id: input.id,
        },
        data: {
          status: "upcoming",
        },
      });

      return {
        status: 200,
        message: "Here project",
        updateAppointments,
      };
    },
  })
  .mutation("Booking", {
    input: bookingSchema,
    resolve: async ({ ctx, input }) => {
      const result = await ctx.prisma.appointment.create({
        data: {
          appointmentDate: input.appointmentDate,
          location: input.location,
          description: input.description,
          clientId: input.clientId,
          workerId: input.workerId,
        },
      });

      return {
        status: 201,
        message: "booking successfully",
        result,
      };
    },
  })
  .mutation("updateUpcomingAppointmentSchema", {
    input: updateUpcomingAppointmentSchema,
    resolve: async ({ ctx, input }) => {
      const updateUpcomingAppointments = await ctx.prisma.appointment.update({
        where: {
          id: input.id,
        },
        data: {
          upcoming_status: "ending",
          senderId: input.senderId,
        },
      });

      return {
        status: 200,
        message: "Here project",
        updateUpcomingAppointments,
      };
    },
  })
  .mutation("updateUpcomingApprovalAppointmentSchema", {
    input: updateUpcomingApprovalAppointmentSchema,
    resolve: async ({ ctx, input }) => {
      const updateUpcomingApprovalAppointmentSchema = await ctx.prisma.appointment.update({
        where: {
          id: input.id,
        },
        data: {
          status: "completed",
        },
      });

      return {
        status: 200,
        message: "Here project",
        updateUpcomingApprovalAppointmentSchema,
      };
    },
  })
  .mutation("deleteUpcomingApprovalAppointmentSchema", {
    input: deleteUpcomingApprovalAppointmentSchema,
    resolve: async ({ ctx, input }) => {
      const deleteUpcomingApprovalAppointmentSchema = await ctx.prisma.appointment.update({
        where: {
          id: input.id,
        },
        data: {
          upcoming_status: "default",
        },
      });

      return {
        status: 200,
        message: "Here project",
        deleteUpcomingApprovalAppointmentSchema,
      };
    },
  })
  .mutation("deleteUpcomingAppointmentSchema", {
    input: deleteUpcomingAppointmentSchema,
    resolve: async ({ ctx, input }) => {
      const deleteUpcomingAppointments = await ctx.prisma.appointment.update({
        where: {
          id: input.id,
        },
        data: {
          upcoming_status: "default",
        },
      });

      return {
        status: 200,
        message: "Here project",
        deleteUpcomingAppointments,
      };
    },
  });