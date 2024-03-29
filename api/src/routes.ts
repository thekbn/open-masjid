const format = require('pg-format');

const QUERY_MASJID_WITH_IQAMAH = `
select m.id, m.name, m.address, 
	json_agg(
		json_build_object('salah', i.salah, 'time', i.time)
    )  FILTER (WHERE i.id IS NOT NULL)
    AS iqamah 
    FROM masjids m
    LEFT JOIN iqamah i on m.id = i.masjid_id
    GROUP BY m.id;
`;

const QUERY_ADD_MASJID = `
INSERT INTO masjids("name", "address") 
VALUES($1, $2)
RETURNING *
`;

const QUERY_UPSERT_IQAMAH = `
INSERT INTO iqamah (masjid_id, salah, time)
VALUES %L
ON CONFLICT ON CONSTRAINT masjid_salah
DO UPDATE SET time = EXCLUDED.TIME;
`;

const QUERY_UPDATE_MASJID = `
UPDATE masjids
SET name = $2, address = $3
WHERE id = $1;
`

async function routes(fastify: any, options: any) {
    fastify.get('/masjids', async (request: any, reply: any) => {
        const { rows } = await fastify.pg.query(QUERY_MASJID_WITH_IQAMAH);

        reply.header("Access-Control-Allow-Origin", "*");
        reply.header("Access-Control-Allow-Methods", "POST");
        reply.send(rows)
    });

    fastify.post('/masjid', async (request: any, reply: any) => {
        try {
            const { name, address } = request.body;

            const values = [name, address];

            const res = await fastify.pg.transact(async (client: any) => {
                const res = await client.query(QUERY_ADD_MASJID, values);

                if(res.rowCount == 1){
                    reply.status(201)
                    reply.send(res.rows[0])
                }else {
                    throw new Error(`unable to create new masjid, body: ${JSON.stringify(request.body)}`);
                }
            })

        } catch (err) {
            console.log(err)
            reply.send(new Error("bad request"))
        }
    });

    fastify.put('/masjid/:id', async (request: any, reply: any) => {
        try {        
            await fastify.pg.transact(async (client: any) => {
                const {id} =  request.params;
                const {name, address, iqamahs} = request.body;
                const values = [id, name, address];

                const res = await client.query(QUERY_UPDATE_MASJID, values);

                if(res.rowCount != 1){
                    throw new Error(`unable to update masjid, body: ${JSON.stringify(request.body)}`);
                }

                if(iqamahs){
                    const rowsToAdd = iqamahs.map((i: any) => [id, i.salah, i.time]);
    
                    console.log(JSON.stringify(rowsToAdd, null, 2))
        
                    const upsertIqamah = format(QUERY_UPSERT_IQAMAH, rowsToAdd);
        
                    console.log(upsertIqamah);
        
                    const upsertIqamahResponse = await client.query(upsertIqamah);

                    if(upsertIqamahResponse.rowCount < 1){
                        throw new Error(`unable to update iqamah, body: ${JSON.stringify(request.body)}`);
                    }
                }
            })

            reply.send({
                message: 'updated masjid'
            });
         
        } catch (err) {
            console.log(err)
            reply.send(new Error("failed process request"))
        }
    });
}
export default routes;