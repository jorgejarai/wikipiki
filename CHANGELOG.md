# Changelog

## [0.4.0] - 2021-11-15

### Added

- Create the Administrator role
- Administrators can create, edit and delete articles

### Fixed

- Protect the /api/search route from non-logged users

### Removed

- Remove breadcrumbs from articles, since they're deemed unnecessary (articles
  can be categorized in the MediaWiki way (e.g. Programming/Python))

## [0.3.4] - 2021-09-24

### Added

- Link to start page in header

### Changed

- Make `h5` and `h6` tags more visible
- Add bottom spacing at the end of each article page

## [0.3.3] - 2021-09-20

### Changed

- Removed any usage of `removeAll` for `remove(/.../g)`

## [0.3.2] - 2021-09-20

### Changed

- Add escaping spaces and slash characters for hyperlinks

## [0.3.1] - 2021-09-18

### Changed

- Show article title on browser window

## [0.3.0] - 2021-09-18

### Added

- Search articles by content

### Changed

- Override Tailwind base style for prettier `ul` and `ol`
- Add background for inline code

## [0.2.0] - 2021-09-18

### Added

- Support for hyperlinks between articles

## [0.1.0] - 2021-09-18

### Added

- Accessing articles under `/wiki`
- Setting start page using the `START_ARTICLE` environment variable
- Markdown formatting for articles, syntax highlighting and KaTeX
- Auth0 authentication support
- Tailwind CSS for styling
