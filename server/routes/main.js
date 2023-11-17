const express = require('express');
const router = express.Router();

const Controller = require('../controller/Cmain');
const multer = require('multer');
const path = require('path');

router.post('/login', Controller.login);
router.post('/signin', Controller.signin);

router.get('/api/carbonFootprints', Controller.carbonFootPrints);

router.get('/api/today/:id', Controller.getToday);
router.get('/api/lastday/:id', Controller.getLastday);

router.get('/api/profile/:id', Controller.getProfile);
router.patch('/api/profile/:id', Controller.patchProfile);

router.get('/api/channels/:id', Controller.getChannels);
router.delete('/api/channels/:roomid', Controller.deleteChannels);

router.post('/api/channelCreate', Controller.createChannel);
router.patch('/api/channelContentPatch', Controller.patchChannelContent);
router.get('/api/userProfile/:id', Controller.showUserProfile);
router.get('/api/userDA/:id/:roomid', Controller.showUserDA);
router.patch('/api/driverChange', Controller.driverChange);
router.patch('/api/personalDAChange', Controller.personalDAChange);

router.get('/api/pages/:num', Controller.getPageChannels);
router.get('/api/search/:keyword/:page', Controller.getByKeyword);

router.get('/api/calendar/:id', Controller.getCalendarData);

router.get('/api/enter/:id', Controller.getOneChannel);

router.post('/api/mateOn', Controller.mateOn);

module.exports = router;
