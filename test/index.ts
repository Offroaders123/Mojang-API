import { writeFile } from "node:fs/promises";
import { getUser, getProfile, getTextures, getSkin, getCape } from "../src/index.js";

const [skin,cape] = await getUser("Offroaders123")
  .then(getProfile)
  .then(getTextures)
  .then(textures => {
    if (textures === null){
      throw new Error("No textures were found for this player!");
    }
    return Promise.all([
      getSkin(textures),
      getCape(textures)
    ]);
  });

console.log(skin);
console.log(cape);

writeFile(new URL("./skin.png",import.meta.url),skin);
writeFile(new URL("./cape.png",import.meta.url),cape);