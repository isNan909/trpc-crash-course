import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const notesRouter = router({
  allNotes: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma?.notes?.findMany({
        select: {
          title: true,
          description: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      console.log(`We cannot fetch your notes ${error}`);
    }
  }),
  newNote: publicProcedure
    .input(
      z.object({
        title: z
          .string()
          .min(5, { message: "Must be 5 or more characters of length!" })
          .max(200, {
            message: "Must not be more than 200 characters of length!",
          })
          .trim(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.notes.create({
          data: {
            title: input.title,
            description: input.description,
          },
        });
      } catch (error) {
        console.log(`New note cannot be creatted ${error}`);
      }
    }),
});
