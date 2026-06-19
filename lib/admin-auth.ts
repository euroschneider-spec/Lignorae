const BASIC_PREFIX = "Basic ";

function safeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;

  let difference = 0;

  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return difference === 0;
}

export function adminCredentialsAreConfigured() {
  return Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD);
}

export function isAdminAuthorizationValid(authorization: string | null) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password || !authorization?.startsWith(BASIC_PREFIX)) {
    return false;
  }

  try {
    const decoded = atob(authorization.slice(BASIC_PREFIX.length));
    const separator = decoded.indexOf(":");

    if (separator < 0) return false;

    const suppliedUsername = decoded.slice(0, separator);
    const suppliedPassword = decoded.slice(separator + 1);

    return (
      safeEqual(suppliedUsername, username) &&
      safeEqual(suppliedPassword, password)
    );
  } catch {
    return false;
  }
}
