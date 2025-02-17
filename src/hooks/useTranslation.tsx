import { useLocale } from "~/contexts/LocaleContext";
import { translations } from "~/locales/translations";

export function useTranslation() {
  const { locale } = useLocale();

  const t = (key: string) => {
    console.log(translations[locale][key as keyof (typeof translations)["en"]]);
    return (
      translations[locale][key as keyof (typeof translations)["en"]] || key
    );
  };

  return { t };
}
