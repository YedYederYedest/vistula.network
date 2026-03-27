# vistula.network

the official webring for vistula university students. a place to find other cool people at vistula — engineers, designers, writers, artists, and everyone in between. (Inspired by uwaterloo.network)

---

## how to join

joining takes about 5 minutes. you'll need a github account and a personal website. (You can also email me and I can add you manually, IF you aren't a dev)

### 1. fork the repository

click the **fork** button in the top right of this page to create your own copy of the repo.

### 2. add your profile picture

- use a square image, 400×400px (your twitter/x or linkedin profile pic works great, you can also try an online converter)
- name the file `your-name.jpg` (or `.png`) — use hyphens, all lowercase
- drop it into the `public/photos/` folder

### 3. add your entry to `students.ts`

open `src/data/students.ts` and add your entry to the `members` array. copy the template below:

```ts
{
  id: "your-name",                          // hyphens, lowercase
  name: "Your Full Name",
  website: "https://yourwebsite.com",       // required
  program: "Computer Engineering",          // your program at vistula
  year: "2027",                             // optional: graduation year
  roles: ["engineering", "design"],         // what you do — see options below
  verticals: ["ai", "saas"],               // industries you care about — see options below
  profilePic: "/photos/your-name.jpg",
  instagram: "https://instagram.com/yourhandle",
  twitter: "https://x.com/yourhandle",
  linkedin: "https://linkedin.com/in/yourhandle",
  connections: ["friend-one", "friend-two"], // ids of people you know on the webring
},
```

**role options:** `engineering` · `design` · `product` · `growth` · `ai/ml` · `research` · `hardware` · `quant` · `software` · `finance` · `vc`

**vertical options:** `fintech` · `ai` · `climate` · `healthcare` · `edtech` · `marketplaces` · `robotics` · `defense` · `hard tech` · `saas` · `consumer` · `creator tools`

all fields except `id`, `name`, and `website` are optional — fill in as much or as little as you like.

### 4. submit a pull request

push your changes to your fork, then open a pull request back to this repository. title it something like `add: your name`.

### 5. wait for approval

i'll review and merge it. once merged, you'll appear on the site automatically.

---

## rules

- you must be a vistula university student (current or alumni)
- you must have a personal website — that's the whole point of a webring (exceptions are made)

---

## webring widget

WIP

---

## contributing

found a bug or want to improve the site? open an issue or submit a pr — contributions are welcome.

---

*inspired by [oscar gaske](https://oscargaske.me) and [shayaan azeem](https://shayaanazeem.com)*
