import axios from 'axios';
const ucArticlesUrl = axios.create({
    baseURL: 'https://project-week-sam-shep-news-room.onrender.com/api',
});

export const postComment = (article_id, comment) => {
    return ucArticlesUrl.post(`/articles/${article_id}/comments`, comment)
    .then((res) => {
        return res.data.comment;
    })
    .catch((err) => {
        console.error(err);
        throw err;
    });
}