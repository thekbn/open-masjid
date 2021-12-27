import { PrismaClient, Prisma } from '@prisma/client'

const QUERY_MASJID_WITH_IQAMAH = `
select m.id as _id, m.name, m.address, i.* from masjids m
left join iqamah i on m.id = i.masjid_id
`;

const QUERY_ADD_MASJID = `
INSERT INTO masjids("name", "address") 
VALUES($1, $2)
`;

async function routes(fastify: any, options: any) {
    const prisma: PrismaClient = fastify.prisma;

    fastify.get('/masjids', async (request: any, reply: any) => {
        const masjids = await prisma.masjids.findMany();

        // reply.header("Access-Control-Allow-Origin", "*");
        // reply.header("Access-Control-Allow-Methods", "POST");
        reply.send(masjids)
    });

    fastify.post('/masjid', async (request: any, reply: any) => {
        try {
            const { name, address } = request.body;

            const masjid = await prisma.masjids.create({
                data: {
                    name,
                    address
                }
            });

            // reply.header("Access-Control-Allow-Origin", "*");
            // reply.header("Access-Control-Allow-Methods", "POST");
            reply.send(masjid)
        } catch (err) {
            reply.send(new Error("bad request"))
        }
    });

    fastify.get('/masjid/:id/iqamah', async (request: any, reply: any) => {
        try {
            const id = +request.params.id;
            const iqamah = await prisma.iqamah.findMany({
                where: {
                    masjid_id: id
                }
            });

            // reply.header("Access-Control-Allow-Origin", "*");
            // reply.header("Access-Control-Allow-Methods", "POST");
            reply.send(iqamah)
        } catch (err) {
            reply.send(new Error("bad request"))
            console.error(err)
        }
    });

    fastify.post('/masjid/:id/iqamah', async (request: any, reply: any) => {
        try {
            const id  = +request.params.id;

            const iqamah: Prisma.iqamahCreateInput =
            {
                time: request.body.Fajr,
                masjids: { connect: {id} },
                salah_iqamahTosalah: { connect: { name: 'Fajr' } },
            };

            const masjid = await prisma.iqamah.create({ data: iqamah });

            // reply.header("Access-Control-Allow-Origin", "*");
            // reply.header("Access-Control-Allow-Methods", "POST");
            reply.send(masjid)
        } catch (err) {
            reply.send(new Error("bad request"))
            console.error(err)
        }
    });
}
export default routes;