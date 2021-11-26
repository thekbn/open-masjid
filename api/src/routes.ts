const QUERY_MASJID_WITH_IQAMAH = `
select m.id as _id, m.name, m.address, i.* from masjids m
left join iqamah i on m.id = i.masjid_id
`;

const QUERY_ADD_MASJID = `
INSERT INTO masjids("name", "address") 
VALUES($1, $2)
`;

async function routes(fastify: any, options: any) {
    const db = fastify.db.client

    fastify.get('/masjids', async (request: any, reply: any) => {
        const { rows } = await db.query(QUERY_MASJID_WITH_IQAMAH);
        reply.header("Access-Control-Allow-Origin", "*");
        reply.header("Access-Control-Allow-Methods", "POST");
        reply.send(rows)
    });

    fastify.post('/masjids', async (request: any, reply: any) => {
        try {
            const { name, address } = request.body;

            const values = [name, address];

            const res = await db.query(QUERY_ADD_MASJID, values);
            reply.header("Access-Control-Allow-Origin", "*");
            reply.header("Access-Control-Allow-Methods", "POST");
            reply.send(res)
        } catch (err) {
            reply.send(new Error("bad request"))
        }
    });
}
export default routes;