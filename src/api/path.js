const path = {
  //get
  App: {
    shadowBlogCommits: (username = 'mark-zj' , repoName = 'shadow-blog') => {
      return `https://api.github.com/repos/${username}/${repoName}/commits`
    }
  }
};

export default path;
