# Uso de rutas: _tasks_

- _Actualizado 31/01/2025_

## 1. Crear Tarea

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

## 2. Actualizar tareas

**PUT** `http://localhost:3000/tasks/:task_id`

### Body

_Observaciones:_ Se pueden enviar la cantidad de parametros a actualizar que sean necesarios

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

## 3. Filtro Tareas

**GET** `http://localhost:3000/tasks/filtertasks?fullname=admin&date=2022-03-12 2027-08-12`

**_Observaciones:_**

1. NO agregar comillas en el query: _Correcto:_ **fullname=admin**. _Erroneo:_ "admin"
2. Chequear que el usuario exista correctamente en la bbdd.
3. Si el usuario a visualizar es **John Doe**, crear tareas utilizando su token
4. Los parametros pueden estar vacios.

## 4. Finalizar/Exportar tarea (_status=1_)

**PUT** `http://localhost:3000/status/c6fc6f3f-e0d4-11ef-ad66-047c1614f0fd`

### Body

```json
{
  "status": 1
}
```

## 4. Opciones de tareas

**GET** `http://localhost:3000/options/:tabla`
