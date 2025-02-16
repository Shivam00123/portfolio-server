const crypto = require("crypto");
const Email = require("../utils/email");

const generateOTP = async (doc) => {
  const OTP = String(Math.floor(1000 + Math.random() * 9000));
  doc.OTP = crypto.createHash("sha256").update(OTP).digest("hex");
  const otp_expiration = process.env.OTP_EXPIRATION * 1;
  doc.otpExpiration = Date.now() + otp_expiration * 60 * 1000;
  await new Email(doc).sendOTP(OTP);
  return doc;
};

module.exports = generateOTP;
