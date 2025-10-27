'use server';

/**
 * @fileOverview An AI chatbot that answers frequently asked questions about the institution.
 *
 * - chatbotAnswersFAQs - A function that handles the chatbot answering FAQs process.
 * - ChatbotAnswersFAQsInput - The input type for the chatbotAnswersFAQs function.
 * - ChatbotAnswersFAQsOutput - The return type for the chatbotAnswersFAQs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotAnswersFAQsInputSchema = z.object({
  question: z.string().describe('The question asked by the user.'),
});
export type ChatbotAnswersFAQsInput = z.infer<typeof ChatbotAnswersFAQsInputSchema>;

const ChatbotAnswersFAQsOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});
export type ChatbotAnswersFAQsOutput = z.infer<typeof ChatbotAnswersFAQsOutputSchema>;

export async function chatbotAnswersFAQs(input: ChatbotAnswersFAQsInput): Promise<ChatbotAnswersFAQsOutput> {
  return chatbotAnswersFAQsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotAnswersFAQsPrompt',
  input: {schema: ChatbotAnswersFAQsInputSchema},
  output: {schema: ChatbotAnswersFAQsOutputSchema},
  prompt: `You are a helpful AI chatbot for EduPro Hub, an educational institution. Answer the following question using your knowledge of the institution.\n\nQuestion: {{{question}}}`,
});

const chatbotAnswersFAQsFlow = ai.defineFlow(
  {
    name: 'chatbotAnswersFAQsFlow',
    inputSchema: ChatbotAnswersFAQsInputSchema,
    outputSchema: ChatbotAnswersFAQsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
