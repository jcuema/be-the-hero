const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Ong', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () =>{
        await connection.destroy();
    });

    it('Should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: "Jean",
            email:"contato@minhaong.com",
            whatsapp:"33988550579",
            city: "manhuaçu",
            uf: "MG"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});