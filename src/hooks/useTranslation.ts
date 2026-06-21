import en from "@/locales/en.json";

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends any[]
    ? `${TKey}`
    : TObj[TKey] extends object
    ? `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & (string | number)];

type TranslationKeys = RecursiveKeyOf<typeof en>;

export function useTranslation() {
  const t = (key: TranslationKeys, params?: Record<string, string | number>) => {
    const keys = key.split(".");
    let value: any = en;

    for (const k of keys) {
      if (value[k] === undefined) {
        console.warn(`Missing translation key: ${key}`);
        return key;
      }
      value = value[k];
    }

    if (typeof value === "string" && params) {
      return value.replace(/{{([^}]+)}}/g, (_, paramKey) => {
        return String(params[paramKey.trim()] ?? `{{${paramKey}}}`);
      });
    }

    return value as string;
  };

  return { t };
}
