import { connection } from "./connection.js";
import { users, tasks } from "./data.js"; // Importamos solo users y tasks

// Función asíncrona para insertar los datos
async function insertData() {
  const conn = await connection.getConnection(); // Obtener una conexión del pool

  try {
    // Crear las tablas si no existen
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS alt_users (
        id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
        name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(100) NOT NULL DEFAULT 'employee'
      );
    `;

    const createEmailsTable = `
      CREATE TABLE IF NOT EXISTS emails (
        id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
        email VARCHAR(255) NOT NULL UNIQUE
      );
    `;

    const createTasksTable = `
      CREATE TABLE IF NOT EXISTS alt_tasks (
        id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
        company VARCHAR(255) NOT NULL,
        project VARCHAR(255) NOT NULL,
        task_type VARCHAR(255) NOT NULL,
        task_description VARCHAR(255),
        entry_time TIME,
        exit_time TIME,
        lunch_hours FLOAT,
        status BOOLEAN DEFAULT 0
      );
    `;

    // Ejecutar la creación de las tablas
    await conn.query(createUsersTable);
    await conn.query(createEmailsTable);
    await conn.query(createTasksTable);
    console.log("Tablas creadas exitosamente");

    // Insertar los usuarios
    for (let user of users) {
      const [rows] = await conn.query("SELECT * FROM alt_users WHERE email = ?", [user.email]);
      if (rows.length === 0) {
        const userInsertQuery = `
          INSERT INTO alt_users (name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)
        `;
        await conn.query(userInsertQuery, [
          user.name,
          user.last_name || '',
          user.email,
          user.password,
          user.role || 'employee',
        ]);
        console.log(`Usuario ${user.name} insertado exitosamente`);
      } else {
        console.log(`Usuario con el correo ${user.email} ya existe`);
      }
    }

    // Insertar las tareas
    const taskInsertQuery = `
      INSERT INTO alt_tasks (id, company, project, task_type, task_description, entry_time, exit_time, lunch_hours, status) VALUES ?
    `;

    await conn.query(taskInsertQuery, [
      tasks.map((task) => [
        task.id,
        task.company,
        task.project,
        task.task_type,
        task.task_description,
        task.entry_time,
        task.exit_time,
        task.lunch_hours,
        task.status,
      ]),
    ]);

    console.log("Tareas insertadas exitosamente");
  } catch (error) {
    console.error("Error al insertar datos: ", error);
  } finally {
    conn.release(); // Liberar la conexión después de usarla
  }
}

// Llamar a la función para insertar los datos
insertData();
