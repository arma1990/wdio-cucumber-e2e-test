import request from "supertest"
import reporter from "./reporter.js"

async function GET(testid: string, baseUrl: string, endpoint: string, authToken: string, queryParam: string) {
    if (!baseUrl || !endpoint) {
        throw Error(`One of the given values baseUrl: ${baseUrl}, endpoint: ${endpoint} is not not valid`)
    }

    baseUrl = baseUrl.trim()
    endpoint = endpoint.trim()
    reporter.addStep(testid, "info", `Making REST API GET call to ${endpoint}`)

    try {
        return await request(baseUrl)
        .get(endpoint)
        .query(queryParam)
        .auth(authToken, { type: 'bearer' })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(200)
    } catch (err) {
        err.message = `Error making a GET call to ${endpoint}, ${err}`
        throw err
    }
}

async function POST(testid: string, baseUrl: string, endpoint: string, authToken: string, payload: string) {
    if (!baseUrl || !endpoint) {
        throw Error(`One of the given values baseUrl: ${baseUrl}, endpoint: ${endpoint} is not not valid`)
    }

    baseUrl = baseUrl.trim()
    endpoint = endpoint.trim()
    reporter.addStep(testid, "info", `Making REST API POST call to ${endpoint}`)

    try {
        return await request(baseUrl)
        .post(endpoint)
        .auth(authToken, { type: 'bearer' })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(payload)
        .expect(200)
    } catch (err) {
        err.message = `Error making a POST call to ${endpoint}, ${err}`
        throw err
    }
}

export default {GET, POST}
