// server.js

// Importa i pacchetti necessari
import express from 'express';
import endpoints from 'express-list-endpoints';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'; // Importa le rotte
import cors from 'cors';

// Carica le variabili d'ambiente
dotenv.config();

// Inizializza l'app Express
const app = express();

// abilitato server per collegamento front-end
app.use(cors());

// Middleware per il parsing del corpo delle richieste JSON
app.use(express.json());

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connesso'))
  .catch((err) => console.error('MongoDB: errore di connessione.', err));

// Definizione della porta su cui il server ascolterà
const PORT = process.env.PORT || 5000;


// Usa le rotte per gli utenti
app.use('/authors', userRoutes);

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server acceso sulla porta ${PORT}`);
  console.log("Sono disponibili i seguenti endpoints:");
  console.table(endpoints(app));
});