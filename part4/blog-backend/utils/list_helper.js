const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {

  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);

};

const favouriteBlog = (blogs) => {

  const reducer = (max, item) => {

    return max.likes > item.likes ? max : item;

  };

  const favouriteBlog = blogs.reduce(reducer, {});

  return {
    title: favouriteBlog.title,
    author: favouriteBlog.author,
    likes: favouriteBlog.likes
  };

};

const mostBlogs = (blogs) => {

  // step 1
  // accumulate list of blogs by unique author
  // loop through every blog, if author has already been found up their count of blogs
  // if author has not been found add to the "result" array 1 blog post for that author
  // result: [ { author: 'x', blogs; 1 }, { author: 'y', blogs: 3 }];

  const countBlogsByAuthor = blogs.reduce((result, blog) => {
    let authorIdx = result.findIndex((count) => count.author === blog.author);
    if (authorIdx > 0) {
      result[authorIdx].blogs++;
    } else {
      result.push({ author: blog.author, blogs: 1});
    };
    return result;
  }, []);

  // step 2
  // filter out author with highest # of blogs!

  const mostBloggedAuthor = countBlogsByAuthor.reduce((prev, next) => {
    return (prev.blogs > next.blogs) ? prev : next; 
  });

  return mostBloggedAuthor;

};

const mostLikes = (blogs) => {

  // step 1
  // accumulate likes by author
  // loop through every blog, if author has already been found up their likes by the likes of current blog
  // if author has not been found add to the "result" array the likes for current blog to that author
  // result: [ { author: 'x', likes; 2 }, { author: 'y', likes: 6 }];

  const countLikesByAuthor = blogs.reduce((result, blog) => {
    let authorIdx = result.findIndex((count) => count.author === blog.author);
    if (authorIdx > 0) {
      result[authorIdx].likes += blog.likes;
    } else {
      result.push({ author: blog.author, likes: blog.likes });
    };
    return result;
  }, []);

  // step 2
  // filter out author with highest # of likes!
  const mostLikedAuthor = countLikesByAuthor.reduce((prev, next) => {
    return (prev.likes > next.likes) ? prev : next;
  });

  return mostLikedAuthor;

};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
};