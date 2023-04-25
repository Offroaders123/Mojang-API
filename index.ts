const user = await getUser("Offroaders123");

export interface User {
  name: string;
  id: string;
}

export async function getUser(username: string){
  const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
  const user = await response.json() as User;
  console.log(user);
  return user;
}

const profile = await getProfile(user);

export interface Profile {
  id: string;
  name: string;
  legacy?: true;
  properties: [
    {
      name: "textures";
      value: string;
      signature?: string;
    }
  ];
}

export async function getProfile(user: User){
  const { id } = user;
  const response = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${id}`);
  const profile = await response.json() as Profile;
  console.log(profile);
  return profile;
}

const textures = getTextures(profile);

if (textures === null){
  throw new Error("Couldn't locate a texture for this profile.");
}

export interface Textures {
  timestamp: number;
  profileId: string;
  profileName: string;
  signatureRequired?: true;
  textures: {
    SKIN?: {
      url: string;
      metadata?: {
        model: "slim";
      };
    },
    CAPE?: {
      url: string;
    }
  }
}

export function getTextures(profile: Profile){
  const { properties } = profile;
  const property = properties.find(property => property.name === "textures");
  if (property === undefined) return null;
  const { value } = property;
  const textures = JSON.parse(atob(value)) as Textures;
  console.log(textures);
  return textures;
}

const skin = await getSkin(textures);

export async function getSkin({ textures }: Textures){
  const { SKIN } = textures;
  if (SKIN === undefined) return null;
  const { url } = SKIN;
  const response = await fetch(url);
  const skin = await response.blob();
  console.log(skin);
  return skin;
}

const cape = await getCape(textures);

export async function getCape({ textures }: Textures){
  const { CAPE } = textures;
  if (CAPE === undefined) return null;
  const { url } = CAPE;
  const response = await fetch(url);
  const cape = await response.blob();
  console.log(cape);
  return cape;
}