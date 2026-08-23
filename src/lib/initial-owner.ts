/**
 * Suggested credentials for the very first system owner.
 *
 * These values are ONLY prefilled defaults for the first-run setup form. They
 * are editable, they grant no privilege by themselves, and no part of the app
 * checks for this username: the OWNER role is granted by the one-time
 * `initialize_system()` database function to whoever completes setup.
 */
export const INITIAL_OWNER_SUGGESTION = {
  fullName: "مهدی",
  username: "mehdi",
  password: "1400",
} as const;
