const path = {
  //get
  App: {
    shadowBlogCommits: (username = 'mark-zj' , repoName = 'shadow-blog') => {
      return `https://api.github.com/repos/${username}/${repoName}/commits`
    },
    musicList: (page = 1,pageSize = 5) => {
      return new URL(`../assets/music/config/meta.json`, import.meta.url).href;
    },
    lyricsFile: (url)=> {
      return new URL(`../assets/music/lyric/${url}`, import.meta.url).href;
    },
    musicFile: (url) =>{
      return new URL(`../assets/music/${url}`, import.meta.url).href;
    },
  }
};

export default path;
