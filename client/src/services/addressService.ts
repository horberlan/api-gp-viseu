import type { App } from "../../../server/src/index";

import {
  treaty
} from '@elysiajs/eden'

export const zipCodeApi = treaty<App>(import.meta.env.VITE_API_GP_VISEU as string);
