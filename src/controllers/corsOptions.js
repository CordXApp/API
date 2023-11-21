module.exports.corsOptions = {
    origin: '*',
    allowedHeaders: [
        'secret',
        'userid',
        'Authorization',
        'authorization',
        'Content-Type',
        'Content-Disposition',
        'Content-Length'
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 200,
    preflight: false,
    strictPreflight: false
}
