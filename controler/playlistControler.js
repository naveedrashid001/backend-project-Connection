// const { users:Users} = require("../models");
const {users:Users, courses:Courses, playlists: Playlists } = require("../models");
module.exports = {
    add_playlist: async function (req, res) {
        try {
            const { user } = req;
            const { fkuserid, fkcourseid } = req.body;
            const findfkuserid= await Users.findByPk(fkuserid)
            if(!findfkuserid){
                return res.status(404).send("fkuserid isn't avalible in the user database.!!")
            }
            const findfkcourseid= await Courses.findByPk(fkcourseid)
            if(!findfkcourseid){
                return res.status(404).send("fkcourseid isn't avalible in the course database.!!")
            }
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
            const {user} = req;
            const {removePlaylist}=req.body;
            const findplaylistid= await Playlists.findByPk(removePlaylist)
            if(!findplaylistid){
                return res.status(404).send("removePlaylist id isn't avalible in the playlist database.!!")
            }
            await Playlists.destroy({       /////  only Autherize person deleted playlist
                where: {
                    id: removePlaylist,
                },
            })
            res.status(200).send({
                message: "playlist deleted successfully",
                removePlaylist
            });
        } catch (err) {
            console.log(err);
            res.status(404).send(err.message || "something went wrong");
        }
    },
};
