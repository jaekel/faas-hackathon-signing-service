const http = require('http');

function serverFunction(req, res) {
    if (req.url === '/') {
        test(req, res);
    } else if (req.url === '/sign') {
        signature(req, res);
    } else {
        error(res);
    }
}

function test(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('HI');
    res.end();
}

function validateHMAC(hmac) {
    const regexExp = /^[a-f0-9]{64}$/gi;
    if (!regexExp.test(hmac)) {
        console.log('Invalid input string');
    }
    if (hmac.length !== 64) {
        console.log('Invalid input length');
    }
    return null;
}

function signature(req, res) {
    const hmac = JSON.parse(req.body.hmac);
    let result = validateHMAC(hmac);
    if (result !== null) {
        return result;
    }
    //   payload = generatePayload(hmac);
    //   signPayload(payload);
    return 'valid hmac';
    res.end();
}

function error(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.write('Hier läuft etwas schief');
    res.end();
}

const server = http.createServer(serverFunction);

const serverConfig = {
    hostname: '0.0.0.0',
    port: 3000,
};

server.listen(serverConfig.port, serverConfig.hostname, () => {
    console.log(
        `Server running at http://${serverConfig.hostname}:${serverConfig.port}/`
    );
});
