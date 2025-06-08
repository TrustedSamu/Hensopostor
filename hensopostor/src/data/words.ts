interface WordCategory {
  words: string[];
  hint: string;
}

interface Words {
  [key: string]: WordCategory;
}

export const words: Words = {
  sports: {
    words: ['Fußball', 'Basketball', 'Tennis', 'Schwimmen', 'Laufen', 'Radfahren', 'Boxen', 'Golf', 'Skifahren', 'Volleyball'],
    hint: 'Sport, Bewegung, Wettkampf'
  },
  places: {
    words: ['Berlin', 'Paris', 'Rom', 'London', 'New York', 'Tokio', 'Sydney', 'Dubai', 'Amsterdam', 'Barcelona'],
    hint: 'Stadt, Reise, Kultur'
  },
  entertainment: {
    words: ['Film', 'Musik', 'Theater', 'Konzert', 'Festival', 'Museum', 'Zirkus', 'Oper', 'Ballett', 'Comedy'],
    hint: 'Unterhaltung, Kultur, Freizeit'
  },
  food: {
    words: ['Pizza', 'Pasta', 'Burger', 'Sushi', 'Salat', 'Suppe', 'Steak', 'Curry', 'Tacos', 'Sushi'],
    hint: 'Essen, Restaurant, Küche'
  },
  animals: {
    words: ['Hund', 'Katze', 'Elefant', 'Löwe', 'Giraffe', 'Pinguin', 'Delfin', 'Affe', 'Tiger', 'Panda'],
    hint: 'Zoo, Natur, Haustier'
  },
  jobs: {
    words: ['Arzt', 'Lehrer', 'Ingenieur', 'Koch', 'Polizist', 'Anwalt', 'Architekt', 'Programmierer', 'Künstler', 'Journalist'],
    hint: 'Beruf, Arbeit, Karriere'
  }
}; 