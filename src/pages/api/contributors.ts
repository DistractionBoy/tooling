import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

// Define the contributor schema
const contributorSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  // Adding some optional fields from the JSONPlaceholder API
  username: z.string().optional(),
  phone: z.string().optional(),
  date: z.coerce.date(),
  website: z.string().url().optional(),
  company: z
    .object({
      name: z.string(),
      catchPhrase: z.string().optional(),
      bs: z.string().optional(),
    })
    .optional(),
});

// Create an array schema for multiple contributors
const contributorsSchema = z.array(contributorSchema);

// Type inference from the schema
type Contributor = z.infer<typeof contributorSchema>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Contributor[] | { error: string }>
) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();

    // Validate the data against our schema
    const validatedData = contributorsSchema.parse(data);

    res.status(200).json(validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      res.status(400).json({ error: "Invalid data format" });
    } else {
      // Handle other errors
      res.status(500).json({ error: "Failed to fetch contributors" });
    }
  }
}
