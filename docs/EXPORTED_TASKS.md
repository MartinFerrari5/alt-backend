# TAREAS EXPORTADAS

## 1. Filtro tareas exportadas

**GET** `http://localhost:3000/reportes/status/filtertasks?fullname=&date=`

_Observaciones:_

1. Filtro para usuario y admin de tareas exportadas
2. _user_ **NO PUEDE NI DEBE** filtrar por _fullname_ solo por la opcion _date_
3. _Date_ puede ser un mes (en ingles: December, November, etc) o un rango de fecha.

Ej: `http://localhost:3000/reportes/status/filtertasks?fullname=Tincho&date=December`
`http://localhost:3000/reportes/status/filtertasks?fullname=Tincho&date=2022-01-01 2026-12-12`
