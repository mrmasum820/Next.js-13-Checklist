### What is next.js?

The React Framework for production.

A package that uses React for building user interfaces

Loaded with a lot more features that enable you to build full fledged production ready applications. Features exactly like routing, styling, authentication, bundle optimization etc.

There’s no need to install additional packages. Next.js provides everything for us.

Opinions and conventions need to be followed to implement the above said features.

### Why learn Next.js?

Next.js simplifies the process of building a react application for production.

1. File based Routing
2. Pre-rendering
3. API routes
4. Support for CSS modules
5. Authentication
6. Dev and Prod build system

### 1. Routing section

File-system based routing mechanism

When a file is added to the pages folder in a project, it automatically becomes available as a route

By mixing and matching file names with a nested folder structure, it it possible to pretty much define the most common routing patterns

**Routing in next.js app:**

- Route with pages
- Nested routes
- Dynamic routes
- Catch-all routes
- Navigate from the UI
- Programmatically navigate in pages

**Summary:**

1. Page based routing mechanism - Pages are associated with a route based on their file name
2. Nested routes - Nested folder structure, files will be automatically routed in the same way in the URL
3. Dynamic routes - Can be created by adding square brackets to a page name
4. Catch all routes - Add three dots inside square brackets to create a catch all route. Helpful when you want different URLs for the same page layout or even when you’re working with pages where some of the route parameters are optional.
5. Link component to navigate on click of an element
6. useRouter hook’s router.push method to navigate programmatically
7. How to create a custom 404 page

### 2. Pre-rendering

Pre-rendering refers to the process of generating HTML with the necessary data for a page in your application.

Pre-rendering can result in better performance and SEO.

1. **Pre-rendering improves performance**
   - In a react app, you need to wait for the javascript to be executed
   - Perhaps fetch data from an external API and then render the UI
   - There is wait time for the user
   - With a pre-rendered page, the HTML is already generated and loads faster
2. **Pre-rendering helps with SEO**
   - If you’re building a blog or an e-commerce site, SEO is concern
   - With a react app, if the search engine hits your page, it only sees a div tag with id equal to root
   - If search engine hits a pre-rendered page though, all the content is present in the source code which will help index that page
   - If SEO is of concern for your app, pre-rendering is what you want

**Next.js supports two forms of pre-rendering**

1. Static Generation
2. Server-side Rendering

### 2.1. Static Generation

A method of pre-rendering where the HTML pages are generated at build time

The HTML with all the data that makes up the content of the web page are generated in advance when you build your application

Recommended method to pre-render pages whenever possible

Page can be built once, cached by a CDN and served to the client almost instantly

Ex: Blog pages, e-commerce product pages, documentation and marketing pages.

### **Static Generation - How?**

Next.js by default will pre-render every page in our app.

The HTML for every page will automatically be statically generated when we build our application

**Prod Server:** An optimized build is created once and you deploy that build. You don’t make code changes on the go once it is deployed.

**Dev Server:** We should be able to make changes in our code and we want that code to immediately reflect in the browser.

For production builds, a page will be pre-rendered once when we run the build command

In development mode, the page is pre-rendered for every request you make.

### getStaticProps

1.

- getStaticProps runs only on the server side
- The function will never run client-side
- The code you write inside getStaticProps won’t even be included in the JS bundle that is sent to the browser

2.

- You can write server-side code directly in getStaticProps
- Accessing the file system using the fs module or querying a database can be done inside getStaticProps
- You also don’t have to worry about including API keys in getStaticProps as that won’t make it to the browser

3.

- getStaticProps is allowed only in a page and cannot be run from a regular component file
- It is used only for pre-rendering and not client-side data fetching

4.

- getStaticProps should return an object and object should contain a props key which is an object\*
- In our users page, we returned an object & the object contained a props key which was an object as well.

5.

- getStaticProps will run a build time
- During development, getStaticProps runs on every request

### Link pre-fetching contd.

When a page with getStaticPorps is pre-rendered at build time, in addition to the page HTML file, Next.js generates a JSON file holding the result of running getStaticProps

The JSON file will be used in client-side routing through next/link, or next/route

