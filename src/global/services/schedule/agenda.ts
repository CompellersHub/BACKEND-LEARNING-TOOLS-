import Agenda from "agenda";

export const agenda = new Agenda({
  db: { address: process.env.MONGO_URI_JOB },
});
