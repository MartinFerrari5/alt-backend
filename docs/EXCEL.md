# ALT DESCARGA DE EXCEL

1. Descargar tareas por parte de admin

**POST** `http://localhost:3000/reportes/status/download`

### Body 

```json
{
    "tasks": "[
                {
                    ...tasks
                }
                ]"
}

```