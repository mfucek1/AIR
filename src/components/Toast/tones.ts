import { CircleCheck, CircleX, Info, Sparkles, TriangleAlert } from 'lucide-react';

export type FeedbackTone = 'info' | 'success' | 'warning' | 'danger' | 'ai';

/** The icon for each tone, shared by Toast and Banner (Figma: the Icon swap per Tone). */
export const toneIcons = { info: Info, success: CircleCheck, warning: TriangleAlert, danger: CircleX, ai: Sparkles } as const;
