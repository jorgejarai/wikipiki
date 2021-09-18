# Wikipiki

Wikipiki is a simple implementation of a (private) wiki made in Next.js, intended for displaying Markdown-formatted hypertext to a specific group of people. It uses MongoDB for storing the articles for the site and Auth0's `auth0-nextjs` for handling authentication.

As for now, it can handle multiple single-level pages on `/wiki`. Linking pages to others is _technically_ possible, but it needs improving when it comes to not using `next/link` and having to pass the absolute path for the target article.

The app is relatively functional, but I consider it to be in an experimental state as I add more base features to it and fix any bugs the app might have.

## Set up

Setting the app up is fairly straightforward:

1. Get a Auth0 account and configure a tenant.
2. Clone the repo.
3. Set up the following environment variables:

   - `MONGODB_URI`: The location of your MongoDB database.
   - `AUTH0_SECRET`: A random secret for your Auth0 session cookie. It is optional, but I recommend using it. You can use `node -e "console.log(crypto.randomBytes(32).toString('hex'))"` for generating one.
   - `AUTH0_BASE_URL`: The base URL for your app (e.g. http://localhost:3000 or https://mywiki.vercel.app)
   - `AUTH0_ISSUER_BASE_URL`: The URL of your Auth0 tenant.
   - `AUTH0_CLIENT_ID`: The client ID for your Auth0 app.
   - `AUTH0_CLIENT_SECRET`: The secret for your client.
   - `START_ARTICLE`: The article the app loads when the user lands on `/`.

4. Build the project with `next build` and run the app with `next run`. If what you want to do is playing with the code, run instead `next dev` for running it in development mode.

## Structure

Upon loading the app on `/`, you'll be greeted with the Auth0 login page. Once you've logged in, the browser will show you to the main article you configured in `START_ARTICLE`.

Every article must be a document located in the `wikipiki` collection, using the following schema:

```json
{
  "title": "The title of your article",
  "content": "Lorem ipsum, dolor sit amet..."
}
```

You can use Markdown tags in `content` as you please. For LaTeX equations, use `$` and `$$` for inline or display equations, respectively. The code you input can also be syntax highlighted by specifying the language:

```
~~~javascript
console.log('Hi, mom!');
~~~
```

## TODO

- [ ] Search articles (there's a search bar at the top, but it does nothing for now)
- [ ] Better hyperlinks
- [ ] An article editor for administrators
