const { MongoOperation } = require("../mongo/mongo-operation");

const mongoConnection = new MongoOperation("Bookkeeping");

const filterDataByMonth = async (collectionName, month) => {
  try {
    mongoConnection.Collection = collectionName;

    const startDate = new Date(new Date().getFullYear(), month - 1, 1);
    const endDate = new Date(new Date().getFullYear(), month, 0);

    const response = await mongoConnection.find({
      filter: {
        date: { $gte: startDate, $lte: endDate }
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

const filterDataByYear = async (collectionName, year) => {
  try {
    mongoConnection.Collection = collectionName;

    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const response = await mongoConnection.find({
      filter: {
        date: { $gte: startDate, $lte: endDate }
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

const filterDataByDateRange = async (collectionName, startDate, endDate) => {
  try {
    mongoConnection.Collection = collectionName;

    const response = await mongoConnection.find({
      filter: {
        date: { $gte: new Date(startDate), $lte: new Date(endDate) }
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  filterDataByMonth,
  filterDataByYear,
  filterDataByDateRange
};
