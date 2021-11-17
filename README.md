# Wikipiki

Wikipiki is a simple implementation of a (private) wiki made in Next.js, intended for displaying Markdown-formatted hypertext to a specific group of people. It uses MongoDB for storing the articles for the site and Auth0's `auth0-nextjs` for handling authentication.

The app is relatively functional, but I consider it to be in an experimental state as I add more base features to it and fix any bugs the app might have.

## Set up

Setting up the app is fairly straightforward:

1.  Get a Auth0 account and configure a tenant.

    1.  Create a role named `Administrators` within your tenant and add at least one user to it.
    2.  In order for the backend to get the roles a user belongs to, go to Auth Pipeline > Rules in your dashboard, click the Create button, use the Empty rule template and paste this code. You may replace `https://myapp/role` by the key you want, given that you set it up too in the `ROLE_CLAIM_KEY` environment variable.

             function (user, context, callback) {
               const assignedRoles = (context.authorization || {}).roles;
               let idTokenClaims = context.idToken || {};
               idTokenClaims[`https://myapp/role`] = assignedRoles;
               context.idToken = idTokenClaims;

               return callback(null, user, context);
             }

2.  Clone the repo.
3.  Set up the following environment variables:

    - `MONGODB_URI`: The location of your MongoDB database.
    - `AUTH0_SECRET`: A random secret for your Auth0 session cookie. It is optional, but I recommend using it. You can use `node -e "console.log(crypto.randomBytes(32).toString('hex'))"` for generating one.
    - `AUTH0_BASE_URL`: The base URL for your app (e.g. http://localhost:3000 or https://mywiki.vercel.app)
    - `AUTH0_ISSUER_BASE_URL`: The URL of your Auth0 tenant.
    - `AUTH0_CLIENT_ID`: The client ID for your Auth0 app.
    - `AUTH0_CLIENT_SECRET`: The secret for your client.
    - `START_ARTICLE`: The article the app loads when the user lands on `/`.
    - `ROLE_CLAIM_KEY` (optional): Used by Auth0 to inject a user's roles into their session token. Defaults to `https://myapp/role`.

4.  Build the project with `next build` and run the app with `next run`. If what you want to do is playing with the code, run instead `next dev` for running it in development mode. If you want to, you can use Vercel to deploy the app to the cloud and make it available for everyone you wish.

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

If you want to link an article or URI, you can do it in the following ways:

- Outgoing URI: `[Caption](https://example.com/contact)`
- Absolute URI: `[Caption](/stats)`
- Link to article: `[Caption](Compilers and interpreters)` (you don't need to escape the spaces; use them as is)

## Users

The app is designed to work with two types of users: readers (regular users) and administrators. Readers may only log in to the wiki and read every article in it, whereas administrators may also edit existing articles. At the moment, creating users and making them administrators is only possible through the Auth0 dashboard.

## TODO

- [x] Search articles
- [x] Better hyperlinks
- [x] An article editor for administrators
- [ ] ~Create~ and rename articles within the app
- [ ] User management dashboard for readers and administrators
- [X] Responsive UI
- [ ] i18n support
