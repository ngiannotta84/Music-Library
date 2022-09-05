const getDb = require ('../services/db');
exports.create = async (req,res) => {
    const db = await getDb();
    const { title,year } = req.body;
    const { artistId } = req.params;
try {
    const [[dbArtist]] = await db.query ('SELECT * FROM Artist Where id =?',[
        artistId
    ])
    
    if (!dbArtist) return res.sendStatus(404);

    await db.query('INSERT INTO Album SET ?',{
        title,
        year,
        artistId,
    });
    res.sendStatus(201);
} catch(err) {
    res.status(500).json(err);
}
db.end()
};