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

async function findById(id) {
  try {
    const substance = await Substance.findById(id);
    if (!substance)
      throw {
        error: {
          code: "NOT_FOUND",
          message: "User not found",
          status: 404,
        },
      };
    return substance;
  } catch (error) {
    return error;
  }
}

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


async function runSubstanceValidation(toxinTest) {
  try {
    for (const key of Object.keys(toxinTest)) {
      const substance = await Substance.findOne({ name: key });

      if (substance && toxinTest[key] >= substance.limit) {
        // Validate the especial substances
        if (substance.enhancerOtherSubstances.confirmation) {
          await substance.enhancerOtherSubstances.otherSubstances.forEach(
            (substance) => {
              if (toxinTest[substance.name] >= substance.limit) {
                toxinTest.result = true;
              }
            }
          );
        } else {
          toxinTest.result = true;
        }
      }
      toxinTest.message = toxinTest.result
        ? `One ore more Enhanceable substances failed on the test.`
        : `All substances were approved!.`;
    }
    return toxinTest;
  } catch (error) {
    return error;
  }
}

module.exports = { create, list, findByName, findById, runSubstanceValidation };
