import { sendEmail } from "@/app/api/recovery/route";

export const emailAction = async (formData) => {
  "use server";

  try {
    const {
      firstName,
      lastName,
      recepient_Email,
      oldMessage,
      subject,
      message,
    } = Object.fromEntries(formData);
    const stats = "client";
    return sendEmail({
      firstName,
      lastName,
      recepient_Email,
      subject,
      message,
      oldMessage,
      stats,
    });
  } catch (error) {
    console.log(error);
  }
};
