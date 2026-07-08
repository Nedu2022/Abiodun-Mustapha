# Images

Drop the client's photos here. Files are served from the site root, so
`public/images/hero.jpg` is referenced in code as `/images/hero.jpg`.

**The site currently ships with royalty-free stock photos (Unsplash) as
stand-ins.** Replace each one with the client's real photo using the **same
filename** and it appears automatically — no code changes needed. If a file is
ever missing, the layout falls back to a quiet placeholder.

## Expected files

| File                | Where it appears            | Suggested size / ratio |
| ------------------- | --------------------------- | ---------------------- |
| `hero.jpg`          | Hero portrait (right)       | Portrait, 4:5          |
| `story.jpg`         | "My Story" photo            | Portrait, 4:5          |
| `program.jpg`       | Growth Accelerator banner   | Landscape, 16:9        |
| `book-1.jpg`        | Featured book cover         | Portrait / 4:3         |
| `book-2.jpg`        | Second book cover           | Landscape, 3:2         |
| `sprint.jpg`        | Breakthrough Sprint banner  | Wide, 21:9             |
| `vault.jpg`         | Growth Vault banner         | Wide, 21:9             |
| `gallery-1..6.jpg`  | Photo gallery carousel      | Portrait, 4:5          |

All copy, links and these image paths live in
[`src/data/content.js`](../../src/data/content.js) — edit there to rebrand.
