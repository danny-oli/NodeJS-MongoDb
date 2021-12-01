const SubstanceService = require("./SubstanceService");

const list = async (_, res) => {
  const response = await SubstanceService.list();
  return response.error
    ? res.status(response.error.status).json({ errors: response.error })
    : res.status(200).json(response);
};

const create = async (req, res) => {  

  const response = await SubstanceService.create(req.body);
  return response.error
    ? res.status(response.error.status).json({ errors: response.error })
    : res.status(201).json(response);
};

const findById = async (req, res) => {
  const { id } = req.params
  const response = await SubstanceService.findById(id);
  return response.error
  ? res.status(response.error.status).json({errors: response.error})
  : res.status(200).json(response)
}

module.exports = { list, create, findById  };
