import type { Core } from "@strapi/strapi";
import fs from "fs";
import path from "path";
import { Drug } from "../types/globalTypes";

const readSeedFile = async () => {
  try {
    // Read the JSON data from the file
    const dataPath = path.join(__dirname, "../../data/drug-seed-data.json");
    const jsonData = fs.readFileSync(dataPath, "utf-8");

    console.log("The path is", dataPath);
    const drugs: Drug[] = JSON.parse(jsonData);

    return drugs;
  } catch (error) {
    console.log("Error reading the bootstrap file:", error);
  }
};

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      // Query the drug collection type using strapi.db.query()
      const drugCount = await strapi.db.query("api::drug.drug").count();

      //console.log("Got the drugs:", drugs);

      if (drugCount === 0) {
        const drugs = await readSeedFile();
        // Create new drug entries

        for (const drug of drugs) {
          strapi.db.query("api::drug.drug").create({
            data: drug,
          });

          console.log(`${drug.id}. ${drug.name}`);
        }
      } else {
        console.log(
          `\nDatabase is populated with ${drugCount} entries, skipping bootstrap...`
        );
      }
    } catch (err) {
      console.error("Error during bootstrap:", err);
    }
  },
};
