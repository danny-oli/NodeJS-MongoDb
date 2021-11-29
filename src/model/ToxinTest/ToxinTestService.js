const ToxinTest = require("./ToxinTestSchema");
const SubstanceService = require("../Substance/SubstanceService")

async function list() {
  try {
    const toxinTest = await ToxinTest.find();
    if (!toxinTest.length) {
      throw {
        error: {
          code: "NOT_FOUND",
          message: "No substances found.",
          status: 404,
        },
      };
    }
    return toxinTest;
  } catch (error) {
    return error;
  }
}

async function create(requestBody) {
  try {
    // console.log(requestBody);
    const sampleCode = requestBody["codigo_amostra"];
    const toxinTest = await ToxinTest.findOne({ codigo_amostra: sampleCode });
    if (toxinTest) {
      throw {
        error: {
          code: "CONFLICT",
          message: "Toxin Test Code must be unique.",
          status: 409,
        },
      };
    }
    
    const a = await SubstanceService.runSubstanceValidation(requestBody);
    const newToxinTest = new ToxinTest(a);
    return newToxinTest;
    // return requestBody;
  } catch (error) {
    return error;
  }
}

// async function findById(id) {
//   try {
//     const user = await this.userModel.findById(id);
//     if (!user)
//       throw new CustomError({
//         code: "NOT_FOUND",
//         message: "User not found",
//         status: 404,
//       });
//     return user;
//   } catch (error) {
//     return error;
//   }
// }

async function findBySampleCode(sampleCode) {
  try {
    const toxinTest = await ToxinTest.findOne({ sampleCode });
    if (!toxinTest)
      throw {
        error: {
          code: "NOT_FOUND",
          message: "Substance not found",
          status: 404,
        },
      };
    return toxinTest;
  } catch (error) {
    return error;
  }
}

// async update(id: string, obj: IUser): Promise<IUser> {

//   await this.userModel.update(id, obj);
//   return this.findOne(id);

// }

// async function deleteOne(id) {
//   try {
//     const user = await this.userModel.findById(id);
//     if (!user)
//       throw new CustomError({
//         code: "NOT_FOUND",
//         message: "User not found",
//         status: 404,
//       });
//     return this.userModel.findByIdAndDelete(id);
//   } catch (error) {
//     return error;
//   }
// }

module.exports = { create, list, findBySampleCode };
