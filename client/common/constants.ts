export const PROTOCOL = process.env.PROTOCOL ?? "http";
export const HOST = process.env.HOST ?? "localhost";
export const PORT_SERVER = process.env.PORT_SERVER ?? 3001;
export const PORT_CLIENT = process.env.PORT_CLIENT ?? 3000;
export const API_REWRITE_PREFIX = "/api";
export const API_SERVER_BASE_PATH = `${PROTOCOL}://${HOST}:${PORT_SERVER}`;
