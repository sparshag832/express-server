import pool from "../config/db.js";

// User table schema
export const User = {
  id: "SERIAL PRIMARY KEY",
  username: "VARCHAR(50) UNIQUE NOT NULL",
  email: "VARCHAR(100) UNIQUE NOT NULL",
  password: "VARCHAR(255) NOT NULL",
  created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
};

// Create User Table
export const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users(
      id ${User.id},
      username ${User.username},
      email ${User.email},
      password ${User.password},
      created_at ${User.created_at}
    );
  `;
  try {
    await pool.query(query);
    console.log("Table User Created Successfully");
  } catch (err) {
    console.error("Error Occurred In Creating User Table:", err.message);
  }
};

// Create User
export const createUser = async (username, email, password) => {
  const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, username, email, created_at;
  `;
  const result = await pool.query(query, [username, email, password]);
  return result.rows[0];  
};

// Get User by ID
export const getUserById = async (id) => {
  try{
  const query = `
    SELECT id, username, email, created_at 
    FROM users 
    WHERE id = $1;
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0]; 
  }catch(err){
  console.error("Error Occurred In Getting User:", err.message);
  }
};

// Get All Users
export const getAllUsers = async () => {
  const query = `
    SELECT id, username, email, created_at
    FROM users order by id asc;
  `;
  const result = await pool.query(query);
  return result.rows; 
};

// Update User
export const updateUser = async (id, { username, email, password }) => {

  let setClauses = [];
  let values = [id];

  if (username) {
    setClauses.push(`username = $${setClauses.length + 2}`);
    values.push(username); 
  }

  if (email) {
    setClauses.push(`email = $${setClauses.length + 2}`);
    values.push(email); 
  }

  if (password) {
    setClauses.push(`password = $${setClauses.length + 2}`);
    values.push(password);
  }

  if (setClauses.length === 0) {
    return null;
  }

  const query = `
    UPDATE users
    SET ${setClauses.join(', ')}
    WHERE id = $1
    RETURNING id, username, email, created_at;
  `;

  const result = await pool.query(query, values);
  return result.rows[0]; 
};

// Delete User
export const deleteUser = async (id) => {
  const query = `
    DELETE FROM users
    WHERE id = $1
    RETURNING id, username, email;
  `;
  
  const result = await pool.query(query, [id]);
  
  return result.rows[0]; 
};

// Get User by Email
export const getUserByEmail = async (email) => {
  try {
    const query = `
      SELECT id, username, email, password, created_at
      FROM users
      WHERE email = $1;
    `;
    const result = await pool.query(query, [email]);
    return result.rows[0];  
  } catch (err) {
    console.error("Error Occurred In Getting User by Email:", err.message);
  }
};

// export const updateUser = async (id, { username, email, password }) => {
//   const query = `
//     UPDATE users
//     SET username = $1, email = $2, password = $3
//     WHERE id = $4
//     RETURNING id, username, email, created_at;
//   `;
//   const result = await pool.query(query, [username, email, password, id]);
//   return result.rows[0];
// };
