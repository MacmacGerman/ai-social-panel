export default function handler(req, res) {
    res.status(200).json({
        message: 'Ping successful',
        timestamp: new Date().toISOString(),
        query: req.query,
        body: req.body,
        method: req.method
    });
}