When you navigate to a page that’s pre-rendered using getStaticProps, Next.js fetches the JSON file and uses it as the props to create the page component client-side

Client-side page transitions will not call getStaticProps as only the exported JSON is used

**Summary:**

Static Generation is a method of pre-rendering where the HTML pages are generated at build time

With and without external data

Export getStaticProps function for external data

HTML, JavaScript and a JSON file are generated

If you navigate directly to the page route, the HTML file is served

If you navigate to the page route from a different route, the page is created client side using the JavaScript and JSON prefetched from the server

### getStaticPaths and fallback

1. **fallback: false**

   1. The paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps.
   2. If fallback is set to false, then any paths not returned by getStaticPaths will result in a 404 page

   **When?**

   - The false value is most suitable if we have an application with a small number of paths to pre-render.
   - When new pages are not added often.
   - A blog site with a few articles is a good example for fallback set to false.

2. **fallback: true**

   1. The paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps
   2. The paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will serve a “fallback” version of the page on the first request to such a path.
   3. In the background, Next.js will statically generate the requested path HTML and JSON. This includes running getStaticProps.
   4. When that’s done, the browser receives the JSON for the generated path. This will be used to automatically render the page with the required props. From the user’s perspective, the page will be swapped from the fallback page to the full page.
   5. At the same time, Next.js keeps track of the new list of pre-rendered pages. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.

   **When?**

   - The true value is most suitable if our app has a very large number of static pages that depend on data.
   - A large e-commerce site.
   - We want all the product pages to be pre-rendered but if we have a few thousand products, builds can take a really long time.
   - We may statically generate a small subset of products that are popular and use fallback: true for the rest.
   - When someone requests a page that’s not generated yet, the user will see the page with a loading indicator.
   - Shortly after, getStaticProps finished and the page will be rendered with the requested data. From then onwards, everyone who requests the same page will get the statically pre-rendered page
   - This ensures that users always have a fast experience while preserving fast builds and the benefits of static generation.

3. **fallback: ‘blocking’**

   1. The paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps.
   2. The paths that have not been generated at build time will not result in a 404 page. Instead, on the first request, Next.js will render the page on the server and return the generated HTML.
   3. When that’s done, the browser receives the HTML for the generated path. From the user’s perspective, it will transition from “the browser is requesting the page” to “the full page is loaded”. There is no flash of loading/fallback state.
   4. At the same time, Next.js keeps track of the new list of pre-rendered pages. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.

   **When?**

   - On a UX level, sometimes, people prefer the page to be loaded without a loading indicator if the wait time is a few milliseconds. This helps avoid the layout shift.
   - Some crawlers didn’t support JavaScript. The loading page would be rendered and then the full page would be loaded which was causing a problem.

### Static generation & Issues

Static generation is a method of pre-rendering where the HTML pages are generated at build time.

The pre-rendered static pages can be pushed to a CDN, cached and served to clients across the globe almost instantly.

Static content is fast and better for SEO as they are immediately indexed by search engines.

Static generation with getStaticProps for data fetching and getStaticPaths for dynamic pages seems like a really good approach to a wide variety of applications in production.

**issues**

1. The **build time** is proportional to the number of pages in the application
2. A page, once generated, can contain **stale** till the time you rebuild the application.

**What about getStaticPaths?**

Pre-render only few pages at build time and rest of the pages can be pre-rendered on request.

We can not use that render to say 1000 most popular pages and rest of the 99000 pages can be pre-rendered on request.

If our application has 90% static pages and 10% dynamic pages, getStaticPaths will not help much.

An e-commerce site typically will have 90% dynamic pages and 10% static pages. So we can reduce the total build time by using getStaticPaths.

It still does not fix the issue of stale data.

If we render 1000 pages at build time, and then the rest are generated based on incoming request, using fallback true or fallback blocking, changes in data will not update the already pre-rendered pages.

### 2.2 Incremental Static Regeneration(ISR)

There was a need to update only those pages which needed a change without having to rebuild the entire app.

With ISR, Next.js allows us to update static pages after we’ve built our application.

We can statically generate individual pages without needing to rebuild the entire site, effectively solving the issue of dealing with stale data.

**How?**

