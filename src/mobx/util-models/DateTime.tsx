import { types } from "mobx-state-tree";
import dayjs from "dayjs";
import "dayjs/plugin/utc";

import { getRoot } from "../utils/getRoot";

const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";

const DateTimeCore = types
  .model("DateTime", {
    _date: types.string,
  })
  .views((self) => {
    return {
      get locale(): string {
        const env = getRoot(self);
        const currentLocale = env.i18n.currentLocale;

        const localeMap = {
          english: "en",
        };

        return localeMap[currentLocale];
      },
    };
  })
  .views((self) => {
    return {
      format(format?: string | undefined) {
        return dayjs
          .utc(self._date, DATE_FORMAT)
          .local()
          .locale(self.locale)
          .format(format);
      },
      fromNow(withoutSuffix?: boolean | undefined) {
        return dayjs
          .utc(self._date, DATE_FORMAT)
          .local()
          .locale(self.locale)
          .fromNow(withoutSuffix);
      },
    };
  });

export const DateTime = types.snapshotProcessor(DateTimeCore, {
  preProcessor(dateString: string) {
    return { _date: dateString };
  },
  postProcessor(model) {
    return model._date;
  },
});
