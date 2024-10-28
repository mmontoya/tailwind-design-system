"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readSeedFile = async () => {
    try {
        // Read the JSON data from the file
        const dataPath = path_1.default.join(__dirname, "../../data/drug-seed-data.json");
        const jsonData = fs_1.default.readFileSync(dataPath, "utf-8");
        console.log("The path is", dataPath);
        const drugs = JSON.parse(jsonData);
        return drugs;
    }
    catch (error) {
        console.log("Error reading the bootstrap file:", error);
    }
};
exports.default = {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     *
     * This gives you an opportunity to extend code.
     */
    register( /* { strapi }: { strapi: Core.Strapi } */) { },
    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     *
     * This gives you an opportunity to set up your data model,
     * run jobs, or perform some special logic.
     */
    async bootstrap({ strapi }) {
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
            }
            else {
                console.log(`\nDatabase is populated with ${drugCount} entries, skipping bootstrap...`);
            }
        }
        catch (err) {
            console.error("Error during bootstrap:", err);
        }
    },
};
