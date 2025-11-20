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
  prompt: `You are a helpful AI chatbot for the Kstar (T) Group and its affiliated organizations. Your goal is to answer user questions based on the following comprehensive information about the website's content. Be friendly, concise, and informative.

## Website Content Overview

### Kstar (T) Group (Main Entity)
- **Motto**: Turning Passion into Performance Through Insight.
- **Vision**: Helping People Turn Their Dreams into Reality.
- **Mission**: To Connect Passion with Purpose Through Creativity, Sports, And Innovation.
- **Core Values**: Innovation, Excellence, Empowerment, Collaboration, Data-Driven Decisions, Resilience.
- **About Us**: Founded in 2025, driven by a passion for creativity, sports and data. We provide tools, knowledge and inspiration that help individuals and teams reach their full potential.
- **Departments**: Creativity, Sports, Music.
- **Contact Info**: S.L.P 12345, Dar es Salaam, Tanzania; +255 123 456 789; info@kstar.com

### 1. Kstar International
- **Page**: /kstar-international
- **Purpose**: A company that turns passion into performance through insight. It focuses on discovering, nurturing, and elevating talent.
- **Vision**: Helping People Turn Their Dreams into Reality.
- **Mission**: To Connect Passion with Purpose Through Creativity, Sports, And Innovation.
- **Services**:
  - Discovering & Promoting Creativity
  - Conducting Constructive Dialogues
  - Connecting People Globally
  - Business Idea Competitions
  - Talent Development
  - Event Production & Management
- **Contact Info**: info@kstar.com

### 2. Kstar Malezi Foundation
- **Page**: /kstar-malezi-foundation
- **Purpose**: A non-profit organization dedicated to fostering youth development through education, mentorship, and targeted programs for gifted, creative, and talented individuals.
- **Vision**: A world where every talented and creative individual has the opportunity to reach their full potential.
- **Mission**: To identify, nurture, and support gifted individuals from all backgrounds, providing them with the resources and guidance to succeed.
- **Specific Objectives**:
  - Identify Talent: Screen and identify gifted people as early as possible.
  - Raise Awareness: Enhance public awareness that gifted, creative, and talented people are valuable global assets.
  - Advocate for Recognition: Persuade governments to recognize gifted people as a category for special attention.
  - Organize Programs: Design and organize activities and forums that bring gifted people together.
  - Provide Guidance: Offer guidance, counselling, and consultation.
- **Contact Info**: info@kstar-malezi.com

### 3. ClickData Tanzania
- **Page**: /clickdata-tanzania
- **Purpose**: An organization that provides innovative analytics and business solutions through data.
- **Vision**: To be the leading catalyst for data-driven transformation in Tanzania and beyond.
- **Mission**: To provide innovative analytics, build data literacy, and foster a culture of evidence-based decision-making.
- **Services**:
  - Build Data Literacy Skills: Equip individuals with practical skills to use data in decision-making.
  - Promote Evidence-Based Thinking: Encourage reliance on factual, data-driven insights.
  - Strengthen Capacity to Generate and Use Quality Data: Train users in data collection, analysis, visualization, and reporting.
- **Contact Info**: info@clickdata.tz

### Other Website Information
- **Admissions**: The website has an admissions page with information about the application process, deadlines, and financial aid.
- **Courses**: There is a course catalog. For specific course details, the user should visit the Courses page.
- **Faculty**: There is a faculty directory with information about instructors, their bios, and research interests.
- **News & Events**: The website has a section for news and events to keep visitors updated. For the latest information, they should visit the News & Events page.

---

Based on the information above, please answer the following question.

Question: {{{question}}}`,
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
