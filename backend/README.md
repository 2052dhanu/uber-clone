# Backend API Documentation 

# Users: POST /users/register 

## Description

Registers a new user and returns a JSON Web Token (JWT) plus the created user object.

## Route

- POST `/users/register`

## Headers

- `Content-Type: application/json` (required)

## Request Body 

```json
{
  "fullname": {
    "firstname": "string (required, min 3)",
    "lastname": "string (optional, min 3)"
  },
  "email": "string (required, valid email)",
  "password": "string (required, min 6)"
}
```

## Validators enforced in backend 

- `body('email').isEmail()` — must be a valid email
- `body('fullname.firstname').isLength({ min: 3 })` — firstname required, minimum 3 characters
- `body('password').isLength({ min: 6 })` — password required, minimum 6 characters

## Example request

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {"firstname":"John","lastname":"Doe"},
    "email":"john@example.com",
    "password":"secret123"
  }'
```

## Example Response (201 Created) 

```json
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<userId>",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com",
    "socketId": null
  }
}
```

- The token is a JWT signed with `process.env.JWT_SECRET`.
- Passwords are hashed using bcrypt before storage. The model sets `password` to `select: false`, so responses should not include the raw password.


---

# Users: POST /users/login 

## Description

Authenticates an existing user and returns a JSON Web Token (JWT) plus the authenticated user object.

## Route

- POST `/users/login`

## Headers

- `Content-Type: application/json` (required)

## Request Body 

```json
{
  "email": "string (required, valid email)",
  "password": "string (required, min 6)"
}
```

## Validators enforced in backend 

- `body('email').isEmail()` — must be a valid email
- `body('password').isLength({ min: 6 })` — password required, minimum 6 characters

## Example request

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@example.com",
    "password":"secret123"
  }'
```

## Example Response (200 OK) 

```json
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<userId>",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com",
    "socketId": null
  }
}
```

- The token is a JWT signed with `process.env.JWT_SECRET`.
- The login flow uses `.select('+password')` to validate the supplied password, but responses never include the raw password because the model sets `password` to `select: false`.

## Error Responses

- `400 Bad Request` — validation errors (response format: `{ errors: [ { msg, param, location, value } ] }`).
- `401 Unauthorized` — invalid email or password (response format: `{ message: "Invalid email or password " }`).
- `500 Internal Server Error` — unexpected server/database errors.

## Notes & Tips

- Ensure `process.env.JWT_SECRET` is set in your environment for token generation.
- Consider implementing rate limiting or account lockout after repeated failed logins to reduce brute-force risk.

---

# Users: GET /users/profile

## Description

Returns the authenticated user's profile information. This endpoint is protected — it requires a valid JWT (sent via `Authorization` header as `Bearer <token>` or stored in a `token` cookie).

## Route

- GET `/users/profile`

## Headers / Cookies

- `Authorization: Bearer <token>` (recommended) or send a `token` cookie set by the login flow.

## Example request

```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer <jwt_token>"
```

## Example Response (200 OK)

```json
{
  "_id": "<userId>",
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john@example.com",
  "socketId": null
}
```

## Error Responses

- `401 Unauthorized` — missing or invalid token.
- `500 Internal Server Error` — unexpected server/database errors.

## Notes & Tips

- The response is derived from `req.user` and will not include the raw password.
- Prefer using the `Authorization` header to avoid CSRF issues with cookies.

---

# Users: GET /users/logout

## Description

Logs the user out by clearing the `token` cookie (if present) and adding the token to the server-side blacklist to invalidate it immediately.

## Route

- GET `/users/logout`

## Headers / Cookies

- `Authorization: Bearer <token>` or send the `token` cookie.

## Example request

```bash
# Using Authorization header
curl -X GET http://localhost:3000/users/logout \
  -H "Authorization: Bearer <jwt_token>"

# Using cookie (for clients that support cookies)
curl -X GET http://localhost:3000/users/logout \
  -b "token=<jwt_token>"
```

## Example Response (200 OK)

```json
{ "message": "Logged out successfully" }
```

## Error Responses

- `401 Unauthorized` — missing or invalid token.
- `500 Internal Server Error` — unexpected server/database errors.

## Notes & Tips

- The server stores logged-out tokens in the `blacklist` collection (`blacklistTokenModel`) to prevent reuse.
- Make sure the client sends the same token used for authentication (either cookie or Authorization header) so it can be blacklisted.
- Consider returning a `204 No Content` for logout in the future if you prefer no response body.



