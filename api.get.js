import axios from 'axios';
const ucArticlesUrl = axios.create({
    baseURL: 'https://project-week-sam-shep-news-room.onrender.com/api',
});

export const getArticles = () => {
    return ucArticlesUrl.get('/articles')
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        console.error(err);
        throw err;
    });
}

export const getTopics = () => {
    return ucArticlesUrl.get('/topics')
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        console.error(err);
        throw err;
    });
}

export const getUsers = () => {
    return ucArticlesUrl.get('/users')
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        console.error(err);
        throw err;
    });
}

export const getSingleArticle = (article_id) => {
    return ucArticlesUrl.get(`/articles/${article_id}`)
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        console.error(err);
        throw err;
    });
}

export const getCommentsForArticle = (article_id) => {
    return ucArticlesUrl.get(`/articles/${article_id}/comments`)
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        console.error(err);
        throw err;
    });
}

export const getArticlesSorted = (sortBy, sortOrder) => {
    return ucArticlesUrl.get(`/articles?sort_by=${sortBy}&order=${sortOrder}`)
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        console.log('5.', err.message);
        console.error(err);
        throw err.message;
    });
}


export const fixDate = (timeStamp) => {
    const date = new Date (timeStamp)
    return date.toLocaleString()
}

