import crypto from "crypto";

export const generateHash = (
  record: any
): string => {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(record))
    .digest("hex");
};