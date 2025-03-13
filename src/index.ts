import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
const port = 4000

app.use(express.json())

// app.use(errorHandler)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve users' })
  }
})

app.get("/users/:id", async (req, res) => {
  const { id } = req.params
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: `User ID: ${id} does not exist` })
  }
})

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    })
    if (!existingUser) {
      res.status(404).json({ message: `User ID: ${id} not found` });
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        password,
      },
    })
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user' });
  }
})

app.delete(`/users/:id`, async (req, res) => {
  const { id } = req.params
  try {
    const user = await prisma.user.delete({
      where: { id: Number(id) },
    })
    res.status(200).json({ message: 'Deleted user' })
  } catch (error) {
    res.status(500).json({ message: `Failed to delete User ID: ${id}` })
  }
})

app.post("/users", async (req, res) => {
  const { name, email, password } = req.body
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password
      },
    })
    res.status(200).json(newUser)
  } catch (error) {
    res.status(500).json({ message: `Failed to create user` })
  }
})