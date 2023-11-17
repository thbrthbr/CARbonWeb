const { FootPrints, Users, Channels, Mate } = require('../models');
const { Op } = require('sequelize');

exports.login = async (req, res) => {
  try {
    let user = await Users.findOne({
      where: { userId: req.body.username },
    });
    if (user.dataValues) {
      if (user.dataValues.password == req.body.password) {
        res.send({
          status: 200,
          id: user.dataValues.id,
          nickname: user.dataValues.nickname,
          userId: user.dataValues.userId,
        });
      } else {
        res.send({ status: 401 });
      }
    } else {
      res.send({ status: 401 });
    }
  } catch (e) {
    res.send({ status: 401 });
  }
};

exports.carbonFootPrints = async (req, res) => {
  let list = await FootPrints.findAll();
  res.send({ status: 200 });
};

exports.signin = async (req, res) => {
  try {
    let response = await Users.create({
      userId: req.body.userId,
      password: req.body.password,
      name: req.body.name,
      nickname: req.body.nickname,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
      birthdate: req.body.birthdate,
      isDriver: req.body.isDriver,
      hasCar: req.body.hasCar,
      point: 0,
      level: 0,
      carpoolCount: 0,
      rating: 5.0,
    });
    res.send({ status: '성공' });
  } catch (e) {
    console.log('error: ', e);
    res.send({ status: '실패' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    let userProf = await Users.findOne({
      where: { userId: req.params.id },
    });
    res.send({ status: 200, data: userProf });
  } catch (e) {
    res.send({ status: 401 });
  }
};

exports.getToday = async (req, res) => {
  try {
    let user = await FootPrints.findAll({
      where: { userId: req.params.id },
    });
    let userProf = await Users.findOne({
      where: { userId: req.params.id },
    });
    let myData = {
      emission: 0,
      point: userProf.dataValues.point,
      level: userProf.dataValues.level,
      today: 0,
    };
    let today = new Date();
    for (let i = 0; i < user.length; i++) {
      myData.emission += +user[i].dataValues.emissions;
      if (user[i].dataValues.day == today.getDate()) {
        myData.today += +user[i].dataValues.emissions;
      }
    }
    res.send({ status: 200, todayData: myData });
  } catch (e) {
    res.send({ status: 401 });
  }
};

exports.getLastday = async (req, res) => {
  try {
    let user = await FootPrints.findAll({
      where: { userId: req.params.id },
    });
    let userProf = await Users.findOne({
      where: { userId: req.params.id },
    });
    let myData = {
      emission: 0,
      point: userProf.dataValues.point,
      level: userProf.dataValues.level,
      lastDate: '',
    };
    let today = new Date();
    let biggestYear = 0;
    let biggestMonth = 0;
    let biggestDay = 0;
    let testing = [];
    for (let i = 0; i < user.length; i++) {
      if (+user[i].dataValues.year > biggestYear) {
        biggestYear = +user[i].dataValues.year;
        testing = [];
        testing.push(user[i]);
      } else if (+user[i].dataValues.year == biggestYear) {
        testing.push(user[i]);
      }
    }
    let testing2 = [];
    for (let i = 0; i < testing.length; i++) {
      if (+testing[i].dataValues.month > biggestMonth) {
        biggestMonth = +testing[i].dataValues.month;
        testing2 = [];
        testing2.push(testing[i]);
      } else if (+testing[i].dataValues.month == biggestMonth) {
        testing2.push(testing[i]);
      }
    }
    let testing3 = [];
    for (let i = 0; i < testing2.length; i++) {
      if (+testing2[i].dataValues.day > biggestDay) {
        if (today.getDate() > +testing2[i].dataValues.day) {
          biggestDay = +testing[i].dataValues.day;
          testing3 = [];
          testing3.push(testing2[i]);
        }
      } else if (+testing[i].dataValues.day == biggestDay) {
        testing3.push(testing2[i]);
      }
    }
    if (testing3.length > 0) {
      myData.lastDate =
        testing3[0].dataValues.year +
        '-' +
        testing3[0].dataValues.month +
        '-' +
        testing3[0].dataValues.day;
      for (let i = 0; i < testing3.length; i++) {
        myData.emission += +testing3[i].emissions;
      }
      res.send({ status: 200, todayData: myData });
    } else {
      res.send({ status: 400 });
    }
  } catch (e) {
    res.send({ status: 401 });
  }
};

exports.getChannels = async (req, res) => {
  let mates = await Mate.findAll({ where: { mateRealId: req.params.id } });
  let channels = [];

  for (let i = 0; i < mates.length; i++) {
    let containedChannels = await Channels.findOne({
      where: { mateListId: mates[i].dataValues.mateListId },
    });
    channels = [...channels, containedChannels];
  }

  let channelData = [];
  for (let i = 0; i < channels.length; i++) {
    let channel = {
      channelId: channels[i].dataValues.id,
      hostId: channels[i].dataValues.hostId,
      hostRealId: channels[i].dataValues.hostRealId,
      hostNickname: channels[i].dataValues.hostNickname,
      driverNickname: channels[i].dataValues.driverNickname,
      departures: channels[i].dataValues.departures,
      arrivals: channels[i].dataValues.arrivals,
      mateList: [],
    };
    let mates = await Mate.findAll({
      where: { mateListId: channels[i].dataValues.mateListId },
    });
    channel.mateList = mates;
    channelData.push(channel);
  }
  res.send({ data: channelData });
};

exports.deleteChannels = async (req, res) => {
  let room = await Channels.findOne({
    where: { id: req.params.roomid },
  });
  let mateId = room.dataValues.mateListId;
  await Channels.destroy({ where: { id: req.params.roomid } });
  await Mate.destroy({ where: { mateListId: mateId } });
  res.send({ status: 200 });
};

exports.getCalendarData = async (req, res) => {
  let data = await FootPrints.findAll({ where: { userId: req.params.id } });
  res.send({ status: 200, data: data });
};

exports.patchProfile = async (req, res) => {
  await Users.update(
    {
      nickname: req.body.nickname,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
      hasCar: req.body.hasCar,
      isDriver: req.body.driving,
    },
    {
      where: {
        userId: req.body.userId,
      },
    },
  );
  res.send({ status: 200 });
};

exports.getPageChannels = async (req, res) => {
  let page = +req.params.num;
  let channels = await Channels.findAll();
  channels = channels.reverse();
  let sendingData = [];
  for (let i = (page - 1) * 10; i < 10 * page; i++) {
    if (channels[i]) {
      let curpersonnel = await Mate.findAll({
        where: { mateListId: channels[i].dataValues.mateListId },
      });
      channels[i].dataValues['mateList'] = curpersonnel;
      sendingData.push(channels[i]);
    }
  }
  res.send({ status: 200, data: sendingData, num: channels.length });
};

exports.getByKeyword = async (req, res) => {
  let keyword = req.params.keyword;
  let page = +req.params.page;
  let depa = await Channels.findAll({
    where: {
      departures: {
        [Op.like]: '%' + keyword + '%',
      },
    },
  });
  let arri = await Channels.findAll({
    where: { arrivals: { [Op.like]: '%' + keyword + '%' } },
  });
  let channels = depa.concat(arri);
  let sendingData = [];
  for (let i = (page - 1) * 10; i < 10 * page; i++) {
    if (channels[i]) {
      let curpersonnel = await Mate.findAll({
        where: { mateListId: channels[i].dataValues.mateListId },
      });
      channels[i].dataValues['mateList'] = curpersonnel;
      sendingData.push(channels[i]);
    }
  }
  res.send({ status: 200, data: sendingData, num: channels.length });
};

exports.createChannel = async (req, res) => {
  let generate = Date.now();
  let response = await Channels.create({
    hostId: req.body.userId,
    hostRealId: req.body.realId,
    hostNickname: req.body.nickname,
    driverNickname: req.body.driverId != null ? req.body.driverId : '미정',
    departures: req.body.departures,
    departuresLatitude: req.body.departuresLatitude,
    departuresLongitude: req.body.departuresLongitude,
    arrivals: req.body.arrivals,
    arrivalsLatitude: req.body.arrivalsLatitude,
    arrivalsLongitude: req.body.arrivalsLongitude,
    personnel: req.body.personnel,
    curpersonnel: 1,
    content: req.body.content,
    regular: req.body.regular,
    mateListId: generate,
  });

  res.send({ status: 200, mateListId: generate });
};

exports.getOneChannel = async (req, res) => {
  let entered = await Channels.findOne({
    where: { id: +req.params.id },
  });
  let mateList = await Mate.findAll({
    where: { mateListId: entered.dataValues.mateListId },
  });
  entered.dataValues['mateList'] = mateList;
  res.send({ status: 200, data: entered });
};

exports.mateOn = async (req, res) => {
  let mate = await Mate.create({
    mateId: req.body.mateId,
    mateRealId: req.body.mateRealId,
    mateNickname: req.body.mateNickname,
    mateListId: req.body.mateListId,
    departures: req.body.departures,
    departuresLatitude: req.body.departuresLatitude,
    departuresLongitude: req.body.departuresLongitude,
    arrivals: req.body.arrivals,
    arrivalsLatitude: req.body.arrivalsLatitude,
    arrivalsLongitude: req.body.arrivalsLongitude,
  });
  let num = await Mate.findAll({ where: { mateListId: req.body.mateListId } });
  await Channels.update(
    { curpersonnel: num.length },
    { where: { mateListId: req.body.mateListId } },
  );
  res.send({ status: 200, data: mate });
};

exports.patchChannelContent = async (req, res) => {
  let result = await Channels.update(
    {
      content: req.body.content,
    },
    {
      where: {
        id: req.body.channelId,
      },
    },
  );
  res.send({ status: 200, data: result });
};

exports.showUserProfile = async (req, res) => {
  let result = await Users.findOne({ where: { userId: req.params.id } });
  res.send({ status: 200, data: result.dataValues });
};

exports.showUserDA = async (req, res) => {
  let room = await Channels.findOne({ where: { id: req.params.roomid } });
  let mate = await Mate.findOne({
    where: {
      mateListId: room.dataValues.mateListId,
      mateRealId: req.params.id,
    },
  });
  res.send({
    status: 200,
    data: {
      departures: mate.dataValues.departures,
      arrivals: mate.dataValues.arrivals,
    },
  });
};

exports.driverChange = async (req, res) => {
  let sorted = req.body.driverNickname + '(' + req.body.driverId + ')';
  await Channels.update(
    { driverNickname: sorted },
    { where: { id: req.body.roomId } },
  );
  res.send({ status: 200 });
};

exports.personalDAChange = async (req, res) => {
  let channel = await Channels.findOne({ where: { id: req.body.channelId } });

  await Mate.update(
    {
      departures: req.body.departures,
      arrivals: req.body.arrivals,
      departuresLatitude: req.body.departuresLatitude,
      departuresLongitude: req.body.departuresLongitude,
      arrivalsLatitude: req.body.departuresLatitude,
      arrivalsLongitude: req.body.departuresLongitude,
    },
    {
      where: {
        mateRealId: req.body.userId,
        mateListId: channel.dataValues.mateListId,
      },
    },
  );
  res.send({ status: 200 });
};
