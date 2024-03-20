"use server";

export async function getPlans() {
  try {
    const URL =
      process.env.NODE_ENV !== "development"
        ? process.env.URL_PROD
        : process.env.URL_LOCAL;

    const response = await fetch(`${URL}/api/plans`, {
      cache: "no-store",
      next: { tags: ["get-plans"] },
    });

    if (response.ok) {
      const plans = (await response.json()).data;
      plans[0].title = `test ${Math.random()}`;
      return { message: "success", data: [...plans] };
    } else {
      return { message: "error", data: "Failed to get Plans." };
    }
  } catch (error) {
    return { message: "error", data: "Failed to get Plans." };
  }
}
