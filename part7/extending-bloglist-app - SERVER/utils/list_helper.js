const totalLikes = (blogs) => {
    if(blogs?.length === undefined) return -1

    const likesSum = blogs.reduce((previous, current) => previous + current.likes, 0)

    return likesSum
}

const favoriteBlog = (blogs) => {
    if(blogs?.length === undefined) return -1

    let mostVotedBlog = {}

    let maxVotedAcc = 0

    blogs.forEach(blog => {
        if(blog.likes > maxVotedAcc){
            mostVotedBlog = { ...blog }
            maxVotedAcc =  blog.likes
        }
    })

    delete mostVotedBlog._id
    delete mostVotedBlog.url
    delete mostVotedBlog.__v

    return mostVotedBlog
}

const mostBlogs = (blogs) => {
    if(blogs?.length === undefined) return -1
    if(blogs.length === 0) return {}

    let acc = {}
    let authorWithMostBlogs = {
        author: '',
        blogs: 0
    }

    blogs.forEach(blog => acc[blog.author] ? acc[blog.author]++ : acc[blog.author] = 1)

    const authors = Object.keys(acc)

    authors.forEach(author => {
        if(acc[author] > authorWithMostBlogs.blogs ){
            authorWithMostBlogs.author = author
            authorWithMostBlogs.blogs = acc[author]
        }
    })

    return authorWithMostBlogs
}

const mostLikes = (blogs) => {
    if(blogs?.length === undefined) return -1
    if(blogs.length === 0) return {}

    let acc = {}

    let authorWithMostLikes = {
        author: '',
        likes: 0
    }

    blogs.forEach(blog => acc[blog.author] ? acc[blog.author] += blog.likes : acc[blog.author] = blog.likes)

    const authors = Object.keys(acc)

    authors.forEach(author => {
        if(acc[author] > authorWithMostLikes.likes ){
            authorWithMostLikes.author = author
            authorWithMostLikes.likes = acc[author]
        }
    })

    return authorWithMostLikes
}


module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}