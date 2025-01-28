import { connection } from "./connection.js";
import { data, users } from "./data.js";

// Función asíncrona para insertar los datos
async function insertData() {
  const conn = await connection.getConnection(); // Obtener una conexión del pool

  try {
    // Crear las tablas si no existen
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS alt_users (
        id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
        name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255),
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        isAdmin BOOLEAN,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    const createProductsTable = `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        category VARCHAR(255),
        image VARCHAR(255),
        price DECIMAL(10, 2),
        countInStock INT,
        brand VARCHAR(255),
        rating DECIMAL(3, 2),
        numReviews INT,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Ejecutar la creación de las tablas
    await conn.query(createUsersTable);
    await conn.query(createProductsTable);
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
      INSERT INTO products (name, slug, category, image, price, countInStock, brand, rating, numReviews, description) VALUES ?
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
