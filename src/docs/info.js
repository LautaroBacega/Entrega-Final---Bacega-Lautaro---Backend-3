export const info = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API News",
            version: "1.0.0",
            description: "API de noticias",
        },
        servers: [
            {
            url: "http://localhost:5000",
            },
        ],
        },
        apis: ["./src/docs/*.yml"],
};