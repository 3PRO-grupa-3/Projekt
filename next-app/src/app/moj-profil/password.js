import { Router, useRouter } from "next/router";

export const actions = {
  updatePassword: async ({ request, locals }) => {
    const data = Object.fromEntries(await request.fromData());

    try {
      await locals.pb.collection("users").update(locals.user.id, data);
      locals.pb.authStore.clear();
    } catch {
      console.log("Error ", err);
      console.log(err.status, err.message);
    }

    const Router = useRouter(Router.push("/auth/login/page.js"));
  },
};
