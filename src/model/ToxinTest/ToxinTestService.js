const ToxinTest = require("./ToxinTestSchema");
const SubstanceService = require("../Substance/SubstanceService")

async function list() {
  try {
    const toxinTest = await ToxinTest.find();
    if (!toxinTest.length) {
      throw {
        error: {
          code: "NOT_FOUND",
          message: "No Toxin Tests found.",
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
    const sampleCode = requestBody["codigo_amostra"];
    if(sampleCode.length > 8) {
      throw {
        error: {
          code: "BAD_REQUEST",
          message: "Toxin Test Code must be lesser then 8 characters.",
          status: 400,
        },
      };
    }
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
    
    const validatedToxinTest = await SubstanceService.runSubstanceValidation(requestBody);
    const newToxinTest = new ToxinTest(validatedToxinTest);
    console.log(newToxinTest)
    return newToxinTest.save();
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
