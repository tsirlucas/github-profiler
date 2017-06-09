//Needed because I'm hosting at gh-pages as a child uri
export default process.env.NODE_ENV === 'production' ? '/github-profiler' : '';
