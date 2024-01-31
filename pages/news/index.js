function NewsList({ articles }) {
  return (
    <div>
      <h2>List of News Articles</h2>
      {articles.map((article) => {
        return (
          <div key={article.id}>
            <h3>
              {article.id} {article.title} | {article.category}
            </h3>
          </div>
        );
      })}
    </div>
  );
}

export default NewsList;

export async function getServerSideProps() {
  const response = await fetch("http://localhost:4000/news");
  const data = await response.json();
  console.log("pre-rendering NewsArticleList");

  return {
    props: {
      articles: data,
    },
  };
}
