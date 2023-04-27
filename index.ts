export interface Error {
  error: string;
  errorMessage?: string;
}

export function assertsNonError<T>(value: unknown): asserts value is T {
  if ("error" in (value as Error)){
    const { error, errorMessage } = value as Error;
    throw new Error(errorMessage ?? error);
  }
}

export interface User {
  name: string;
  id: string;
}

export async function getUser(username: string){
  const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
  const user = await response.json();
  assertsNonError<User>(user);
  return user;
}

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
  const profile = await response.json();
  assertsNonError<Profile>(profile);
  return profile;
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
  if (property === undefined){
    throw new Error("No textures were found.");
  }
  const { value } = property;
  const textures = JSON.parse(atob(value)) as Textures;
  return textures;
}

export async function getSkin({ textures }: Textures){
  const { SKIN } = textures;
  if (SKIN === undefined){
    throw new Error("No skin was found.");
  }
  const { url } = SKIN;
  const response = await fetch(url);
  const skin = new Uint8Array(await response.arrayBuffer());
  return skin;
}

export async function getCape({ textures }: Textures){
  const { CAPE } = textures;
  if (CAPE === undefined){
    throw new Error("No cape was found.");
  }
  const { url } = CAPE;
  const response = await fetch(url);
  const cape = new Uint8Array(await response.arrayBuffer());
  return cape;
}