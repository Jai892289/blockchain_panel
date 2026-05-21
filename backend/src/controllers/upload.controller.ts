import { Request, Response } from "express";
import XLSX from "xlsx";

export const uploadFile = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const file = req.file;

    console.log("Uploaded File:", file.originalname);

    // EXCEL FILE
    if (
      file.originalname.endsWith(".xlsx") ||
      file.originalname.endsWith(".xls")
    ) {
      const workbook = XLSX.read(file.buffer, {
        type: "buffer",
      });

      const sheetName = workbook.SheetNames[0];

      const sheet = workbook.Sheets[sheetName];

      const data = XLSX.utils.sheet_to_json(sheet);

      console.log(data);

      return res.status(200).json({
        success: true,
        data,
      });
    }

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
};