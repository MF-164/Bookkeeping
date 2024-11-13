const { filterDataByMonth, filterDataByYear, filterDataByDateRange } = require("../../services/actions/data-segment");

const getExpensesByMonth = async (req, res) => {
  try {
    const { month } = req.params;

    const response = await filterDataByMonth("expenses", parseInt(month));

    res.status(200).json(response);
  } catch (exception) {
    res.status(500).send(exception);
  }
};

const getReceiptsByMonth = async (req, res) => {
  try {
    const { month } = req.params;

    const response = await filterDataByMonth("receipts", parseInt(month));

    res.status(200).json(response);
  } catch (exception) {
    res.status(500).send(exception);
  }
};

const getExpensesByYear = async (req, res) => {
  try {
    const { year } = req.params;

    const response = await filterDataByYear("expenses", parseInt(year));

    res.status(200).json(response);
  } catch (exception) {
    res.status(500).send(exception);
  }
};

const getReceiptsByYear = async (req, res) => {
  try {
    const { year } = req.params;

    const response = await filterDataByYear("receipts", parseInt(year));

    res.status(200).json(response);
  } catch (exception) {
    res.status(500).send(exception);
  }
};

const getReceiptsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.params;

    const response = await filterDataByDateRange("receipts", startDate, endDate);

    res.status(200).json(response);
  } catch (exception) {
    res.status(500).send(exception);
  }
};

const getExpensesByDateRange = async (req, res) => {  
  try {
    const { startDate, endDate } = req.params;

    const response = await filterDataByDateRange("expenses", startDate, endDate);

    res.status(200).json(response);
  } catch (exception) {    
    res.status(500).send(exception);
  }
};

module.exports = {
  getExpensesByMonth,
  getReceiptsByMonth,
  getReceiptsByYear,
  getExpensesByYear,
  getReceiptsByDateRange,
  getExpensesByDateRange
};
