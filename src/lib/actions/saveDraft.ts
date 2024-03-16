"use server";

export default async function saveDraft(prevState: any, formData: FormData) {
  console.log(prevState, formData);
  console.log(prevState?.get("title"));
}
