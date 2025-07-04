import bcrypt from "bcrypt";

export async function encryptPassword(
  password: string,
  saltRounds = 10,
): Promise<string> {
  return await bcrypt.hash(password, saltRounds);
}

export async function validatePassword(
  password: string,
  encryptedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, encryptedPassword);
}
