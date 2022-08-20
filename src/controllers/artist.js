const getDb = require('../services/db');
exports.create = async (req,res) => {
    const dbConnection = await getDb();
    const { name, genre } = req.body;
    try {
   await dbConnection.query(`INSERT INTO Artist (name, genre) VALUES ('${name}', '${genre}')`);

    res.sendStatus(201);
    } catch (err) {
        res.sendStatus(500).json(err);
    }
    dbConnection.end();
}
