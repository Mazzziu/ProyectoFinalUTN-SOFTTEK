# Proyecto final del Curso de Frontend UTN

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_CONNECT`

## API Reference

#### Login

```http
  POST /clients/login
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

#### Registro

```http
  POST /clients
```

| Parameter  | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `name`     | `string` | **Required**. Nombre del lugar |
| `email`    | `string` | **Required**                   |
| `password` | `string` | **Required**                   |
