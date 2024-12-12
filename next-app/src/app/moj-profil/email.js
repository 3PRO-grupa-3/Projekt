export const actions = {
  updateEmail: async ({ request, locals }) => {
    const data = Object.fromEntries(await request.fromData());

    try {
      await locals.pb.colection("users").requestEmailChange(user?.email);
    } catch (err) {
      console.log(err.status, err.message);
    }
  },
};
