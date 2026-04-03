import * as recordService from "../services/record.service.js";

export const createRecord = async (req, res, next) => {
  try {
    const record = await recordService.createRecord(
      req.body,
      req.user._id
    );

    res.status(201).json({
      success: true,
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

export const getRecords = async (req, res, next) => {
  try {
    const records = await recordService.getRecords(
      req.query,
      req.user
    );

    res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRecord = async (req, res, next) => {
  try {
    const record = await recordService.updateRecord(
      req.params.id,
      req.body,
      req.user
    );

    res.status(200).json({
      success: true,
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRecord = async (req, res, next) => {
  try {
    const result = await recordService.deleteRecord(
      req.params.id,
      req.user
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};