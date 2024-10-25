import { test } from 'node:test';
import assert from 'node:assert';
import http from 'node:http';

const baseUrl = 'http://localhost:5000/api/users';

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
        assert.strictEqual(res.statusCode, 201); // Asegúrate de que el código de estado sea el correcto

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

test('GET /', async () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/users',
        method: 'GET',
    };

    const req = http.request(options, (res) => {
        assert.strictEqual(res.statusCode, 200); // Asegúrate de que el código de estado sea el correcto

        let data = '';
        res.on('data', (chunk) => {
            data += chunk; // Recopilar los datos recibidos
        });

        res.on('end', () => {
            const users = JSON.parse(data); // Parsea la respuesta JSON
            assert(Array.isArray(users)); // Asegúrate de que sea un array
            console.log(users); // Mostrar los usuarios en la consola
        });
    });

    req.on('error', (error) => {
        console.error(error);
    });

    req.end();
});

test('GET /:id', async () => {
    const userId = '669efa92e49326b59990308a'; // Reemplaza esto con un ID de usuario válido en tu base de datos

    const options = {
        hostname: 'localhost',
        port: 5000,
        path: `/api/users/${userId}`,
        method: 'GET',
    };

    const req = http.request(options, (res) => {
        assert.strictEqual(res.statusCode, 200); // Asegúrate de que el código de estado sea el correcto

        let data = '';
        res.on('data', (chunk) => {
            data += chunk; // Recopilar los datos recibidos
        });

        res.on('end', () => {
            const user = JSON.parse(data); // Parsea la respuesta JSON
            assert.strictEqual(user._id, userId); // Verifica que el ID sea correcto
            console.log(user); // Mostrar el usuario en la consola
        });
    });

    req.on('error', (error) => {
        console.error(error);
    });

    req.end();
});

test('GET /:id con ID no válido', async () => {
    const invalidId = 'invalidId';

    const options = {
        hostname: 'localhost',
        port: 5000,
        path: `/api/users/${invalidId}`,
        method: 'GET',
    };

    const req = http.request(options, (res) => {
        assert.strictEqual(res.statusCode, 500); // Asegúrate de que el código de estado sea el correcto

        let data = '';
        res.on('data', (chunk) => {
            data += chunk; // Recopilar los datos recibidos
        });

        res.on('end', () => {
            const errorResponse = JSON.parse(data); // Parsea la respuesta JSON
            assert.strictEqual(errorResponse.message, 'Error al obtener usuario'); // Verifica el mensaje de error
            console.log(errorResponse); // Mostrar el error en la consola
        });
    });

    req.on('error', (error) => {
        console.error(error);
    });

    req.end();
});