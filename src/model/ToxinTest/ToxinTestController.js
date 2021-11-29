// const validationResult = require("express-validator");
const ToxinTestService = require("./ToxinTestService");

const list = async (_, res) => {
  const response = await ToxinTestService.list();
  return response.error
    ? res.status(404).json({ errors: response.error })
    : res.status(200).json(response);
};

const create = async (req, res) => {  

  const response = await ToxinTestService.create(req.body);
  return response.error
    ? res.status(409).json({ errors: response.error })
    : res.status(201).json(response);
};

const findById = async (req, res) => {
  const { id } = req.params
  const response = await ToxinTestService.findById(id);
  return response.error
  ? res.status(404).json({errors: response.error})
  : res.status(200).json(response)
}

// export const update = async (req: Request, res: Response) => {
//   const { id } = req.params
//   const response = await ToxinTestService.update(id, req.body);
//   res.json(response)
// }

// const deleteOne = async (req, res) => {
//   const { id } = req.params
//     const response = await ToxinTestService.deleteOne(id);
//   res.json(response)
// }

module.exports = { list, create, findById  };