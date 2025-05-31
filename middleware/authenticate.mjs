export const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    return res.status(401).send({ errors: "You do not have access!" });
  }
  next();
}
