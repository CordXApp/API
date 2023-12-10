export const CorsOptions = {
    origin: ['*'],
    allowedHeaders: ['secret', 'userid', 'Authorization', 'authorization', 'Content-Type', 'Content-Disposition', 'Content-Length'],
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 200,
    preflight: true,
    strictPreflight: false
};