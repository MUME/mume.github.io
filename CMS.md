# Editing the MUME website with Pages CMS

[Pages CMS](https://app.pagescms.org) lets contributors edit this website in a browser. You do not need to install Node.js, Docker, or a local copy of the repository to edit content.

## One-time setup for repository administrators

1. Commit and push the repository's [`.pages.yml`](.pages.yml) configuration to the branch you want to edit. Use `master` for the live website.
2. Open [Pages CMS](https://app.pagescms.org) and sign in with GitHub.
3. Install or configure the Pages CMS GitHub App for the **MUME** organization, granting it access to **mume.github.io**. An organization administrator may need to approve the installation.
4. Select `MUME/mume.github.io` and the branch containing `.pages.yml`.
5. Confirm that the content sections and image library appear. Give contributors repository write access or invite them through Pages CMS's collaborator settings, as appropriate.

The configuration is read separately for each branch. For a fork, install the App on the fork owner's account and select that repository instead. No CMS server, repository secret, or additional deployment workflow is required for the hosted service.

See the official [quick start](https://pagescms.org/docs/quick-start/) and [collaborator documentation](https://pagescms.org/docs/configuration/collaborators/) for account setup.

## Edit an existing page

1. Sign in to [Pages CMS](https://app.pagescms.org), or follow your collaborator invitation.
2. Select the repository and check the branch before editing. **Saving on `master` commits directly to the live website's deployment branch.**
3. Choose a content section and open the Markdown file you want to change.
4. Edit the text, review your changes, and save.
5. For `master`, check the repository's [Actions page](https://github.com/MUME/mume.github.io/actions) for a successful deployment, then open [docs.mume.org](https://docs.mume.org) to check the result.

| CMS section | Editor | Typical edits |
| --- | --- | --- |
| Interviews (visual editor) | WYSIWYG | Player and developer interviews in `docs/community/interviews/`, excluding the index |
| Articles (visual editor) | WYSIWYG | MUME features, MUME VIII, MUME IX, and the Mudlle events guide |
| Interview index (source) | Markdown source | Interview cards and links |
| Main pages (source) | Markdown source | Homepage, community links, open-source projects |
| About MUME (source) | Markdown source | Other history and building pages |
| Community pages (source) | Markdown source | Community landing page and Discord information |
| News (source) | Markdown source | News pages |
| Resources and questionnaires (source) | Markdown source | Newcomer resources and historical questionnaires |
| Play and tutorial chapters (source) | Markdown source | Client guides and interactive tutorial chapters |

### Use the visual editor

Open an interview or one of the articles and edit its **Content** field using the formatting toolbar for headings, bold text, lists, links, and images. Pages CMS saves the result as Markdown. The article forms also provide separate page title and description fields. For interviews, keep the visible heading and historical date and author in the content itself.

Use the **Editor / Source** switch on the Content field when you need to inspect or edit its Markdown. The visual editor previews content formatting; check the published website to see the site's final layout. Existing frontmatter metadata is preserved on save. Interviews without frontmatter do not need title or date fields added.

### Use the source editor

Sections marked **(source)** show the **complete Markdown source**, including any frontmatter between `---` lines. This preserves the site's HTML, Vue components, and interactive tutorial data. Leave existing tags, component names, and YAML structure intact when changing prose.

Basic Markdown examples:

```markdown
## A heading

Some **bold text** and a [link](https://mume.org).

- First item
- Second item

![A description of the image](/assets/images/example.png)
```

## Add an interview or page

Open the appropriate section and folder, create a Markdown file with a short lowercase filename such as `player-name.md`, and fill in its content. Copy an existing similar page if you need a starting point.

Create interviews in **Interviews (visual editor)**, which stores them in `docs/community/interviews/`. Keep the original interview date and author in the text, then open **Interview index (source)** to add its link and metadata in `docs/community/interviews/index.md`. Use the existing entries as a template.

A new ordinary page also needs a link from an appropriate index or related page so readers can find it. Changes to the site's top navigation require a maintainer to update `docs/.vitepress/config.js`; that file is outside the CMS content sections. Renaming and deleting pages are disabled in the CMS to protect existing links; ask a maintainer if either is needed.

## Edit interactive tutorials

In **Play and tutorial chapters (source)**, open the `tutorial` folder. Read the [tutorial authoring guide](docs/play/TUTORIAL.md) before changing a chapter's interactive data.

- Keep chapter filenames in the form `17-new-topic.md`; the numeric prefix controls their sequence. Choose an unused number for a new chapter.
- Keep `title`, `description`, `teach`, `steps`, and `responses` inside the YAML frontmatter, above the closing `---`.
- Preserve indentation. Use spaces, and use `|` followed by indented lines for multiline terminal responses. Enter actual line breaks rather than literal `\n` text.
- Keep lesson prose below the frontmatter. New numbered chapters are discovered automatically.

After publication, open the chapter and try its commands, aliases, hints, and responses. A Markdown preview alone cannot verify the interactive tutorial.

## Upload and use images

Open the CMS media library and upload your image, using a descriptive filename. Images are stored in `docs/public/assets/images/`; subfolders such as `tutorial-maps` contain existing tutorial assets.

In a visual editor, use the image control to select or upload an image. In a source editor, insert the public path manually:

```markdown
![Map of the tavern](/assets/images/tutorial-maps/common-room.jpg)
```

Use `/assets/images/...` in website content, not `docs/public/assets/images/...`. Add useful alternative text and check the image on the published page. Uploading an image saves it to the selected branch but does not automatically insert it into a page. Avoid removing or replacing shared images without checking where they are used.

## Review, publishing, and recovery

Each save creates a Git commit on the selected branch. Changes saved to `master` trigger the existing GitHub Actions build and deployment; they become public after it succeeds. A CMS save is not a draft or an automatic pull request.

For changes needing review, ask a maintainer to create an editing branch that includes `.pages.yml`, select it in the CMS, and save there. Open a pull request on GitHub when ready. The existing pull request workflow builds a preview; follow its reported preview link when available. Merge into `master` after review to publish.

If you cannot see the repository, ask an administrator to check the GitHub App installation and your access. If the content sections are missing, check that `.pages.yml` exists on the selected branch. If saving fails on a protected branch, use an editing branch and pull request.

If a deployment fails, ask a maintainer to inspect the Actions log; malformed YAML or a broken link can prevent publication. If an edit was incorrect, restore the previous text and save again, or ask a maintainer to revert its Git commit. Reload a file before editing if someone else has changed it, and check GitHub's diff after saving.

## Configuration reference for maintainers

The repository's root `.pages.yml` defines the content sections and maps image storage to VitePress's public URLs. Interviews and four ordinary Markdown articles use a [rich-text body field](https://pagescms.org/docs/configuration/fields/rich-text/) with Markdown output and the Editor / Source switch enabled. `settings.content.merge: true` preserves frontmatter keys outside the configured fields.

Other sections use `yaml-frontmatter` with no structured `fields`, which selects the [raw file editor](https://pagescms.org/docs/configuration/content/editors/). This keeps Vue markup and tutorial YAML out of the rich-text editor. Collection exclusions keep the visual articles and styled interview index in separate editors without duplicate entries. Recursive browsing is enabled only for the content folders that need it, keeping theme code and public assets outside the content editor. Before enabling WYSIWYG for another page, check its complete source for HTML, Vue components, VitePress containers, and interactive frontmatter.

Consult the official [configuration reference](https://pagescms.org/docs/configuration/) before adding new sections or changing the editor format.
