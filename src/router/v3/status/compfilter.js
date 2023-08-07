const config = require('@configs/main');

module.exports = async (fastify, opts) => {
    fastify.get('/comp/filter/:secret', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        switch(request.query.method) {

            case "dns":
            
                if (!request.params.secret) return reply.code(400).send({
                    message: 'Please provide the required secret query',
                    error: true,
                    status: 400
                })
    
                if (request.params.secret !== config.status) return reply.code(400).send({
                    message: 'Invalid secret provided.',
                    error: true,
                    status: 400
                })

                const dnsRes = await fetch('https://api.instatus.com/v2/ckq7ppm4g124913arohzh7jn9ek/components', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${request.params.secret}`,
                        'Content-Type': 'application/json'
                    }
                });


                const dnsComp = await dnsRes.json();
                const dnsCompRes = await dnsComp.filter((d) => d.name === 'DNS').map(d => d.children);
                
                return reply.code(200).send(dnsCompRes);

            case "sl":

                if (!request.params.secret) return reply.code(400).send({
                    message: 'Please provide the required secret query',
                    error: true,
                    status: 400
                })
    
                if (request.params.secret !== config.status) return reply.code(400).send({
                    message: 'Invalid secret provided.',
                    error: true,
                    status: 400
                })

                const slRes = await fetch('https://api.instatus.com/v2/ckq7ppm4g124913arohzh7jn9ek/components', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${request.params.secret}`,
                        'Content-Type': 'application/json'
                    }
                });


                const slComp = await slRes.json();
                const slCompRes = await slComp.filter((d) => d.name === 'Short Links').map(d => d.children);;
                
                return reply.code(200).send({
                    results: slCompRes
                });

            case "tp":

                if (!request.params.secret) return reply.code(400).send({
                    message: 'Please provide the required secret query',
                    error: true,
                    status: 400
                })
    
                if (request.params.secret !== config.status) return reply.code(400).send({
                    message: 'Invalid secret provided.',
                    error: true,
                    status: 400
                })

                const tpRes = await fetch('https://api.instatus.com/v2/ckq7ppm4g124913arohzh7jn9ek/components', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${request.params.secret}`,
                        'Content-Type': 'application/json'
                    }
                });


                const tpComp = await tpRes.json();
                const tpCompRes = await tpComp.filter((d) => d.name === 'Third Party').map(d => d.children);
                
                return reply.code(200).send(tpCompRes);

            case "us":

                if (!request.params.secret) return reply.code(400).send({
                    message: 'Please provide the required secret query',
                    error: true,
                    status: 400
                })
    
                if (request.params.secret !== config.status) return reply.code(400).send({
                    message: 'Invalid secret provided.',
                    error: true,
                    status: 400
                })

                const usRes = await fetch('https://api.instatus.com/v2/ckq7ppm4g124913arohzh7jn9ek/components', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${request.params.secret}`,
                        'Content-Type': 'application/json'
                    }
                });


                const usComp = await usRes.json();
                const usCompRes = await usComp.filter((d) => d.name === 'Upload Servers').map(d => d.children);
                
                return reply.code(200).send(usCompRes);

                case "web":

                if (!request.params.secret) return reply.code(400).send({
                    message: 'Please provide the required secret query',
                    error: true,
                    status: 400
                })
    
                if (request.params.secret !== config.status) return reply.code(400).send({
                    message: 'Invalid secret provided.',
                    error: true,
                    status: 400
                })

                const webRes = await fetch('https://api.instatus.com/v2/ckq7ppm4g124913arohzh7jn9ek/components', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${request.params.secret}`,
                        'Content-Type': 'application/json'
                    }
                });


                const webComp = await webRes.json();
                const webCompRes = await webComp.filter((d) => d.name === 'Websites').map(d => d.children);
                
                return reply.code(200).send(webCompRes);

            default:

                return reply.code(400).send({
                    message: 'Invalid method query provided',
                    required: 'One of: ["dns", "sl", "tp", "us", "web"]',
                    error: true,
                    status: 400
                })
        }
    })
}