const { query } = require("../db/db");

const createRest = (req, res) => {
  const { name, location, price_range } = req.body;
  query(
    "INSERT INTO rests (name,location,price_range) VALUES($1, $2, $3) RETURNING *;",
    [name, location, price_range]
  )
    .then((data) => {
      res.json(data.rows[0]);
    })
    .catch((err) => {
      res.json({ message: "Error in inserting into rest", err });
    });
};
const getRests = (req, res) => {
  query("SELECT * FROM rests")
    .then((data) => {
      res.json(data.rows);
    })
    .catch((err) => {
      res.json({ message: "Error in getting all restaurants", err });
    });
};
const get_Rest = (req, res) => {
  const { id } = req.params;
  query("SELECT * FROM rests WHERE id =$1;", [id])
    .then((data) => res.json(data.rows[0]))
    .catch((err) =>
      res.json({ message: "Error in finding specific restaurant", err })
    );
};
const updateRest = (req, res) => {};
const deleteRest = (req, res) => {
  const { id } = req.params;
  query("DELETE FROM rests WHERE id=$1 RETURNING *;", [id])
    .then((data) => res.json(data.rows[0]))
    .catch((err) => {
      res.json({ message: "Error in deleting Restaurant", err });
    });
};

module.exports = {
  getRests,
  get_Rest,
  updateRest,
  deleteRest,
  createRest,
};
