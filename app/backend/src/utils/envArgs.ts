const jwtSecret = process.env.JWT_SECRET;
// garante que o segredo do jwt seja passado via variavel de ambiente
if (!jwtSecret) {
  throw new Error('MISSING_JWT_SECRET');
}

export default {
  jwtSecret,
};
