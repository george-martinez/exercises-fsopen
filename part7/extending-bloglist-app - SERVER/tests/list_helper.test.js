const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes

const blogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    }
]

const listWithOneBlog = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5,
    }
]


describe('Testing total likes function:', () => {
    test('of empty list is zero', () => {
        expect(totalLikes([])).toBe(0)
    })

    test('of a bigger list is calculated right', () => {
        expect(totalLikes(blogs)).toBe(36)
    })

    test('when list has only one blog equals the likes of that', () => {
        expect(totalLikes(listWithOneBlog)).toBe(5)
    })

    test('of undefined/null/NaN variable returns -1', () => {
        expect(totalLikes(undefined)).toBe(-1)
        expect(totalLikes(null)).toBe(-1)
        expect(totalLikes(NaN)).toBe(-1)
    })
})

describe(('Testing favorite blog function:'), () => {
    test('of empty list is an empty object', () => {
        expect(favoriteBlog([])).toEqual({})
    })

    test('of a bigger list is calculated right', () => {
        expect(favoriteBlog(blogs)).toEqual({
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12,
        })
    })

    test('when list has only one blog equals the likes of that', () => {
        expect(favoriteBlog(listWithOneBlog)).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        }
        )
    })

    test('of undefined/null/NaN variable returns -1', () => {
        expect(favoriteBlog(undefined)).toBe(-1)
        expect(favoriteBlog(null)).toBe(-1)
        expect(favoriteBlog(NaN)).toBe(-1)
    })

})

describe(('Testing most blogs function:'), () => {
    test('of empty list is an empty object', () => {
        expect(mostBlogs([])).toEqual({})
    })

    test('of a bigger list is calculated right', () => {
        expect(mostBlogs(blogs)).toEqual({
            author: 'Robert C. Martin',
            blogs: 3,
        })
    })

    test('when list has only one blog equals the likes of that', () => {
        expect(mostBlogs(listWithOneBlog)).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1,
        }
        )
    })

    test('of undefined/null/NaN variable returns -1', () => {
        expect(mostBlogs(undefined)).toBe(-1)
        expect(mostBlogs(null)).toBe(-1)
        expect(mostBlogs(NaN)).toBe(-1)
    })

})

describe(('Testing most likes function:'), () => {
    test('of empty list is an empty object', () => {
        expect(mostLikes([])).toEqual({})
    })

    test('of a bigger list is calculated right', () => {
        expect(mostLikes(blogs)).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17,
        })
    })

    test('when list has only one blog equals the likes of that', () => {
        expect(mostLikes(listWithOneBlog)).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 5,
        }
        )
    })

    test('of undefined/null/NaN variable returns -1', () => {
        expect(mostLikes(undefined)).toBe(-1)
        expect(mostLikes(null)).toBe(-1)
        expect(mostLikes(NaN)).toBe(-1)
    })

})