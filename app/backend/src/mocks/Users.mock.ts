const token = {
  token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  .eyJpZCI6MiwiZW1haWwiOiJ1c2VyQHVzZXIuY29tIiwiaWF0IjoxNjk2MDk5MjU1LCJleHAiOjE2OTY3MDQwNTV9.
  UmNHkjbh8sMYk1OouwPBPeUY5-89Fgk4-I2n5S8yhmg`,
};

const jwtPayload = {
  id: 1,
  role: 'admin',
  email: 'admin@admin.com',
};

export { token, jwtPayload };
