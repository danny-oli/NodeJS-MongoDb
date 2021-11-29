const SmsValidation = (req, res, next) => {

  for (const request of req.body.request) {
    if (!request.subject) {
      return res.status(500).send({ error: "TEM NADA" });
    }
  }

  next();
};

module.exports = SmsValidation;
