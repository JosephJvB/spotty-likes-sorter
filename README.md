Boy oh boy where do I even begin. Eugene... honey, my pookie bear. I have loved you ever since I first laid eyes on you. The way you drive into the paint and strike fear into your enemies eyes. Your silky smooth touch around the keyboard, and that gorgeous mouse movement. I would do anything for you. I wish it were possible to freeze time so I would never have to watch you retire. You had a rough childhood, but you never gave up hope. You are even amazing off the computer, you're a great husband and father, sometimes I even call you dad. I forvever dread and weep, thinking of the day you will one day retire. I would sacrifice my own life it were the only thing that could put a smile on your beautiful face. You have given me so much joy, and heartbreak over the years. I remember when you first left LCS and and its like my heart got broken into a million pieces. But a tear still fell from my right eye when I watched you win your first ring in 2015, because deep down, my glorious king deserved it. I just wanted you to return home. Then allas, you did, my sweet baby boy came home and I rejoiced. 2012-2014 was a hard year for us baby, but in 2015 you made history happen. You came back to destroy TSM and I couldn't believe it. I was crying, bawling even, and I heard my glorious king exclaim these words, "COUNTER LOGIC GAMING, THIS IS FOR YOU!" Not only have you changed the game of League of Legends and the world forever, but you've eternally changed my world. And now you're getting older, but still the goat, my goat. I love you pookie bear, my glorious king, Eugene park.🫶

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