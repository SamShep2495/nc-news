import axios from 'axios';
const ucArticlesUrl = axios.create({
    baseURL: 'https://project-week-sam-shep-news-room.onrender.com/api',
});

export const deleteComment = (comment_id) => {
    return ucArticlesUrl.delete(`/comments/${comment_id}`)
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        console.error(err);
        throw err;
    });
}