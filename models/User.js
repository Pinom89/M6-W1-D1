import { Schema, model } from "mongoose";

// Definizione dello schema dell'utente utilizzando il costruttore Schema di Mongoose
const userSchema = new Schema(
  {
   
    nome: {
      type: String,
      required: true,
    },

    cognome: {
      type: String,
      required: true,
     
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    datadinascita: {
      type: Date,
      required: true,
    },
    
    avatar: {
      type: String,
      required: true,
    }
   
  },
  {
    // Opzioni dello schema:
    collection: "autori", // Specifica il nome della collezione nel database MongoDB
  }
);

// Esporta il modello 'User' utilizzando il metodo model di Mongoose
// Il modello 'User' sarà basato sullo schema 'userSchema' definito sopra
const User = model("User", userSchema);
export default User;