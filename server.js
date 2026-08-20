const express = require("express");

const app = express();
app.use(express.json());

const PORT = 3000;

// Fake users — for learning only
const users = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.test",
    role: "user",
    phone: "+40-700-111-111"
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.test",
    role: "admin",
    phone: "+40-700-222-222"
  },
  {
    id: 3,
    name: "Charlie",
    email: "charlie@example.test",
    role: "user",
    phone: "+40-700-333-333"
  }
];

// Home endpoint
app.get("/", (req, res) => {
  res.json({
    message: "API Security Lab",
    endpoints: [
      "GET /users",
      "GET /users/:id"
    ]
  });
});

// Return all users
app.get("/users", (req, res) => {
  res.json(users);
});

// Intentionally vulnerable endpoint
// The server does NOT check whether the requester
// is allowed to access this particular user.
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(user => user.id === id);

  if (!user) {
    return res.status(404).json({
      error: "User not found"
    });
  }

  res.json(user);
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
