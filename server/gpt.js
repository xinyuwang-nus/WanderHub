import OpenAI from "openai";
import { EXAMPLE_JSON } from "./prompt.js";
import dotenv from "dotenv"; // to read .env file

dotenv.config({ path: ".env.local" });

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function generateTravelPlan(destination, duration, traveler, budget, activities) {
  const prompt = `
  Generate Travel Plan for Destination: ${destination}, for ${duration} days for ${traveler}, with hotel budget of ${budget}, with activity preference in ${activities}. 
  The result should follow the example JSON format as shown below (the number of days should follow the duration specified above), and randomize the number of hotels and locations being generated (3 to 6 hotels. For each day, 2 to 4 locations):
  ${EXAMPLE_JSON}
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful travel planner assistant." },
        { role: "user", content: prompt },
      ],
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("Error generating travel plan:", error);
    throw error;
  }
}
