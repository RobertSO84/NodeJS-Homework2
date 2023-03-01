export default {
  secret: process.env.AUTH_SECRET || "you_discovered_the_secret",
  expires: process.env.AUTH_EXPIRES || "24h",
  rounds: process.env.AUTH_ROUNDS || 10,
};
