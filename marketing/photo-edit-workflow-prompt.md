Re-edit this site's photos so they look like one real, editorial photo set (Aman style), without inventing new AI images.

Workflow:
1. Inventory. List every image the site uses. Skip the hero and portraits of real staff unless I say otherwise. For each image, note where it came from: our own photo, a stock/licensed photo, or a Creative Commons photo (record author, licence and source).
2. Style references. Download 3 or 4 photos from https://www.aman.com/into-the-wilderness, picking the ones closest to our subject. Use them ONLY as style references and never publish them.
3. Re-edit each real photo on top of the original, not from scratch. Use Higgsfield gpt_image_2_6, quality "medium", resolution "2k", aspect 3:2. Pass image_references in this order: [our original photo, ...the Aman references]. Use this prompt:
   "The first image is a real photograph from our tour. Keep its scene, subjects, composition and real details. Re-edit it to look shot by the same photographer as the other references: true-to-life natural colour, soft natural light, gently muted warm tones, real lens depth of field, fine grain, slightly imperfect and unretouched. Remove clutter, crowds, signs, watermarks and text, but KEEP real brand badges on vehicles and products. People are seen from behind or side-on, looking at the place, never posing or smiling at the camera. Do not stylise: no HDR, no dramatic sky, nothing that looks rendered. A believable real photograph."
   - Test 4 images first and show me a before/after sheet. Then do the rest. The service only accepts about 4 jobs at a time.
   - For close-ups of real products or vehicles (car badges, logos, number plates), do NOT use AI. Use the original photo with only step 4's grade applied, because AI edits drop or fake the badges.
4. One colour grade across all photos. Write a script (Python + PIL ImageCms LAB) that:
   - Matches each photo's LAB mean and standard deviation to the Aman references' average: 50% on lightness, 90% on colour.
   - Lowers chroma to about 0.84.
   - Lifts the blacks and caps the whites (L = 0.07 + L*0.88).
   - Adds fine grain (sigma about 2).
   - Gives night or very dark photos a lighter version (chroma and fade only, no stat matching), so the sky stays dark.
   - Note: PIL stores a and b as signed int8, so read and write them with .view(np.int8).
5. Install. Replace the source files, regenerate the responsive sizes, and bump a version query (?v=N) on the image URLs, because images are cached for a year.
6. Credits and legal. Any photo based on a Creative Commons original keeps its credit (author, licence, link) on the credits page. Say the edited version is shared under the same licence (BY-SA). Add a short note that the photos are edited with AI-assisted clean-up. Never base an edit on a photo we don't have the rights to use.
7. Verify. Build, deploy, crawl every page for broken images, and send me a contact sheet of the final set.
