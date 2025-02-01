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

## Reseteo de contraseña enviado por mail (Usuario se olvido la contraseña)

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

## 2. Cambio de contraseño (El usuario quiere cambiar la contraseña a voluntad)

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

## 3. Crear Tarea

**POST** `http://localhost:3000/tasks`

### Body

```json
{
  "company": "Fravega Empleado",
  "project": "Reporte de Actividades",
  "task_type": "desarrollo",
  "task_description": "",
  "entry_time": "10:00",
  "exit_time": "15:00",
  "lunch_hours": "25",
  "status": "0",
  "task_date": "2024/01/08"
}
```

- Errores:
  1. Errores por falta de relleno de campos.
  2. Errores en las horas (hora de ingreso mayor a la de salida, formato (HH:MM),etc)

## 4. Filtro Tareas

**GET** `http://localhost:3000/tasks/filtertasks?fullname=admin&date=2022-03-12 2027-08-12`

**_Observaciones:_**

1. NO agregar comillas en el query: _Correcto:_ **fullname=admin**. _Erroneo:_ "admin"
2. Chequear que el usuario exista correctamente en la bbdd.
3. Si el usuario a visualizar es **John Doe**, crear tareas utilizando su token
4. Los parametros pueden estar vacios.
