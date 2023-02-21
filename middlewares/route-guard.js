const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/auth/login");
  }
  next();
};

// if an already logged in user tries to access the login page it
// redirects the user to the home page
const isLoggedOut = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect("/");
  }
  next();
};
//la fonction middleware exposeUserToView vérifie si l'objet de requête (request object) contient une propriété currentUser dans la session. Si c'est le cas, la fonction middleware ajoute une propriété currentUser à l'objet "res.locals" qui est utilisé pour stocker des variables locales de vue. Cette propriété currentUser est définie comme la valeur de req.session.currentUser.
const exposeUserToView = (req, res, next) => {
  if (req.session.currentUser) {
    res.locals.currentUser = req.session.currentUser;
  }
  next();
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
  exposeUserToView,
};