In the getStaticProps function, apart from the props key, we can specify a revalidate key.

The value for revalidate is the number of seconds after which a page re-generation can occur.

### Re-generation

A re-generation is initiated only if a user makes a request after the revalidate time.

If a user visits our product details page but there is no other user hitting that page the entire day, the re-generation does not happen.

Revalidate does not mean the page automatically re-generates every 10 seconds.

It simply denotes the time after which, if a user makes a request, a re-generation has to be initiated.

The re-generation can also fail and the previously cached HTML could be served till the subsequest re-generations succeed.

### Two forms of pre-rendering

1. **Static Generation**

   1. The HTML is statically generated at build time. The build page is then cached and reused for each request.
   2. For a dynamic page with getStaticPaths and fallback set to true the page is not generated at build time but is generated on the initial request.
   3. With incremental static regeneration, a page can be regenerated for a request after the revalidation time has elapsed.
   4. For the most part, the pages are generated using getStaticProps when we build the project.

   **Problems with static generation**

   - **We can not fetch data at request time**
     - With not being able to fetch data per request, we run into the problem of stale data.
     - If we are building a news website - the content is very dynamic in the sense that new articles can be published almost every second
     - getStaticProps will fetch the news at build time which is not suitable at all.
     - getStaticPaths will help fetch the data on the initial request but it is then cached for subsequent requests.
     - Incremental static regeneration(ISR) can help but if revalidate is 1 second, we still might not always see the most up to date news when the regeneration is happening in the background.
     - Rather fetch the data on the client side by making a get request from the component. But no SEO which is another problem specially for blog website
   - **We don’t get access to the incoming request**
     - Problem when the data that needs to be fetched is specific to a user
     - Let’s say we are building a website similar to twitter
     - As a user, I should be able to see tweets that are personalized based on my interests
     - The tweets that I see also need to be SEO friendly as it it public content that anyone in the world can see.
     - To fetch tweets specific to the user, we need the userId. And that can be obtained only if have we access to the incoming request.
     - We could do it client side in useEffect for example but that means we again miss out on SEO

2. **Server-side Rendering(SSR)**
   1. SSR is a form of pre-rendering where the HTML is generated at request time.
   2. SSR is required when we need to fetch data per request and also when we need to fetch personalized data keeping in mind SEO

### 2.3 Server-side Rendering(SSR)

Next.js allows us to pre-render a page not at build time but at request time.

The HTML is generated for every incoming request.

### getServerSideProps

- getServerSideProps runs only on the server side
- The function will never run client-side
- The code we write inside getServerSideProps won’t even be included in the JS bundle that is sent to the browser
- We can write server-side code directly in getServerSideProps
- Accessing the file system using the fs module or querying a database can be done inside getServerSideProps
- We also don’t have to worry about including API keys in getServerSideProps as that won’t make it to the browser
- getServerSideProps is allowed only in a page and cannot be run from a regular component file
- It is used only for pre-rendering and not client-side data fetching
- getServerSideProps should return an object should contain a props key which is an object
- getServerSideProps will run at request time.

### Client-side data fetching(dashboard)

### Client-side Data Fetching using SWR(dashboard-swr)

### Pre-rendering + Client side data fetching(events)

**Event Listing Page**

A page that shows a list of events happening around you

SEO + Request time data fetching → Server-side rendering with getServerSideProps

Client-side data fetching for filtering events

**Note:** Ideally, both pagination and filtering would take place client side but, for this example, we’re only going to focus on filtering.

### Pre-rendering & Data Fetching summary

Pre-rendering refers to the process of generating HTML in advance which results in better-performance and SEO.

Next JS supports two forms of pre-rendering → Static Generation and Server-Side Rendering

1. **Static Generation**

   A method of pre-rendering where the HTML pages are generated at build time.

   Pages can be build once, cached by a CDN and served to clients almost instantly

   Example: Marketing or Blogging site

   For a normal page, use getStaticProps function to fetch the data ahead of time

   For a dynamic page, we also need the getStaticPaths function

   fallback: false / true / ‘blocking’

   Pages cannot be updated without a full re-build

   Incremental Static Regeneration

