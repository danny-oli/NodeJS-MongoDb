// const validationResult = require("express-validator");
const UserService = require("./UserService");

const list = async (_, res) => {
  const response = await UserService.list();
  return response.error
    ? res.status(404).json({ errors: response.error })
    : res.status(200).json(response);
};

const create = async (req, res) => {
//   const error = validationResult(req);
//   if (!error.isEmpty()) {
//     return res.status(400).json({ errors: error.array() });
//   }
  const response = await UserService.create(req.body);
  return response.error
    ? res.status(409).json({ errors: response.error })
    : res.status(201).json(response);
};

// const findById = async (req, res) => {
//   const { id } = req.params
//   const response = await UserService.findById(id);
//   return response.error
//   ? res.status(404).json({errors: response.error})
//   : res.status(200).json(response)
// }

// export const update = async (req: Request, res: Response) => {
//   const { id } = req.params
//   const response = await User.update(id, req.body);
//   res.json(response)
// }

// const deleteOne = async (req, res) => {
//   const { id } = req.params
//     const response = await UserService.deleteOne(id);
//   res.json(response)
// }

module.exports = { list, create };
