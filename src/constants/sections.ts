export const SECTIONS = {
    SHOES: 'shoes',
    ACTIVITIES: 'activities'
  } as const
  
export type SectionValue = typeof SECTIONS[keyof typeof SECTIONS]
