# Adding posts to the social media feed

The homepage carousel and the `/social/` page are built from `content/social.json`.

- Every post has a `date` (`YYYY-MM-DD`). The site sorts **newest first** by that date, so the order in the file doesn't matter.
- The homepage carousel shows the 5 most recent posts (`CAROUSEL_COUNT` in `lib/social.mjs`). `/social/` shows all of them, 10 per page.
- Nothing is fetched automatically: a post appears only after you add it here.

## Add a Facebook post

The post must be public (grey globe icon next to its time). Copy its link, which looks like
`https://www.facebook.com/<profile>/posts/<number>`, and add:

```json
{
  "id": "fb-<number>",
  "platform": "facebook",
  "date": "2026-11-18",
  "url": "https://www.facebook.com/<profile>/posts/<number>"
}
```

## Add a LinkedIn post

On the public post, click **⋯ → Embed this post** and copy the code. From
`src="https://www.linkedin.com/embed/feed/update/urn:li:share:<number>?collapsed=1"` and its `height="…"`:

```json
{
  "id": "li-<number>",
  "platform": "linkedin",
  "date": "2026-11-18",
  "urn": "urn:li:share:<number>",
  "height": 600
}
```

A LinkedIn post's real date can be read from its number (the first 41 bits are a millisecond timestamp), so you can
check a date with: `python3 -c "import datetime;print(datetime.datetime.fromtimestamp((<number>>>22)/1000, datetime.UTC).date())"`.

Run `npm run check` before committing. It rejects bad links, duplicates and invalid dates.

## About the existing dates

Facebook doesn't expose a post's date to this site, so the dates on the older Facebook posts were **estimated** and are
marked `"approxDate": true`. Correct any you know, and delete the `approxDate` line when you do. How they were estimated:

1. The old Hugo repo's history shows when each link was added to the feed (a post is on or before that date).
   Posts added alone on a given day were dated a day before it.
2. Facebook post numbers grow steadily with time (about 2.6 billion per day in 2022), so posts between known
   dates were interpolated, and older ones extrapolated backwards. These can be off by a few months.
3. The two posts from other people's profiles use a different numbering, so they were placed between their neighbours in
   the old list, which was ordered newest first.

| Date       | Network  | Post                               | Date basis                                |
| ---------- | -------- | ---------------------------------- | ----------------------------------------- |
| 2026-10-01 | linkedin | `urn:li:share:7511406811300831233` | exact (decoded from the LinkedIn post id) |
| 2025-04-09 | facebook | `10170794214640453`                | estimated                                 |
| 2022-12-16 | facebook | `10166861668930453`                | estimated                                 |
| 2022-12-15 | facebook | `10166857545345453`                | estimated                                 |
| 2022-10-22 | facebook | `10166716397980453`                | estimated                                 |
| 2022-09-28 | facebook | `10166654845965453`                | estimated                                 |
| 2022-06-27 | facebook | `10166418453455453`                | estimated                                 |
| 2022-06-12 | facebook | `10166320316525453`                | estimated                                 |
| 2022-06-12 | facebook | `10166320310935453`                | estimated                                 |
| 2022-03-22 | facebook | `10166108506140453`                | estimated                                 |
| 2021-11-17 | facebook | `10165789427740453`                | estimated                                 |
| 2021-07-29 | facebook | `10165502487895453`                | estimated                                 |
| 2021-07-17 | facebook | `10165474101125453`                | estimated                                 |
| 2021-06-18 | facebook | `10165397229025453`                | estimated                                 |
| 2021-06-16 | facebook | `10165393708235453`                | estimated                                 |
| 2021-05-06 | facebook | `4413545278663728`                 | estimated                                 |
| 2021-03-26 | facebook | `10165182007315453`                | estimated                                 |
| 2021-03-13 | facebook | `10226039060142152`                | estimated                                 |
| 2021-03-01 | facebook | `10165118937700453`                | estimated                                 |
| 2020-12-13 | facebook | `10164918402925453`                | estimated                                 |
| 2020-07-27 | facebook | `10164561411990453`                | estimated                                 |
| 2020-06-28 | facebook | `10164487265410453`                | estimated                                 |
| 2020-06-22 | facebook | `10164471645320453`                | estimated                                 |
