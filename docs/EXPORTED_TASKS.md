# TAREAS EXPORTADAS

## 1. Filtro tareas exportadas

**GET** `http://localhost:3000/reportes/status/filtertasks?fullname=&date=`

_Observaciones:_

1. Filtro para usuario y admin de tareas exportadas
2. _user_ **NO PUEDE NI DEBE** filtrar por _fullname_ solo por la opcion _date_
3. _Date_ puede ser un mes (en ingles: December, November, etc) o un rango de fecha.

Ej: `http://localhost:3000/reportes/status/filtertasks?fullname=Tincho&date=December`
`http://localhost:3000/reportes/status/filtertasks?fullname=Tincho&date=2022-01-01 2026-12-12`

## 2. Envio tareas a Recursos Humanos

**POST** `http://localhost:3000/reportes/status/rrhh?company=facebook&project=reportes&date=2025-02-20 2025-03-18`

**Body**

```JSON
{
    "tasks":[
        
            {
                "id": "83676917-ef09-11ef-8749-047c1614f0fd",
                "company": "Tipo de hora",
                "project": "Travelling is awesome",
                "task_type": "production",
                "task_description": "Description for planes",
                "entry_time": "09:20:00",
                "exit_time": "16:51:00",
                "hour_type": "comun",
                "lunch_hours": 1,
                "status": 1,
                "user_id": "6053dcef-e1ba-11ef-9540-047c1614f0fd",
                "task_date": "2024-12-13T03:00:00.000Z",
                "worked_hours": "07:31:00",
                "full_name": "user",
                "incremental_total": "07:31:00",
                "total": "16:33:0"
              },
              {
            "id": "6b725ac2-ef39-11ef-8950-047c1614f0fd",
            "company": "Suma",
            "project": "Travelling is awesome",
            "task_type": "production",
            "task_description": "Description for planes",
            "entry_time": "06:20:00",
            "exit_time": "10:51:00",
            "hour_type": "comun",
            "lunch_hours": 1,
            "status": 1,
            "user_id": "11c089bd-df81-11ef-b075-047c1614f0fd",
            "task_date": "2025-01-05T03:00:00.000Z",
            "worked_hours": "04:31:00",
            "full_name": "Tincho",
            "incremental_total": "04:31:00",
            "total": "16:58:00"
        }
        
    ]
}
```

- Se envia la ruta con los filtros como _querys_ y luego en el _body_ se le pasa las tareas
