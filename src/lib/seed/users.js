import bcrypt from 'bcrypt';
const users = [
    {
        name: 'Mariano Islas',
        email: 'marianoIslas@gmail.com',
        password: bcrypt.hashSync('mar123',10),
        token: null,
        verified: 1
    },
    {
        name: 'Yulissa Ortega',
        email: 'yuliortega1@gmail.com',
        password: bcrypt.hashSync('12345678',10),
        token: null,
        verified: 1
    },
    {
        name: 'Haziel Ramirez',
        email: 'yayo@gmail.com',
        password: bcrypt.hashSync('12345678',10),
        token: null,
        verified: 1
    },
    {
        name: 'Ana',
        email: 'ana123@gmail.com',
        password: bcrypt.hashSync('12345678',10),
        token: null,
        verified: 1
    },
    {
        name: 'Gris Franco',
        email: 'gris123@gmail.com',
        password: bcrypt.hashSync('12345678',10),
        token: null,
        verified: 1
    },
    {
        name: 'Marco Ramírez',
        email: 'ingeMarco1@gmail.com',
        password: bcrypt.hashSync('12345678',10),
        token: null,
        verified: 1
    },
    {
        name: 'Romero',
        email: 'aleromero@gmail.com',
        password: bcrypt.hashSync('12345678',10),
        token: null,
        verified: 1
    }
]
export default users;