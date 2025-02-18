import { TranslationKeys } from "~/constants/ui-text";

export const translations = {
  en: {
    "sections.activities.title": "Activities",
    "sections.shoes.title": "Shoes",
    "buttons.generate_file.default": "Generate new file",
    "buttons.generate_file.create_form": "Generate file",
    "buttons.drop_select_file": "Drop / select file",
    "buttons.create_new_shoe": "Create new shoe",
    "tooltips.activity_log": "Activity Log",
    "tooltips.shoes": "Shoes",
    "headings.generate_file_intro": "Generate a new file to track your",
    "headings.running": "running",
    "headings.information_prompt.prefix": "Enter some",
    "headings.information_prompt.highlight": "information",
    "headings.information_prompt.suffix": "to get started 🚀",
    "inputs.name_username.label": "What should we call you?",
    "inputs.name_username.helper_text": "Max characters: 50",
    "inputs.name_username.validation": "Name or username is required",
    "inputs.name_username.placeholder": "Name or username *",
    "inputs.metric_type.label": "Metric preference",
    "inputs.metric_type.option_one_label": "mi (miles)",
    "inputs.metric_type.option_two_label": "km (kilometers)",
  },
} satisfies Record<string, Record<TranslationKeys, string>>;
