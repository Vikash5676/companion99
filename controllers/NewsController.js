const { postImageUrl, getImageUrl } = require("../helper/s3_bucket");
const News = require("../models/News");

const addNews = async (req, res) => {
    try {
        const data = await req.body;
        const { _id } = await req.user;
        if (data) {
            if (data.image && data.type) {
                const imgUrl = await postImageUrl(data.image, data.type);
                const newNews = new News({
                    author: _id,
                    content: data.news,
                    image_url: `news/${data.image}`,
                    s3_url: imgUrl,
                    title: data.title,
                    category: data.category,
                    redirect: data.redirect,
                    button_text: data.button_text,
                    button_link: data.button_link
                })
                const savedNews = await newNews.save();
                return res.status(200).json({ message: 'saved successful', imgUrl: imgUrl, statusCode: 200 })
            }
            return res.status(400).json({ message: 'something went wrong', statusCode: 400 })
        }
        return res.status(400).json({ message: 'something went wrong', statusCode: 400 })
    } catch (error) {
        res.status(404).json({ errorMessage: "Sorry unable to add news", statusCode: 404 })
    }

}

const getNews = async (req, res) => {
    try {
        const allNews = await News.find().populate('author').exec()
        if (allNews && allNews.length > 0) {
            return res.status(200).json({ allNews: allNews, message: 'got all news', statusCode: 200 })
        }
        return res.status(200).json({ allNews: [], errorMessage: 'Sorry No news', statusCode: 400 })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ errorMessage: error, statusCode: 400 })
    }
}

const getImageUrlNew = async (req, res) => {
    try {
        const { url } = await req.body;
        const news = await News.findOne({ s3_url: url })
        if (news) {
            const newUrl = await getImageUrl(news.image_url);
            const updatedNews = await News.updateOne({ s3_url: url }, { $set: { s3_url: newUrl } });
            return res.status(200).json({ message: 'successfully updated', statusCode: 200 })
        }

    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error, statusCode: 400 })
    }
}

module.exports = { addNews, getNews, getImageUrlNew }