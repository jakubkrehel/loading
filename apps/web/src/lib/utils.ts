import { createCn } from "cn/config";

export const cn = createCn({
  extend: {
    classGroups: { "font-size": [{ text: ["16"] }] },
    theme: { "font-weight": ["semimedium"] },
  },
});
