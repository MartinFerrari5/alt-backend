import { connection } from "./connection.js";
import { data, users } from "./data.js";

// Función asíncrona para insertar los datos
async function insertData() {
  const conn = await connection.getConnection(); // Obtener una conexión del pool

  try {
    // Crear las tablas si no existen
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS alt_users (
      id CHAR(36) PRIMARY KEY, 
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password varchar(255) not null,
      role varchar(100) not null DEFAULT("employee")
    );
    `;
    const createTasksTable = `
      CREATE TABLE IF NOT EXISTS alt_tasks(
        id CHAR(36) PRIMARY KEY,
        company VARCHAR(255) NOT NULL,
        project VARCHAR(255) NOT NULL,
        task_type VARCHAR(255) NOT NULL,
        task_description varchar(255),
        entry_time time,
        exit_time time,
        lunch_hours float,
        status bool default 0,
        user_id CHAR(36),
        task_date date,
        FOREIGN KEY (user_id) REFERENCES alt_users(id)
      );
    `;

    // Ejecutar la creación de las tablas
    await conn.query(createUsersTable);
    await conn.query(createTasksTable);
    console.log("Tablas creadas exitosamente");

    // Insertar los usuarios
    for (let user of users) {
      const [rows] = await conn.query(
        "SELECT * FROM alt_users WHERE email = ?",
        [user.email],
      );
      if (rows.length === 0) {
        const userInsertQuery = `
          INSERT INTO alt_users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)
        `;
        await conn.query(userInsertQuery, [
          user.name,
          user.email,
          user.password,
          user.isAdmin,
        ]);
        console.log(`Usuario ${user.name} insertado exitosamente`);
      } else {
        console.log(`Usuario con el correo ${user.email} ya existe`);
      }
    }

    // Insertar los productos
    const productInsertQuery = `
      INSERT INTO alt_tasks (name, slug, category, image, price, countInStock, brand, rating, numReviews, description) VALUES ?
    `;
    await conn.query(productInsertQuery, [
      data.map((product) => [
        product.name,
        product.slug,
        product.category,
        product.image,
        product.price,
        product.countInStock,
        product.brand,
        product.rating,
        product.numReviews,
        product.description,
      ]),
    ]);
    console.log("Productos insertados exitosamente");
  } catch (error) {
    console.error("Error al insertar datos: ", error);
  } finally {
    conn.release(); // Liberar la conexión después de usarla
  }
}

// Llamar a la función para insertar los datos
insertData();
