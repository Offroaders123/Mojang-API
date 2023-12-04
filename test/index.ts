import { writeFile } from "node:fs/promises";
import { getUser, getProfile, getTextures, getSkin, getCape } from "../src/index.js";

const user = await getUser("Offroaders123");
console.log(user);

const profile = await getProfile(user);
console.log(profile);

const textures = getTextures(profile);
console.log(textures);

const [skin,cape] = await Promise.all([
  getSkin(textures),
  getCape(textures)
]);
console.log(Buffer.from(skin.buffer));
console.log(Buffer.from(cape.buffer));

writeFile(new URL("./skin.png",import.meta.url),skin);
writeFile(new URL("./cape.png",import.meta.url),cape);