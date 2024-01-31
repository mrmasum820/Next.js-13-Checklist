function ArticleListByCategory({ articles, category }) {
  return (
    <div>
      <h2>Showing news using category</h2>
      {articles.map((article) => {
        return (
          <div key={article.id}>
            <h3>
              {article.id} {article.title}
            </h3>
            <p>{article.category}</p>
            <p>{article.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ArticleListByCategory;

export async function getServerSideProps(context) {
  const { params, req, res, query } = context;
  const { category } = params;

  console.log(query);
  console.log(req.headers.cookie);
  res.setHeader("Set-Cookie", ["name=Masum"]);

  const response = await fetch(
    `http://localhost:4000/news?category=${category}`
  );
  const data = await response.json();
  console.log("pre-rendering News articls for category sports");

  return {
    props: {
      articles: data,
      category,
    },
  };
}
