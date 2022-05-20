import axios from "axios";
import Link from "next/link";

const Detail = ({ movie: { title, poster_path, overview } }) => {
  return (
    <div className="detail">
      {overview && (
        <>
          <h1>{title ? title : "Untitled"}</h1>
          <img src={`https://image.tmdb.org/t/p/w200/${poster_path}`} />
          <p>{overview}</p>
        </>
      )}
      <Link href="/">
        <button>Go back</button>
      </Link>
    </div>
  );
};

export default Detail;

export async function getStaticPaths() {
  const {
    data: { results: movies },
  } = await axios(
    "https://api.themoviedb.org/3/trending/all/day?api_key=5a3845cdaac9976a856e9da16d7bc063&language=en"
  );

  return {
    paths: movies.map((movie) => ({ params: { id: movie.id.toString() } })),
    fallback: false,
  };
}

export const getStaticProps = async (ctx) => {
  const {
    params: { id },
  } = ctx;

  const { data: movie } = await axios(
    `https://api.themoviedb.org/3/movie/${id}?api_key=5a3845cdaac9976a856e9da16d7bc063&language=en`
  );

  return {
    props: {
      movie,
    },
    revalidate: 60,
  };
};
