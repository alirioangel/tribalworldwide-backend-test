
export default () => {
  const { PORT, NODE_ENV, MOVIE_API_KEY, MOVIE_API_URL,JWT_SECRET,JWT_ISSUER } = process.env;
  return {
    environment: NODE_ENV || 'develop',
    port: PORT || 3000,
    movie_api_key: MOVIE_API_KEY,
    movie_api_url: MOVIE_API_URL,
    jwt:{
      secret: JWT_SECRET,
      signOptions: {
        issuer: JWT_ISSUER,
      },
    }
  };
};
