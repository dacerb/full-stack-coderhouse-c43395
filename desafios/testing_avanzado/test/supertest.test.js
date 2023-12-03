import chai from "chai";
const assert = chai.assert;
import supertest from "supertest";


const timestampInSeconds = Math.floor(new Date().getTime() / 1000);

const expect = chai.expect;

const requester = supertest('http://localhost:8080');

// Aumentar el timeout global
before(function() {
    this.timeout(5000);
});

describe("testing e-commerce app:", () => {

    // TEST BLOCK 1
    describe("* products", () => {

        before(async function() {

            this.cookie;
            this.mockAdminUser = {
                "email": "adminCoder@coder.com",
                "password": "adminCod3r123"
            }
            this.login_response = await requester.post("/api/sessions/login").send(this.mockAdminUser);
            this.setCookieHeader = this.login_response.header['set-cookie'][0];

        });

        // 01
        it("get all products", async function() {
            const response = await requester.get("/api/products");
            const { statusCode, _body: data } = response;

            // Agregar aserciones utilizando Chai
            expect(statusCode).is.eqls(200);
            expect(data.payload).to.be.an('array');
        });

        // 02
        it("create a new fake product", async function() {

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

        // 03
        it("delete a new fake product", async function() {

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
    describe("* carts", () => {

        before(async function() {

            this.new_cart_id = 0
            this.mockAdminUser = {
                "email": "test_user_mock.test_last_name_mock@mock.com",
                "password": "mock_password"
            }
            this.login_response = await requester.post("/api/sessions/login").send(this.mockAdminUser);
            this.setCookieHeader = this.login_response.header['set-cookie'][0];

        });

        // 01
        it("create a new cart", async function() {

            const response = await requester.post("/api/cart/");
            const {statusCode, _body: body} = {...response};

            expect(statusCode).is.eqls(200);
            expect(body).to.have.property('message', `success`);

            if (statusCode === 200) this.new_cart_id = body.resutl._id
        });

        // 02
        it("get the new cart", async function() {

            const response = await requester.get(`/api/cart/${this.new_cart_id}`);
            const {statusCode, _body: body} = {...response};

            expect(statusCode).is.eqls(200);
            expect(body).to.have.property('message', `success`);
            expect(body.response.products).to.be.an('array');

        });

        // 03
        it("add product in the new cart", async function() {

            const response = await requester.get("/api/products");
            const products = response._body.payload;

            assert.isNotEmpty(products)
            if (products) {
                const product_to_test = products.pop()

                const response = await requester
                    .post(`/api/cart/${this.new_cart_id}/product/${product_to_test._id}`)
                    .set('Cookie', this.setCookieHeader);

                const {statusCode, _body: body} = {...response};
                const response_message_data = JSON.parse(response.res.text);

                expect(statusCode).is.eqls(200);
                expect(response_message_data).to.have.property('message', `the product with id ${product_to_test._id} was update in the cart id ${this.new_cart_id}`);
            }

        });

        // 04
        it("delete all products in the new cart", async function() {
            const response = await requester
                .delete(`/api/cart/${this.new_cart_id}`)
                .set('Cookie', this.setCookieHeader);
            const {statusCode, _body: body} = {...response};

            expect(statusCode).is.eqls(200);
            expect(body).to.have.property('message', `success`);
        });

        // 05
        it("delete the new cart", async function() {
            // PENDIENTE IMPLEMENTAR ALGUN METODO PARA HACERLO
        });

    });

    // TEST BLOCK 3
    describe("* sessions", () => {

        before(async function() {

            this.cookie;
            this.mockUserTest = {
                "first_name": "test_user_mock",
                "last_name": "test_last_name_mock",
                "email": `test_user_mock.${timestampInSeconds}@mock.com`,
                "age": 9999,
                "password": "mock_password"
            }
        });

        // 01
        it("create a mock user", async function() {

            const response = await requester
                .post("/api/sessions/register")
                .send(this.mockUserTest);

            const {statusCode, _body: body} = {...response};

            expect(statusCode).is.eqls(201);
            expect(body).to.have.property('message', `Usuario creado con exito.`);
        });

        // 02
        it("login a mock user", async function() {

            const response = await requester
                .post("/api/sessions/login")
                .send(this.mockUserTest);

            const {statusCode, _body: body} = {...response};

            expect(statusCode).is.eqls(200);
            expect(body).to.have.property('status', `success`);
        });

        // 03
        it("close session a mock user", async function() {

            const response = await requester
                .post("/api/sessions/logout");

            const {statusCode, _body: body} = {...response};

            expect(statusCode).is.eqls(200);
            expect(body).to.have.property('message', `Sesion cerrada correctamente.`);
        });

        //04
        it("delete the mock user", async function() {
            // PENDIENTE IMPLEMENTAR ALGUN METODO PARA HACERLO
        });
    });

});
