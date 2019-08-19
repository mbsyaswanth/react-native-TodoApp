import { I18nManager } from "react-native";
import i18n from "i18n-js";
import memoize from "lodash.memoize";

export const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require("../../translations/en.json"),
  tel: () => require("../../translations/tel.json"),
  hi: () => require("../../translations/hi.json")
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

export const setI18nConfig = language => {
  const languageTag = language;
  const isRTL = false;
  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};
