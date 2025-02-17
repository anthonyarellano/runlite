export type TranslationKeys =
  | "sections.activities.title"
  | "sections.shoes.title"
  | "buttons.generate_file"
  | "buttons.drop_select_file"
  | "buttons.create_new_shoe"
  | "tooltips.activity_log"
  | "tooltips.shoes"
  | "headings.generate_file_intro"
  | "headings.running"
  | "headings.information_prompt.prefix"
  | "headings.information_prompt.highlight"
  | "headings.information_prompt.suffix";

type TranslationRecord = Record<string, TranslationKeys>;
type NestedTranslationRecord = Record<
  string,
  TranslationKeys | Record<string, TranslationKeys>
>;

export const SECTION_TITLE = {
  ACTIVITIES: "sections.activities.title",
  SHOES: "sections.shoes.title",
} satisfies TranslationRecord;

export const BUTTON_TEXT = {
  GENERATE_FILE: "buttons.generate_file",
  DROP_SELECT_FILE: "buttons.drop_select_file",
  CREATE_NEW_SHOE: "buttons.create_new_shoe",
} satisfies TranslationRecord;

export const TOOLTIP_TEXT = {
  ACTIVITY_LOG: "tooltips.activity_log",
  SHOES: "tooltips.shoes",
} satisfies TranslationRecord;

export const HEADING = {
  GENERATE_FILE_INTRO: "headings.generate_file_intro",
  RUNNING: "headings.running",
  INFORMATION_PROMPT: {
    PREFIX: "headings.information_prompt.prefix",
    HIGHLIGHT: "headings.information_prompt.highlight",
    SUFFIX: "headings.information_prompt.suffix",
  },
} satisfies NestedTranslationRecord;
