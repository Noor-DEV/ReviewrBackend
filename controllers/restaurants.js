const { query } = require("../db/db");

const createRest = async (req, res, next) => {
  try {
    const { name, location, price_range } = req.body;
    const data = await query(
      "INSERT INTO rests (name,location,price_range) VALUES($1, $2, $3) RETURNING *;",
      [name, location, price_range]
    );
    res.status(201).json({
      id: data.rows[0].id,
      name: data.rows[0].name,
      location: data.rows[0].location,
      price_range: data.rows[0].price_range,
      avg_rating: null,
      reviews_count: null,
    });
  } catch (err) {
    res.status(500).json({ message: "Error in inserting into rest", err });
  }
};
const getRests = (req, res) => {
  const sql =
    "SELECT * FROM rests LEFT JOIN (SELECT rest_id, TRUNC(AVG(rating),1) AS avg_rating, COUNT(*) AS reviews_count from reviews group by rest_id) reviews ON rests.id = reviews.rest_id;";
  query(sql)
    .then((data) => {
      res.json({
        count: data.rows.length,
        restaurants: data.rows,
      });
    })
    .catch((err) => {
      res.json({ message: "Error in getting all restaurants", err });
    });
};
const get_Rest = async (req, res) => {
  try {
    const { id } = req.params;
    const sql =
      "SELECT * FROM rests LEFT JOIN (SELECT rest_id, TRUNC(AVG(rating),1) AS avg_rating, COUNT(*) AS reviews_count from reviews group by rest_id) reviews ON rests.id = reviews.rest_id WHERE id =$1;";
    const data = await query(sql, [id]);
    const reviews = await query("SELECT * FROM reviews WHERE rest_id = $1", [
      id,
    ]);
    res.json({ restaurant: data.rows[0], reviews: reviews.rows });
  } catch (err) {
    res.json({ message: "Error in finding specific restaurant", err });
  }
};
const updateRest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, location, price_range } = req.body;
    const data = await query(
      "UPDATE rests SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *;",
      [name, location, price_range, id]
    );
    const reveiwsData = await query(
      "SELECT rest_id, COUNT(*) AS reviews_count, TRUNC(AVG(rating),1) AS avg_rating from reviews WHERE rest_id = $1 GROUP BY rest_id;",
      [id]
    );
    res.status(200).json({
      id: data.rows[0].id,
      name: data.rows[0].name,
      location: data.rows[0].location,
      price_range: data.rows[0].price_range,
      avg_rating: reveiwsData.rows[0].avg_rating,
      reviews_count: reveiwsData.rows[0].reviews_count,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in updating restaurant",
      err,
    });
  }
};
const deleteRest = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await query("DELETE FROM rests WHERE id=$1 RETURNING *;", [
      id,
    ]);
    res.json(data.rows[0]);
  } catch (err) {
    res.json({ message: "Error in deleting Restaurant", err });
  }
};

const getReviews = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id, ".........id..............");
    const data = await query("SELECT * FROM reviews WHERE rest_id = $1", [id]);
    res.status(200).json(data.rows);
  } catch (err) {
    res.status(500).json({
      message: "Error in getting reviews",
      err,
    });
  }
};
const createReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rest_id, name, content, rating } = req.body;
    const createdReview = await query(
      "INSERT INTO reviews (rest_id, name, content, rating) VALUES ($1, $2, $3, $4) RETURNING *;",
      [rest_id, name, content, rating]
    );
    const sql =
      "SELECT * FROM rests LEFT JOIN (SELECT rest_id, TRUNC(AVG(rating),1) AS avg_rating, COUNT(*) AS reviews_count from reviews group by rest_id) reviews ON rests.id = reviews.rest_id WHERE id =$1;";
    const reviewRestaurant = await query(sql, [id]);
    res.status(200).json({
      review: createdReview.rows[0],
      restaurant: reviewRestaurant.rows[0],
    });
  } catch (err) {
    console.log("Error in creating Review", err);
    res.status(500).json({
      message: "Error in creating Review",
      Error: err,
    });
  }
};
module.exports = {
  getRests,
  get_Rest,
  updateRest,
  deleteRest,
  createRest,
  getReviews,
  createReview,
};
