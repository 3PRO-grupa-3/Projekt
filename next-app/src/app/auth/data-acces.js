import { pocketbase } from "@/lib/pocketbase";

export async function login(loginData) {
  try {
    const authData = await pocketbase
      .collection("users")
      .authWithPassword(loginData.email, loginData.password);
  } catch (error) {
    throw new Error(error);
  }
}
export async function register(registerData) {
  try {
    const record = await pocketbase
      .collection("users")
      .create({
        ...registerData,
        passwordConfirm: registerData.password,
        rola: "obserwator",
      });

    // (optional) send an email verification request
    // await pb.collection('users').requestVerification('test@example.com');
  } catch (error) {
    throw new Error(error);
  }
}
