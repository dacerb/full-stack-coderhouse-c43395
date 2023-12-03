import chai from "chai";
import supertest from "supertest";


const expect = chai.expect;

const requester = supertest('http://localhost:8080');

// Aumentar el timeout global


// Contexto Global
describe("testing e-commerce app:", () => {

    // TEST BLOCK 1
    describe("* products", () => {

        before(async function() {
            this.timeout(5000);

            this.cookie;
            this.mockAdminUser = {
                "email": "adminCoder@coder.com",
                "password": "adminCod3r123"
            }
            this.login_response = await requester.post("/api/sessions/login").send(this.mockAdminUser);
            this.setCookieHeader = this.login_response.header['set-cookie'][0];

        });

        // 01 Aumentar el timeout para pruebas específicas
        it("get all products", async function() {
            this.timeout(1000);

            const response = await requester.get("/api/products");
            const { statusCode, _body: data } = response;

            // Agregar aserciones utilizando Chai
            expect(statusCode).is.eqls(200);
            expect(data.payload).to.be.an('array');
        });

        // 02 Aumentar el timeout para pruebas específicas
        it("create a new fake product", async function() {
            this.timeout(1000);

            const response = await requester
                .post("/api/products")
                .set('Cookie', this.setCookieHeader)
                .field('title', 'FAKE_TEST')
                .field('description', 'FAKE_TEST')
                .field('code', 'FAKE_TEST01')
                .field('price', '9999')
                .field('status', 'true')
                .field('stock', '9999')
                .field('category', 'FAKE_TEST')
                .attach('thumbnails', '.\\test\\images\\test_image.png');

            const {statusCode, _body: body} = {...response};

            expect(statusCode).is.eqls(200);
            expect(body).to.have.property('message', 'a new product was added');

            // Si sucede ok guardo el ID para eliminarlo en el proximo test.
            if (body.result._id) this.new_product_id = body.result._id;
        });

        // 03 Aumentar el timeout para pruebas específicas
        it("delete a new fake product", async function() {
            this.timeout(1000);

            const response = await requester
                .delete(`/api/products/${this.new_product_id}`)
                .set('Cookie', this.setCookieHeader);

            const {statusCode, _body: body} = {...response};
            const response_message_data = JSON.parse(response.res.text);

            expect(statusCode).is.eqls(200);
            expect(response_message_data).to.have.property('message', `the product with id ${this.new_product_id} was deleted.`);
        });


    });

    // TEST BLOCK 2
    describe("CARTS", () => {
        // Puedes agregar pruebas relacionadas con carritos de compras aquí
    });

    // TEST BLOCK 3
    describe("SESSIONS", () => {
        // Puedes agregar pruebas relacionadas con sesiones aquí
    });
});
