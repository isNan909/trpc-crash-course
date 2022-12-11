import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const notesRouter = router({
  allNote: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.Notes.findMany({
        select: {
          title: true,
          description: true,
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  }),
});
