// const { users:Users} = require("../models");
const { playlists: Playlists } = require("../models");
module.exports = {
    add_playlist: async function (req, res) {
        try {
            const { user } = req;
            const { fkuserid, fkcourseid } = req.body;

            // Use Playlists model to create a new playlist entry
            const playlist = await Playlists.create({
                // fkuserid:user.id, /// if i want when somone add playlist then the fkuserid = to those persone. then i send only fkcourseid in the req.body;
                fkuserid,
                fkcourseid
            });

            res.status(200).send({
                message: "playlist added successfully",
                playlist,
            });
        } catch (err) {
            console.log(err);
            res.status(404).send(err.message || "something went wrong");
        }
    },
    remove_Playlist: async function (req, res) {
        try {
            const { user } = req;
            const {removePlaylist}=req.body;
            await Playlists.destroy({       /////  only Autherize person deleted playlist
                where: {
                    id: removePlaylist,
                },
            })
            res.status(200).send({
                message: "playlist deleted successfully",
            });
        } catch (err) {
            console.log(err);
            res.status(404).send(err.message || "something went wrong");
        }
    },
};
