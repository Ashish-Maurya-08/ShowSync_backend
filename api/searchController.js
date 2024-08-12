require('dotenv').config();

const axios = require('axios');

const token = process.env.TOKEN;
const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        language: "en-US",
        region: "IN",
    },
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    }
});


exports.getSearch = async (req, res) => {
    const media = req.params.media;
    const query = req.query.query;
    api.get(`search/${media}`, {
        params: {
            query: query,
        },
    })
    .then((response) => {
        res.send(response.data);
     })
    .catch((err) => {
        res.status(400).send("Something went wrong");
     });
}; 



exports.getDiscover = async (req, res) => {
    const media = req.params.media;
    const release = req.query.release;
    const genre = req.query.genre;
    const sort = req.query.sort;
    const keyword = req.query.keyword;
    const country = req.query.country;
    const origin_lang = req.query.origin_lang;
    const people = req.query.people;


    console.log(req.query);
    
    api.get(`discover/${media}`, {
        params: {
            primary_release_year: release,
            with_genres: genre,
            sort_by: sort,
            with_keywords: keyword,
            with_origin_country: country,
            with_original_language: origin_lang,
            with_people: people,
        },
    })
    .then((response) => {
        res.send(response.data);
     })
    .catch((err) => {
        res.status(400).send("Something went wrong");
     });
};