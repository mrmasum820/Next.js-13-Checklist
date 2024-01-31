import Head from "next/head";

function Layout() {
  return (
    <>
      <Head>
        <title>Layout page Head tag</title>
        <meta
          name="description"
          content="This is for using layout page meta description"
        />
      </Head>
      <h1 className="content">Layout page</h1>;
    </>
  );
}

export default Layout;

Layout.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
