# Uso de rutas: Proyecto ALT

- _Actualizado 31/01/2025_

## 1. Creacion de usuarios

**POST** `http://localhost:3000/users`

### Body

```json
{
  "full_name": "tincho",
  "email": "fernandeezalan20@gmail.com",
  "password": "Halo.123",
  "role": "admin"
}
```

- Errores:
  1. Por mail ya registrado en la tabla de _emails_ validos
  2. Errores por falta de relleno de campos
  3. Formato de los campos (contraseñas sin mayusculas, etc)

## 2. Reseteo de contraseña enviado por mail (Usuario se olvido la contraseña)

**POST** `http://localhost:3000/users/newpassword`

### Body

```json
{
  "email": "fernandeezalan20@gmail.com"
}
```

- Errores:
  1. Por mail **NO** registrado en la tabla de _alt_users_.
  2. Errores por falta de relleno de campos.

## 3. Cambio de contraseña (El usuario quiere cambiar la contraseña a voluntad)

**POST** `http://localhost:3000/users/changepassword`

### Body

```json
{
  "email": "tinchoferrarigd@gmail.com",
  "old_password": "ODjUCo0w9S",
  "new_password": "Halo.123"
}
```

- Errores:
  1. Por mail **NO** registrado en la tabla de _alt_users_.
  2. Errores por falta de relleno de campos.
  3. Contraseña vieja no coincide
  4. Errores por no cumplir con parametros de contraseña (mayusculas, minusculas, etc)

## 4. Actualizar datos del usuario (solo nombre completo y/o mail)

**PUT** `http://localhost:3000/users/user?user_id=12345`
*Enviar los parametros como query*

### Body

```json
{
  "full_name": "Tincho",
  "email": "tinchoferrarigd@gmail.com"
}
```

- Errores:
  1. Por mail **NO** registrado en la tabla de _emails_.
  2. Mail ya existente en la tabla _alt_users_
