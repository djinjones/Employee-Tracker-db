const Seed = require('./db/seed');

const seedDatabase = async () => {
  const seeder = new Seed();
  await seeder.spawnDepartments();
  await seeder.spawnRoles();
  await seeder.spawnEmployees();
};

seedDatabase();