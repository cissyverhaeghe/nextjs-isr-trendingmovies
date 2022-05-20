import axios from "axios";
import Link from "next/link";

const Index = ({ movies }) => {
  return (
    <>
      <h1>The Movie DB</h1>
      {movies && (
        <section>
          {movies.map(({ id, poster_path, title }) => (
            <Link key={id} href={`/${id}`}>
              <article>
                <a>
                  <img src={`https://image.tmdb.org/t/p/w200/${poster_path}`} />
                  <p>{title ? title : "Untitled"}</p>
                </a>
              </article>
            </Link>
          ))}
        </section>
      )}
    </>
  );
};

export const getServerSideProps = async () => {
  const {
    data: { results: movies },
  } = await axios(
    "https://api.themoviedb.org/3/trending/all/day?api_key=5a3845cdaac9976a856e9da16d7bc063&language=en"
  );

  return {
    props: {
      movies,
    },
  };
};

export default Index;
