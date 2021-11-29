// import { plainToClass } from "class-transformer";
// const CustomError = require("express-handler-errors");
const Substance = require("./SubstanceSchema");

async function list() {
  try {
    const substances = await Substance.find();
    if (!substances.length) {
      throw {
        error: {
          code: "NOT_FOUND",
          message: "No substances found.",
          status: 404,
        },
      };
    }
    return substances;
  } catch (error) {
    return error;
  }
}

async function create(requestBody) {
  try {
    const substance = await Substance.findOne({ name: requestBody.name });
    if (substance) {
      throw {
        error: {
          code: "CONFLICT",
          message: "Substance name must be unique.",
          status: 409,
        },
      };
    }
    const newSubstance = new Substance(requestBody);
    return newSubstance.save();
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

async function findByName(name) {
  try {
    const substance = await Substance.findOne({ name });
    if (!substance)
      throw {
        error: {
          code: "NOT_FOUND",
          message: "Substance not found",
          status: 404,
        },
      };
    return substance;
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

async function runSubstanceValidation(toxinTest) {
  try {
    Object.keys(toxinTest).forEach(async (key) => {
      const substance = await Substance.findOne({ name: key });

      if (substance && toxinTest[key] >= substance.limit) {
        // Validate the especial substances
        if (substance.enhancerOtherSubstances.confirmation) {
          await substance.enhancerOtherSubstances.otherSubstances.forEach(
            (substance) => {
              if (toxinTest[substance.name] >= substance.limit) {
                toxinTest.result = true;
                toxinTest.message = `One ore more Enhanceable substances failed on the test.`;
                console.log(toxinTest)
              }
            }
          );
        }
        toxinTest.message = `One ore more substances failed on the test.`;
        toxinTest.result = true;
      }
      toxinTest.message = `All substances were approved!.`;
    });
    console.log(toxinTest);
    return toxinTest;
  } catch (error) {
    return error;
  }
}

module.exports = { create, list, findByName, runSubstanceValidation };
