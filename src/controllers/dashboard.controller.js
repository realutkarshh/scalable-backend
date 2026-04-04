import * as dashboardService from "../services/dashboard.service.js";

export const getSummary = async (req, res, next) => {
  try {
    const data = await dashboardService.getSummary(req.user);

    res.status(200).json({
      success: true,
      message: "Dashboard summary fetched successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};