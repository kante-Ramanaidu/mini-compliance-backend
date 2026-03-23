import pool from "../DB/index.js";

export const getClients = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM clients ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createClient = async (req, res) => {
  const { company_name, country, entity_type } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO clients (company_name, country, entity_type)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [company_name, country, entity_type]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Error creating client" });
  }
};