2. **Server-Side Rendering**

   Fetch data at request time

   Personalize data based on user information in the incoming request

   Example: News listing page

   getServerSideProps function helps with SSR data fetching

   Combining pre-rendering with client-side data fetching

   Shallow routing - Routing without calling getStaticProps / getServerSideProps

### API Routes Section

Next JS is a full stack framework

We can write the FE code in React and also write APIs that can be called by the fronted code.

API routes allow us to create restfull endpoints as part of our Next.js application folder structure.

Within the pages folder, we need to create a folder called ‘api’

Within that ‘api’ folder, we can define all the APIs for our application.

We can add business logic without needing to write any additional custom server code and without having to configure any API routes.

Next JS gives us everything we need to write full-stack React + Node applications.

1. **Handle GET request**
2. **Handle POST request**
3. **Dynamic API routes**
4. **Handle DELETE request**
5. **Catch all API routes**

**summary**

API routing mechanism is similar to page based routing mechanism

APIs are associated with a route based on their file name

Every API route exports a default function typically named as handler function

The handler function receives the request and response as parameters

Cater to different request types like GET and POST using req.method

Dynamic API routes

Catch all API routes

We should not call our own API routes for pre-rendering content.

### Styling Intro

Styling is essential to building any web application

1. **Global styles →** In our application, we need to import the CSS file within pages/\_app.js (Ex: (\_app.js, globals.css, about, profile and contact)
2. **Component styles →** Next.js supports CSS modules using a [name].module.css naming convention (Home.module.css, About.module.css)
3. **SASS or SCSS →** Install the sass package(About.module.scss, Profile.moudle.scss)
4. **CSS-in-JS solution →** Inline styles and styled components(\_app.js, css-in-js)

### Misc Section Intro

**App layout** (\_app.js file)

**Head component →** Head component which help us dynamically manage document’s section.

**Image component →** Image component optimization (pets.js)

**Absolute Imports and Module Paths** (Configure absolute imports and configure path with aliases with the jsconfig.json)

**Static HTML export →** next export command which exports our app into static HTML.

**next build** → Builds the application for production in the .next folder.

**next start** → Starts a Node.js server that supports hybrid pages, serving both statically generated and server-side rendered pages.

**next export** → Exports all our pages to static HTML files that we can serve without the need of a Node.js server.

Host our app on any static hosting server or a CDN without having to maintain a server.

Cannot use ISR or SSR.

Client side data fetching for dynamic content.

Landing pages, blogs and any app where the content is generated at build time.

**Configure Typescript support** (tsconfig.js) [yarn add —dev typescript @types/react]

**TypeScript + Data Fetching**

```jsx
import { GetStaticPorps, GetStaticPaths, GetServerSideProps } from "next";

export const getStaticProps: GetStaticPorps = async (context) => {
  //....
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  //....
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  //....
};
```

**TypeScript + API Routes**

```jsx
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string,
};

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: "John Doe" });
};
```

**Preview →** Preview mode feature is very helpful when working with a CMS (api/preview & preview)

**Preview Mode**

Help applications that rely on a CMS.

CMS stands for content management system and is a tool that helps users create, manage, and modify content on a website without the need for specialized technical knowledge.

How preview mode can be used when we do have a CMS.

**When to use preview mode?**

In the pre-rendering section, we understood about static generation where the pages are pre-rendered at build time. It is pretty useful when our pages fetch data from a CMS.

However, It’s not suitable when we’re creating a draft in our CMS and want to preview the draft changes immediately on our page.

We want Next JS to bypass static generation for this scenario.

We deploy our app and then when we make changes in our CMS, they won’t be reflected as pages are only generated when we build the application.

There was a need to handle this scenario of ‘Preview of Publish’ called it.

**Redirects** (next.config.js)

**Environment variables** (.env.local and process.env.NAME)

### Authentication Section

**Authentication**

User

Identity and access

Indentity verifies who a user is

Access verifies what permissions the user has

Identity - Authentication

Access - Authorization

**Authentication in Next.js**

Client-side authentication (dashboard.js)

Server-side authentication

API routes authentication

User data

No need to persist? using Auth services like Github, Facebook etc. to ensure the user is authenticated

Need to persist? Using database
