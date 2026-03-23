import pool from "../DB/index.js";

export const getTasksByClient = async (req, res) => {
  const { clientId } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM compliance_Tasks WHERE client_id = $1 ORDER BY due_date",
      [clientId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const createTask = async (req, res) => {
  const {
    client_id,
    title,
    description,
    category,
    due_date,
    status,
    priority,
  } = req.body;

  try {
    // basic validation
    if (!client_id || !title || !due_date) {
      return res.status(400).json({
        message: "client_id, title and due_date are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO compliance_Tasks
      (client_id, title, description, category, due_date, status, priority)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        client_id,
        title,
        description,
        category,
        due_date,
        status || "Pending",
        priority,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const result = await pool.query(
      "UPDATE compliance_Tasks SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};