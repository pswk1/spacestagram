import { v4 as uuid } from 'uuid';

export const generateRandomLikes = () => {
  return Math.floor(Math.random() * (1000 - 50) + 50);
}

export const generateId = () => {
  return uuid();
}