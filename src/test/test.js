import { test } from 'node:test';
import assert from 'node:assert';
import http from 'node:http';

const baseUrl = 'http://localhost:5000/api/users';

// Función para generar usuarios mock
async function generateMockUsers(numUsers) {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/mocks/generateData',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const data = JSON.stringify({ users: numUsers });

    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            if (res.statusCode !== 201) {
                return reject(new Error(`Error al generar usuarios mock: ${res.statusCode}`));
            }
            res.on('data', (d) => {
                resolve(d);
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(data);
        req.end();
    });
}

// Test para el POST /create
test('POST /create', async () => {
    const data = JSON.stringify({ username: 'testuser', password: 'testpass' });
    
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/users/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
        },
    };

    const req = http.request(options, (res) => {
        assert.strictEqual(res.statusCode, 201);

        res.on('data', (d) => {
            process.stdout.write(d);
        });
    });

    req.on('error', (error) => {
        console.error(error);
    });

    req.write(data);
    req.end();
});

// Test para el GET /
test('GET /', async () => {
    await generateMockUsers(5); // Generar 5 usuarios mock antes de la prueba

    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/users',
        method: 'GET',
    };

    const req = http.request(options, (res) => {
        assert.strictEqual(res.statusCode, 200);
        
        res.on('data', (d) => {
            const users = JSON.parse(d);
            assert.ok(Array.isArray(users) && users.length > 0);
        });
    });

    req.on('error', (error) => {
        console.error(error);
    });

    req.end();
});

// Test para el GET /:id
test('GET /:id', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/users',
        method: 'GET',
    };

    const req = http.request(options, async (res) => {
        assert.strictEqual(res.statusCode, 200);

        res.on('data', (d) => {
            const users = JSON.parse(d);
            const userId = users[0]._id;

            const getUserOptions = {
                hostname: 'localhost',
                port: 5000,
                path: `/api/users/${userId}`,
                method: 'GET',
            };

            const getReq = http.request(getUserOptions, (getRes) => {
                assert.strictEqual(getRes.statusCode, 200);
                
                getRes.on('data', (getData) => {
                    const user = JSON.parse(getData);
                    assert.strictEqual(user._id, userId);
                });
            });

            getReq.on('error', (error) => {
                console.error(error);
            });

            getReq.end();
        });
    });

    req.on('error', (error) => {
        console.error(error);
    });

    req.end();
});
