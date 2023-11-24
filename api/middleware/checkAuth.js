//importuje jwt
const jwt = require("jsonwebtoken");

//np. router.post('/', checkAuth ,(req, res, next) => {
//export co sie wykona [(req,res,next)]:
module.exports = (req,res,next) => {// invalid token - synchronous
    try {//jwt.verify(token, 'wrong-secret')
      //pobieram tokena z nagłówka i dziele na 2 czesci,[0]-bearer,1-token
      const token = req.headers.authorization.split(" ")[1];  
      var decoded = jwt.verify(token, process.env.JWT_KEY);
      //jesli sie to wykona, to wrzucamy next() - ktory oznacza pojdz dalej w router.post('/', (req, res, next) => {
      next();
    } catch(err) {
      return res.status(401).json({ wiadomosc: 'Błąd autoryzacji' });
    }
};
