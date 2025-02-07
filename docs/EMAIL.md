# Uso de rutas: Proyecto ALT

- _Actualizado 31/01/2025_

## 1. Creacion de emails

**POST** `http://localhost:3000/emails`

### Body

```json
{
  "email": "tinchoferrarigd@gmail.com"
}
```

- Errores:
  1. Por mail ya registrado en la tabla de _emails_ validos
  2. Errores por falta de relleno de campos.
  3. Token no valido (solo admins)

## 2. Eliminar un mail

**DELETE** `http://localhost:3000/emails/:email_id`

- Errores:
  1. Token no valido (solo admins)
