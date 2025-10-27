'use server';

/**
 * @fileOverview Image generation flow for content creation.
 *
 * - generateContentImage - A function that generates an image based on a text prompt.
 * - GenerateContentImageInput - The input type for the generateContentImage function.
 * - GenerateContentImageOutput - The return type for the generateContentImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContentImageInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate the image from.'),
});

export type GenerateContentImageInput = z.infer<typeof GenerateContentImageInputSchema>;

const GenerateContentImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});

export type GenerateContentImageOutput = z.infer<typeof GenerateContentImageOutputSchema>;

export async function generateContentImage(input: GenerateContentImageInput): Promise<GenerateContentImageOutput> {
  return generateContentImageFlow(input);
}

const generateContentImageFlow = ai.defineFlow(
  {
    name: 'generateContentImageFlow',
    inputSchema: GenerateContentImageInputSchema,
    outputSchema: GenerateContentImageOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: input.prompt,
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate image.');
    }

    return {imageUrl: media.url};
  }
);
