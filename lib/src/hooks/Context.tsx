import { createContext } from "react";

export const HCaptchaContext = createContext({
  sitekey: null,
  error: null,
  token: null,
  ready: false,
  executeInstance: async () => undefined,
  resetInstance: () => undefined,
});
