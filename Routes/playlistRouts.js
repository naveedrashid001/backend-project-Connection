const express=require('express')
const router=express.Router();
const playlistsControler=require("../controler/playlistControler")
const isAuthenticated=require('../middlewares/isAuthenticated')

//// add playlists  /// only those persone add playlist when there have account in our database
router.route('/addplaylists/:userid').post(isAuthenticated,playlistsControler.add_playlist);

//// remove playlists  /// only those persone remove playlist when there have account in our database
router.route('/removeplaylist/:userid').delete(isAuthenticated,playlistsControler.remove_Playlist);

module.exports=router;