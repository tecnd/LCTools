import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import type { UserConfig } from "vite";
import { version } from "./package.json";

const config: UserConfig = {
  plugins: [enhancedImages(), sveltekit()],
  define: {
    __APP_VERSION__: JSON.stringify(version),
    __APP_BUILD_TIME__: JSON.stringify(new Date().getTime()),
  },
};

export default config;
