<!-- https://ourcodeworld.com/articles/read/1293/how-to-retrieve-the-skin-of-a-minecraft-user-from-mojang-using-python-3 -->
<!-- https://wiki.vg/Mojang_API -->

In order to retrieve the current skin of an user, you will need to access the Mojang API. In this case, the first request URL will be:

https://api.mojang.com/users/profiles/minecraft/{USERNAME}
You need to replace {USERNAME} with the username that you are looking for, for example https://api.mojang.com/users/profiles/minecraft/elrubius will return the following response:

```json
{
  "name": "elrubius",
  "id": "11f1cc006cc84499a174bc9b7fa1982a"
}
```

The mentioned request will return the UUID of the Minecraft user. Now, to request the information about the player, you will need to request the following URL:

https://sessionserver.mojang.com/session/minecraft/profile/{USER_UUID}
Using the ID of the player by its username (obtained previously), you should be able to request once again to the API for the information of the textures, for example https://sessionserver.mojang.com/session/minecraft/profile/11f1cc006cc84499a174bc9b7fa1982a will return the following JSON response:

```json
{
  "id": "11f1cc006cc84499a174bc9b7fa1982a",
  "name": "elrubius",
  "properties": [
    {
      "name": "textures",
      "value": "ewogICJ0aW1lc3RhbXAiIDogMTU5NTY0ODQyODczOSwKICAicHJvZmlsZUlkIiA6ICIxMWYxY2MwMDZjYzg0NDk5YTE3NGJjOWI3ZmExOTgyYSIsCiAgInByb2ZpbGVOYW1lIiA6ICJlbHJ1Yml1cyIsCiAgInRleHR1cmVzIiA6IHsKICAgICJTS0lOIiA6IHsKICAgICAgInVybCIgOiAiaHR0cDovL3RleHR1cmVzLm1pbmVjcmFmdC5uZXQvdGV4dHVyZS9hYzM3MzU3NTNjNzNjYzYwZWUxMjFkMzIyNGQ2ZDU2NDU5MzNlYWJjYmQzZDUyYzI3ZmZkMjEwNDNmMDQ4OTkyIgogICAgfQogIH0KfQ=="
    }
  ]
}
```

The first object in the properties array will contain 2 keys that specify the type, in this case the textures and its value, in Base64 format:

ewogICJ0aW1lc3RhbXAiIDogMTU5NTY0NjgzNDMzMSwKICAicHJvZmlsZUlkIiA6ICIxMWYxY2MwMDZjYzg0NDk5YTE3NGJjOWI3ZmExOTgyYSIsCiAgInByb2ZpbGVOYW1lIiA6ICJlbHJ1Yml1cyIsCiAgInRleHR1cmVzIiA6IHsKICAgICJTS0lOIiA6IHsKICAgICAgInVybCIgOiAiaHR0cDovL3RleHR1cmVzLm1pbmVjcmFmdC5uZXQvdGV4dHVyZS9hYzM3MzU3NTNjNzNjYzYwZWUxMjFkMzIyNGQ2ZDU2NDU5MzNlYWJjYmQzZDUyYzI3ZmZkMjEwNDNmMDQ4OTkyIgogICAgfQogIH0KfQ==
If you decode the obtained value from the Base64 format, the output will provide the following JSON:

```json
{
  "timestamp": 1595646834331,
  "profileId": "11f1cc006cc84499a174bc9b7fa1982a",
  "profileName": "elrubius",
  "textures": {
    "SKIN": {
      "url": "http://textures.minecraft.net/texture/ac3735753c73cc60ee121d3224d6d5645933eabcbd3d52c27ffd21043f048992"
    }
  }
}
```

Which contains the skin of the user in the [textures][SKIN][url] property: http://textures.minecraft.net/texture/ac3735753c73cc60ee121d3224d6d5645933eabcbd3d52c27ffd21043f048992 in this case, the following image (which then serves the skin as Content-Type: image/png):