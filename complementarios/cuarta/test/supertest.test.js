import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;

const requester = supertest("http://localhost:8080");

describe("Testing App Api Endpoints.", () => {
    describe("Testing Students Api", () => {
        // 01
        it("get all students", async function() {
            const response = await requester.get("/api/students");
            const { statusCode, res } = response;
            const res_text = res.text
            const data = JSON.parse(res_text)

            expect(statusCode).is.eqls(200);
            expect(data).to.be.an('array');
        });
    });
    describe("Testing Courses Api", () => {

        before(async function() {
            this.mockFakeCourse = {
                "title": "fake_title",
                "description": "fake_description",
                "teacherName": "fake_teacherName"
            }
        });

        // 01
        it("get all courses", async function() {
            const response = await requester.get("/api/courses");
            const { statusCode, res } = response;
            const res_text = res.text
            const data = JSON.parse(res_text)

            expect(statusCode).is.eqls(200);
            expect(data).to.be.an('array');
        });

        // 02
        it("post create a fake course", async function() {
            const response = await requester.post("/api/courses").send(this.mockFakeCourse);
            const { statusCode, _body: body } = response;

            expect(statusCode).is.eqls(201);
            expect(body).to.have.property("_id");
        });
    });
});