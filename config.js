// Using envs value for production, while defaults aim to be used in developpement
const {JWT_SECRET_KEY, BACKEND_HOSTNAME, FRONTEND_HOSTNAME, MONGO_URI, PORT} = process.env;

const jwtSecretKey = JWT_SECRET_KEY ?? 'RANDOM_DEV_SECRET_KEY';
const backendHostname = BACKEND_HOSTNAME ?? 'http://localhost:4000';
const frontendHostname = FRONTEND_HOSTNAME ?? 'http://localhost:3000';
const mongoUri = MONGO_URI;
const port = PORT ?? '4000';

module.exports = {
    jwtSecretKey,
    backendHostname,
    frontendHostname,
    mongoUri,
    port
};
