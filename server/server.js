// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn } = require('child_process'); // For running Python script and index.jsx

const app = express();
const port = process.env.PORT || 5000; // Use environment port or 5000

app.use(cors(
    {
        origin: 'https://secbreach.vercel.app',
        methods: ['POST', 'GET','PUT','DELETE','OPTIONS'],
        credentials: true,
    }
));
app.use(bodyParser.json({ limit: '10mb' }));

app.post('/api/detect-face', (req, res) => {
    const base64Image = req.body.image;
    if (!base64Image) {
        return res.status(400).send({ error: 'No image data provided' });
    }

    const pythonProcess = spawn('python', ['./face_detector.py']); // Path to your Python script, no image argument here

    let pythonOutput = '';
    let pythonError = '';

    // Pipe the base64 image data to the Python script's stdin
    pythonProcess.stdin.write(base64Image);
    pythonProcess.stdin.end(); // Signal end of input

    pythonProcess.stdout.on('data', (data) => {
        pythonOutput += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        pythonError += data.toString();
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`Python script exited with code ${code}, error: ${pythonError}`);
            return res.status(500).send({ error: 'Face detection script failed', details: pythonError });
        }

        const output = pythonOutput.trim();
        let faceDetected = false;
        if (output === 'face_detected') {
            faceDetected = true;
        } else if (output === 'no_face_detected') {
            faceDetected = false;
        } else {
            console.warn(`Unexpected output from Python script: ${output}`);
        }

        res.json({ faceDetected: faceDetected });
    });
});


app.post('/api/kyc', (req, res) => {
    const kycData = req.body;
    console.log("Received KYC Data from Frontend:");
    console.log(kycData);
    res.json({ message: 'KYC data received successfully!', data: kycData });
});

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});

// --- Spawn index.jsx as a separate Node.js process ---
const indexJSXProcess = spawn('node', ['index.jsx']);

indexJSXProcess.stdout.on('data', (data) => {
    console.log(`index.jsx stdout: ${data}`); // Log output from index.jsx
});

indexJSXProcess.stderr.on('data', (data) => {
    console.error(`index.jsx stderr: ${data}`); // Log errors from index.jsx
});

indexJSXProcess.on('close', (code) => {
    console.log(`index.jsx process exited with code ${code}`); // Log when index.jsx exits
});
// --- End of spawning index.jsx ---