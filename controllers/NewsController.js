const { postImageUrl, getImageUrl } = require("../helper/s3_bucket");
const News = require("../models/News");

const addNews = async (req, res) => {
    try {
        const data = await req.body;
        const { _id } = req.user;
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
            return res.status(400).json({ errorMessage: 'something went wrong', statusCode: 400 })
        }
        return res.status(400).json({ errorMessage: 'something went wrong', statusCode: 400 })
    } catch (error) {
        res.status(404).json({ errorMessage: "Sorry unable to add news", statusCode: 404 })
    }

}

const getNews = async (req, res) => {
    try {
        const allNews = await News.find({ is_deleted: 1 }).populate('author').exec()
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
        return res.status(400).json({ errorMessage: error, statusCode: 400 })
    }
}

// content: data.news,
// image_url: `news/${data.image}`,
// s3_url: imgUrl,
// title: data.title,
// category: data.category,
// redirect: data.redirect,
// button_text: data.button_text,
// button_link: data.button_link

const editNews = async (req, res) => {
    try {
        const data = await req.body;
        const { _id } = req.user;
        let imgUrl = ''
        let updatedNews = {};
        if (data) {
            if (data.image && data.type) {
                imgUrl = await postImageUrl(data.image, data.type);
            }
            if (data.news) {
                updatedNews['content'] = data.news
            }
            if (data.image) {
                updatedNews['image_url'] = `news/${data.image}`
            }
            if (imgUrl.length > 0) {
                updatedNews['s3_url'] = imgUrl
            }
            if (data.title) {
                updatedNews['title'] = data.title
            }
            if (data.category) {
                updatedNews['category'] = data.category
            }
            if (data.button_text) {
                updatedNews['button_text'] = data.button_text
            }
            if (data.button_link) {
                updatedNews['button_link'] = data.button_link
            }
            // console.log(updatedNews.length)
            if (data['_id'] && Object.keys(updatedNews).length > 0) {
                const updatedData = await News.updateOne({ _id: data['_id'] }, { $set: updatedNews });
                console.log(updatedData)
                return res.status(200).json({ message: 'successfully updated', imgUrl: imgUrl, statusCode: 200 });
            }
            return res.status(400).json({ errorMessage: 'nothing to update', statusCode: 400 });
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({ errorMessage: error, statusCode: 400 });
    }
}

const getParticularNews = async (req, res) => {
    try {
        const id = await req.params.id;
        if (id) {
            const news = await News.findById({ _id: id }).populate('author').exec();
            return res.status(200).json({ message: 'Successfully Get News', statusCode: 200, news: news })
        }
        return res.status(400).json({ errorMessage: 'Id not found', statusCode: 400 });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ errorMessage: error, statusCode: 400 });
    }
}

const deleteNews = async (req, res) => {
    try {
        const id = await req.params.id;
        if (id) {
            const news = await News.updateOne({ _id: id }, { $set: { is_deleted: 2 } });
            const allNews = await News.find({ is_deleted: 1 }).populate('author').exec();
            return res.status(200).json({ message: 'Successfully Deleted News', statusCode: 200, allNews: allNews })
        }
        return res.status(400).json({ errorMessage: 'Id not found', statusCode: 400 });
    } catch (error) {
        return res.status(400).json({ errorMessage: error, statusCode: 400 })
    }
}

module.exports = { addNews, getNews, getImageUrlNew, getParticularNews, editNews, deleteNews }