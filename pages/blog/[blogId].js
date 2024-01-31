import Head from "next/head";

function Blog({ title, description }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <h2>Article page using head</h2>
    </>
  );
}

export default Blog;

export async function getServerSideProps() {
  const user = process.env.DB_USER;
  const password = process.env.DB_PASS;
  console.log(
    "connecting to username and password with database",
    user,
    password
  );

  return {
    props: {
      title: "Article title",
      description: "Ariticle description",
    },
  };
}
