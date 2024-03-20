export async function getPlansClient() {
  try {
    const URL =
      process.env.NODE_ENV !== "development"
        ? process.env.NEXT_PUBLIC_URL_PROD
        : process.env.NEXT_PUBLIC_URL_LOCAL;

    const response = await fetch(`${URL}/api/plans`, {
      cache: "no-store",
      next: { tags: ["get-plans"], revalidate: 0 },
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
