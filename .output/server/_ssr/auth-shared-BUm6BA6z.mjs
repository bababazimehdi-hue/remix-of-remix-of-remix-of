//#region node_modules/.nitro/vite/services/ssr/assets/auth-shared-BUm6BA6z.js
/** Shared (browser + server) helpers for the username based login. */
var AUTH_EMAIL_DOMAIN = "dezz-rekab.app";
/** Synthetic e-mail used behind the scenes for a username account. */
function usernameToEmail(username) {
	return `${username.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "-") || "user"}@${AUTH_EMAIL_DOMAIN}`;
}
/**
* The app allows 4 character passwords while the auth service requires 6,
* so short passwords get a deterministic suffix. Never shown to the user.
*/
function toAuthPassword(password) {
	const p = password.trim();
	return p.length >= 6 ? p : `${p}::dz`;
}
function onlyDigits(value) {
	return value.replace(/[^\d]/g, "");
}
//#endregion
export { toAuthPassword as n, usernameToEmail as r, onlyDigits as t };
