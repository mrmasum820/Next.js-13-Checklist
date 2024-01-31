function Preview() {
  return <h2>Preview data</h2>;
}

export default Preview;

export async function getStaticProps(context) {
  console.log("Running getStaticProps", context.previewData);
  return {
    props: {
      data: context.preview
        ? "list of draft articles"
        : "list of published articles",
    },
  };
}
