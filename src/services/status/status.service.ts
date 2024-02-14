import { Summary, Component } from 'root/@types/v3/status';
import { StatusRequestCompFilter, GetStatusSummary, GetComponents } from '../../middleware/instatus';
import { MethodType } from '../../middleware/instatus';

export const statusCompFilter = async ({ req, reply }) => {

    reply.header('Content-Type', 'application/json');

    console.log(req.params.secret)

    const method = req.query.method as MethodType['method'];
    const data: any = await StatusRequestCompFilter({ method: method, secret: req.params.secret });

    return reply.code(200).send({
        status: 'OK',
        message: 'success',
        data: data.children
    })
}

export const statusSummary = async ({ req, reply }): Promise<Summary> => {

    reply.header('Content-Type', 'application/json');

    const data: Summary = await GetStatusSummary();

    return reply.code(200).send(data)
}

export const pageComponents = async ({ req, reply }): Promise<Component[]> => {

    reply.header('Content-Type', 'application/json');

    const data: Component[] = await GetComponents({ secret: req.params.secret });

    return reply.code(200).send(data)
}