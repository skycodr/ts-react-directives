export default {
  "*.{ts,tsx}": ["pnpm run lint:fix", "pnpm run format:fix"],
  "*.{html,css,json}": "pnpm run format:fix",
};
