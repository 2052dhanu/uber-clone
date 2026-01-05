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

## Error Responses

- `400 Bad Request` — validation errors (response format: `{ errors: [ { msg, param, location, value } ] }`).
- `409 Conflict` — **possible** when email already exists (depends on how duplicate errors are handled by the server). If not handled specifically, a `500 Internal Server Error` may be returned instead.
- `500 Internal Server Error` — unexpected server/database errors.

## Notes & Tips

- Ensure `process.env.JWT_SECRET` is set in your environment for token generation.
- The endpoint expects the full JSON structure shown above (including the nested `fullname` object).
- Consider adding explicit duplicate-email handling in the controller to return a `409 Conflict` with a friendly message.

---

