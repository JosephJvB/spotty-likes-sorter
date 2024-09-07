cant remember where raw feel should go. maybe before or after rollup? Im gonna say before.
Ie between rollup and people

https://developer.spotify.com/documentation/web-api/reference/save-tracks-user
got issue about ordering

"ids": [
    "1pBYkrJ4xK7v5nQNdZsd28", this one ends up first
    "66lUo475j3vdRMbaiEauZj" this one ends up second
]

consistently

and yet trying to save x20 at once was still causing issues

tell you what I should do is save my top 20 like ids

make a postman request to reset them

and then do lots more testing

maybe put a bigger delay between remove + add?


add these:
"6zyFMERNIyF0EDEVPC9Ck8",
"25lJGQuHWeFhYt7ffpF2xz",
"2CcH3jT1sLd06JU4VVBTq9",
"6vKvFFPdgQ6um4y3Fj40OK",
"0hwVwvdbBpxff1EBzmHLXz",
"26b3oVLrRUaaybJulow9kz"

ends up in this order:
"2CcH3jT1sLd06JU4VVBTq9",
"6vKvFFPdgQ6um4y3Fj40OK",
"0hwVwvdbBpxff1EBzmHLXz",
"6zyFMERNIyF0EDEVPC9Ck8",
"26b3oVLrRUaaybJulow9kz"
"25lJGQuHWeFhYt7ffpF2xz",

consistently!!! WTF is that even

https://community.spotify.com/t5/Spotify-for-Developers/Tracks-for-Current-User-SAVES-in-NOT-exact-sequence-as-expected/m-p/5656986