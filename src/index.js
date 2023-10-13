const express = require('express');
const app = express();

// database
const db = require('./models');
const User = db.users;

// middleware
app.use(express.json());

app.post('/users', (req, res) => {
  const { firstName, lastName, isMale } = req.body;

  const user = {
    firstName,
    lastName,
    isMale,
  };

  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

app.get('/users', (req, res) => {
  User.findAll()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;

  User.findOne({ id })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

app.put('/users/:id', (req, res) => {
  const id = req.params.id;

  User.update(req.body, { where: { id } })
    .then((result) => {
      if (result[0] === 1) {
        res.send('User updated successfully');
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

app.delete('/users/:id', (req, res) => {
  const id = req.params.id;

  User.destroy({ where: { id } })
    .then((result) => {
      if (result === 1) {
        res.send('User deleted successfully');
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
