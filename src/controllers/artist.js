const getDb = require('../services/db');
exports.create = async (req,res) => {
    const dbConnection = await getDb();
    const { name, genre } = req.body;
    try {
   await dbConnection.query(`INSERT INTO Artist (name, genre) VALUES (?, ?)`,[
    name,
    genre,
   ]);

    res.sendStatus(201);
    } catch (err) {
        res.sendStatus(500).json(err);
    }
    dbConnection.end();
}
exports.read = async (_,res) => {
    const dbConnection = await getDb();

    try {
        const [artist] = await dbConnection.query('SELECT * FROM Artist');

        res.status(200).json(artist);
    } catch (err) {
        res.status(500).json(err)   
    }
    dbConnection.end();
}
exports.readById = async (req,res) => {
    const dbConnection = await getDb();
        const { artistId } = req.params;
      
        const [[artist]] = await dbConnection.query('SELECT * FROM Artist WHERE id = ?', [
          artistId,
        ]);
      
        if (!artist) {
          res.sendStatus(404);
        } else {
          res.status(200).json(artist);
        }
      
        dbConnection.end();
}
exports.update = async (req, res) => {
  const dbConnection = await getDb();
  const data = req.body;
  const { artistId } = req.params;

  try {
    const [
      { affectedRows },
    ] = await dbConnection.query('UPDATE Artist SET ? WHERE id = ?', [data, artistId]);

    if (!affectedRows) {
      res.sendStatus(404);
    } else {
      res.status(200).send();
    }
  } catch (err) {
    res.sendStatus(500);
  }

  dbConnection.end();
};
exports.deleteById = async (req, res) => {
  const dbConnection = await getDb();
  const { artistId } = req.params;
  try {
    const [[artist]] = await dbConnection.query(
      `
      SELECT * FROM Artist WHERE id = ?
      `,
      [artistId]
    );
    if (!artist) {
      res.sendStatus(404);
    }
    await dbConnection.query(`DELETE FROM Artist WHERE id = ?`, [artistId]);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500).json(err);
  }
  dbConnection.end();
};