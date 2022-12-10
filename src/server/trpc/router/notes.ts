import { z } from "zod";

import { router, publicProcedure } from "../trpc";
import { Context } from "./context";

export const notesRouter = router<Context>({
  allNotes: publicProcedure
    .input(
      z.object({
        title: z
          .string()
          .min(5, { message: "Must be 5 or more characters of length!" })
					.max(100, { message: "Must not be more than 100 characters of length!" })
					.trim();
        description: z
          .string()
          .min(10, { message: "Must be 10 or more characters of length!" }),
      }).partial();
    )
    .query(async ({ input, ctx }) => {
			const { prisma } = ctx;
      const allNotes = await prisma.Notes.findMany();
			return allNotes
    }),
});
