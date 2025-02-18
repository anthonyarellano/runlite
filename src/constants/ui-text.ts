import { RecursiveRecord } from "~/types/RecursiveRecord/RecursiveRecord";

export type TranslationKeys =
  | "sections.activities.title"
  | "sections.shoes.title"
  | "buttons.generate_file.default"
  | "buttons.generate_file.create_form"
  | "buttons.drop_select_file"
  | "buttons.create_new_shoe"
  | "tooltips.activity_log"
  | "tooltips.shoes"
  | "headings.generate_file_intro"
  | "headings.running"
  | "headings.information_prompt.prefix"
  | "headings.information_prompt.highlight"
  | "headings.information_prompt.suffix"
  | "inputs.name_username.label"
  | "inputs.name_username.helper_text"
  | "inputs.name_username.validation"
  | "inputs.name_username.placeholder"
  | "inputs.metric_type.label"
  | "inputs.metric_type.option_one_label"
  | "inputs.metric_type.option_two_label";

type TranslationStructure = RecursiveRecord<TranslationKeys>;

export const SECTION_TITLE = {
  ACTIVITIES: "sections.activities.title",
  SHOES: "sections.shoes.title",
} satisfies TranslationStructure;

export const BUTTON_TEXT = {
  GENERATE_FILE: {
    DEFAULT: "buttons.generate_file.default",
    CREATE_FORM: "buttons.generate_file.create_form",
  },
  DROP_SELECT_FILE: "buttons.drop_select_file",
  CREATE_NEW_SHOE: "buttons.create_new_shoe",
} satisfies TranslationStructure;

export const TOOLTIP_TEXT = {
  ACTIVITY_LOG: "tooltips.activity_log",
  SHOES: "tooltips.shoes",
} satisfies TranslationStructure;

export const HEADING = {
  GENERATE_FILE_INTRO: "headings.generate_file_intro",
  RUNNING: "headings.running",
  INFORMATION_PROMPT: {
    PREFIX: "headings.information_prompt.prefix",
    HIGHLIGHT: "headings.information_prompt.highlight",
    SUFFIX: "headings.information_prompt.suffix",
  },
} satisfies TranslationStructure;

export const INPUT = {
  NAME_USERNAME: {
    LABEL: "inputs.name_username.label",
    HELPER_TEXT: "inputs.name_username.helper_text",
    VALIDATION: "inputs.name_username.validation",
    PLACEHOLDER: "inputs.name_username.placeholder",
  },
  METRIC_TYPE: {
    LABEL: "inputs.metric_type.label",
    OPTIONS: {
      ONE: {
        LABEL: "inputs.metric_type.option_one_label",
      },
      TWO: {
        LABEL: "inputs.metric_type.option_two_label",
      },
    },
  },
} satisfies TranslationStructure;
