import express from 'express';
import pg from 'pg';
import bcrypt from 'bcrypt';
import cors from 'cors';
import dotenv from 'dotenv'; 

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});
client.connect();


app.use(cors());
app.use(express.json());


client.query('SELECT NOW()', (err, res) => {
  if (err) {
      console.error('Error running query', err);
  } else {
      console.log('Database connected and query successful');
  }
});


app.post('/register', async (req, res) => {
    console.log('Registration request received:', req.body); 
    const { email, password } = req.body;
  
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
          console.log('Hashed password:', hashedPassword); 
        
  
       console.log('Attempting to insert user into database...'); // <--- ADD THIS LOG
  
       const result = await client.query(
         'INSERT INTO users (email, password) VALUES ($1, $2)',
         [email, hashedPassword]
       );
  
       console.log('User inserted successfully!'); // <--- ADD THIS LOG
       res.json({ message: 'User registered successfully!' });
  
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Error registering user.' });
    }
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`); 
});
