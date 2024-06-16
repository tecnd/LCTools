import { dev } from "$app/environment";
export const prerender = true;
// Client-side rendering is enabled during dev to enable hot module reloads but disabled
// during final build
export const csr = dev;
