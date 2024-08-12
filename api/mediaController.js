require("dotenv").config();

const axios = require("axios");

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


exports.getTrending = async (req, res) => {
    const type = req.params.type;
    let time = req.query.time;
    if (!time){
        time = "day";
    }
    
    api.get(`trending/${type}/${time}`)
    .then((response) => {
        res.send(response.data);
     })
    .catch((err) => {
        res.status(400).send("Something went wrong");
     });
};  


exports.getList = async (req, res) => {
    const media = req.params.media;
    const type = req.params.type;
    
    api.get(`${media}/${type}`)
    .then((response) => {
        res.send(response.data);
     })
    .catch((err) => {
        res.status(400).send("Something went wrong");
     });
};


exports.getDetail = async (req, res) => {
    const media = req.params.media;
    const id = req.params.id;

    api.get(`${media}/${id}`)
    .then((response) => {
        res.send(response.data);
     })
    .catch((err) => {
        res.status(400).send("Something went wrong");
     });
};


exports.getExtra = async (req, res) => {
    const media = req.params.media;
    const id = req.params.id;
    const option = req.params.option;

    api.get(`${media}/${id}/${option}`,{
        params: {
            include_image_language: "en,null",
        }
    })
    .then((response) => {
        res.send(response.data);
     })
    .catch((err) => {
        res.status(400).send("Something went wrong");
     });
};


exports.getProvider = async (req, res) => {
    const media = req.params.media;
    const id = req.params.id;

    api.get(`${media}/${id}/watch/providers`)
    .then((response) => {
        res.send(response.data);
     })
    .catch((err) => {
        res.status(400).send("Something went wrong");
     });
};


