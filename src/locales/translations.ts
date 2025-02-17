import { TranslationKeys } from "~/constants/ui-text";

export const translations = {
  en: {
    "sections.activities.title": "Activities",
    "sections.shoes.title": "Shoes",
    "buttons.generate_file": "Generate new file",
    "buttons.drop_select_file": "Drop / select file",
    "buttons.create_new_shoe": "Create new shoe",
    "tooltips.activity_log": "Activity Log",
    "tooltips.shoes": "Shoes",
    "headings.generate_file_intro": "Generate a new file to track your",
    "headings.running": "running",
    "headings.information_prompt.prefix": "Enter some",
    "headings.information_prompt.highlight": "information",
    "headings.information_prompt.suffix": "to get started 🚀",
  },
} satisfies Record<string, Record<TranslationKeys, string>>;
