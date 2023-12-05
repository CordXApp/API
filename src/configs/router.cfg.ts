async function generateRouterConfig({ max, timeWindow }) {

    const maxRequests = max ? max : 50;
    const timeoutWindow = timeWindow ? timeWindow : 10000;

    return {
        rateLimit: {
            max: maxRequests,
            timeWindow: timeoutWindow,
            errorResponseBuilder: function () {
                return {
                    code: 429,
                    error: 'Enhance your calm!',
                    message: 'Too many requests, please try again later.',
                    date: Date.now(),
                    expiresIn: this.timeWindow
                }
            },
            onExceeding: function () {
                return {
                    code: 429,
                    error: 'Enhance your calm!',
                    message: `Too many requests, please try again in: ${this.timeWindow}ms.`,
                    date: Date.now(),
                    expiresIn: this.timeWindow
                }
            },
            onExceeded: function () {
                return {
                    code: 427,
                    error: 'Enhance your calm!',
                    message: `You are being rate limited, please try again in: ${this.timeWindow}ms.`,
                    date: Date.now(),
                    expiresIn: this.timeWindow,
                }
            }
        }
    }
}