import { connection } from "./connection.js";
import { users, tasks, emails } from "./data.js";

// Función asíncrona para insertar los datos
async function insertData() {
  const conn = await connection.getConnection();

  try {
    // Crear las tablas si no existen
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS alt_users (
        id CHAR(36) PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(100) NOT NULL DEFAULT 'employee'
      );
    `;

    const createEmailsTable = `
      CREATE TABLE IF NOT EXISTS emails (
        id CHAR(36) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE
      );
    `;

    const createTasksTable = `
      CREATE TABLE IF NOT EXISTS alt_tasks (
          id CHAR(36) PRIMARY KEY,
          company VARCHAR(255) NOT NULL,
          project VARCHAR(255) NOT NULL,
          task_type VARCHAR(255) NOT NULL,
          task_description VARCHAR(255),
          entry_time TIME,
          exit_time TIME,
          hour_type VARCHAR(100),
          lunch_hours FLOAT,
          status BOOLEAN DEFAULT 0,
          user_id CHAR(36),
          task_date DATE,
          worked_hours TIME,
          FOREIGN KEY (user_id) REFERENCES alt_users(id)
      );
    `;

    const createTaskTypesTable = `
      CREATE TABLE IF NOT EXISTS alt_task_types (
        id CHAR(36) PRIMARY KEY,
        options VARCHAR(255)
      );
    `;

    const createProjectsTable = `
      CREATE TABLE IF NOT EXISTS alt_projects (
        id CHAR(36) PRIMARY KEY,
        options VARCHAR(255)
      );
    `;

    const createCompaniesTable = `
      CREATE TABLE IF NOT EXISTS alt_companies (
        id CHAR(36) PRIMARY KEY,
        options VARCHAR(255)
      );
    `;

    const createHourTypesTable = `
      CREATE TABLE IF NOT EXISTS alt_hour_types (
        id CHAR(36) PRIMARY KEY,
        options VARCHAR(255)
      );
    `;

    // Ejecutar la creación de las tablas
    await conn.query(createUsersTable);
    await conn.query(createEmailsTable);
    await conn.query(createTasksTable);
    await conn.query(createTaskTypesTable);
    await conn.query(createProjectsTable);
    await conn.query(createCompaniesTable);
    await conn.query(createHourTypesTable);
    console.log("Tablas creadas exitosamente");

    // Crear trigger para calcular worked_hours
    const createTrigger = `
      CREATE TRIGGER updated_task_worked_hours
      BEFORE UPDATE ON alt_tasks
      FOR EACH ROW
      BEGIN
        IF OLD.entry_time <> NEW.entry_time OR OLD.exit_time <> NEW.exit_time THEN
          SET NEW.worked_hours = TIMEDIFF(NEW.exit_time, NEW.entry_time);
        END IF;
      END;
    `;

    await conn.query(createTrigger);
    console.log("Trigger creado exitosamente");

    // Insertar los usuarios y recuperar su ID
    let userMap = {};
    for (let user of users) {
      const [rows] = await conn.query(
        "SELECT id FROM alt_users WHERE email = ?",
        [user.email],
      );

      let userId;
      if (rows.length === 0) {
        const userInsertQuery = `
          INSERT INTO alt_users (id, full_name, email, password, role) VALUES (UUID(), ?, ?, ?, ?)
        `;
        await conn.query(userInsertQuery, [
          user.full_name,
          user.email,
          user.password,
          user.role || "employee",
        ]);

        const [newUserRows] = await conn.query(
          "SELECT id FROM alt_users WHERE email = ?",
          [user.email],
        );
        userId = newUserRows[0].id;
        console.log(`Usuario ${user.full_name} insertado exitosamente`);
      } else {
        userId = rows[0].id;
        console.log(`Usuario con el correo ${user.email} ya existe`);
      }

      userMap[user.email] = userId;

      // Insertar correo asociado al usuario si no existe
      try {
        const emailInsertQuery = `
          INSERT INTO emails (id, email) VALUES (UUID(), ?)
        `;
        await conn.query(emailInsertQuery, [user.email]);
        console.log(`Email ${user.email} insertado exitosamente`);
      } catch (emailError) {
        if (emailError.code === "ER_DUP_ENTRY") {
          console.log(`El email ${user.email} ya existe en la base de datos`);
        } else {
          throw emailError;
        }
      }
    }

    // Asignar los IDs reales de usuario a las tareas
    const validTasks = tasks
      .map((task) => {
        const userId =
          userMap[emails.find((e) => e.id === task.user_id)?.email];
        if (!userId) {
          console.warn(
            `Advertencia: No se encontró usuario para la tarea con email ${task.user_id}`,
          );
          return null;
        }
        return {
          ...task,
          user_id: userId,
        };
      })
      .filter(Boolean);

    if (validTasks.length === 0) {
      console.warn("No hay tareas válidas para insertar");
      return;
    }

    // Insertar las tareas con IDs de usuario correctos
    const taskInsertQuery = `
      INSERT INTO alt_tasks (id, company, project, task_type, task_description, entry_time, exit_time, lunch_hours, status, user_id, task_date) VALUES ?
    `;

    await conn.query(taskInsertQuery, [
      validTasks.map((task) => [
        task.id,
        task.company,
        task.project,
        task.task_type,
        task.task_description || null,
        task.entry_time || null,
        task.exit_time || null,
        task.lunch_hours || 0,
        task.status || 0,
        task.user_id,
        task.task_date || null,
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
