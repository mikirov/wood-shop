import { revalidatePath } from "next/cache";

export function revalidateStorefront() {
  revalidatePath("/", "layout");
  revalidatePath("/en", "layout");
  revalidatePath("/bg", "layout");
  revalidatePath("/en/shop", "layout");
  revalidatePath("/bg/shop", "layout");
  revalidatePath("/en/custom", "layout");
  revalidatePath("/bg/custom", "layout");
  revalidatePath("/sitemap.xml");
}
