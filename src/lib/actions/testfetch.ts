"use server";

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export async function testFetch() {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${randomIntFromInterval(1, 50)}`,
      {
        cache: "no-store",
      }
    );

    return await response.json();
  } catch (error) {
    return { message: "error", data: "Failed to test." };
  }
}
