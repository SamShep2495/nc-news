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