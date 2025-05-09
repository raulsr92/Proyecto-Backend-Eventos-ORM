
const PUERTO=4001;
export const FRONTEND_URL='http://localhost:3000';

export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_EXPIRES='1min';

export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
export const JWT_REFRESH_EXPIRES='10h';

export default PUERTO;
