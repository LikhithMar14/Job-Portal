import db from "@/db";
import placeholderJobs from "./sample-data";

async function main() {
  await Promise.all(
    placeholderJobs.map(async (job) => {
      await db.job.upsert({
        where: {
          slug: job.slug,
        },
        update: job,
        create: job,
      });
    })
  );
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error while seeding database:", e);
    await db.$disconnect();
    process.exit(1);
  });
