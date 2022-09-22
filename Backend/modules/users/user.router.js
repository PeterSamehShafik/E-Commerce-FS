import { Router } from "express";
import { addUser, deleteUser, getUser, getUsers, signIn, updateUser } from './controller/user.js';

const router = Router()


router.get('/',getUsers)
router.get('/:id',getUser)
router.post('/signup',addUser)
router.post('/signin',signIn)
router.patch('/:id',updateUser)
router.delete('/:id',deleteUser)

export default router