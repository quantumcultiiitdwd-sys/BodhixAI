import { z } from "zod";
import { budgetRanges, contactServices } from "@/content/site";

// Shared by the client form and the API route, so both validate identically.
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.email("Please enter a valid work email.").max(200),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  service: z.enum(contactServices, { error: "Please choose a service." }),
  message: z.string().trim().min(20, "Tell us a little more — at least 20 characters.").max(5000),
  budget: z.enum(budgetRanges).optional().or(z.literal("")),
  // Spam traps: honeypot must stay empty; startedAt detects instant bot submissions.
  website: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.number(),
});

export type ContactInput = z.infer<typeof contactSchema>;
