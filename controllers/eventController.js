const Event = require('../models/eventModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Booking = require('../models/bookingModel');

exports.createEvent = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const newEvent = await Event.create({
    name: req.body.name,
    hostMuseum: req.body.hostMuseum,
    imgUrl: req.body.imgUrl,
    imgAlt: req.body.imgAlt,
    description: req.body.description,
    standardAdultPrice: req.body.standardAdultPrice,
    standardChildPrice: req.body.standardChildPrice,
    premiumAdultPrice: req.body.premiumAdultPrice,
    premiumChildPrice: req.body.premiumChildPrice,
    standardBenefits: [
      'Enjoy a day of fun and learning',
      'Tour the museum with our knowledgeable guides.',
    ],
    premiumBenefits: [
      'Enjoy a day of fun and learning',
      'Tour the museum with our knowledgeable guides.',
      "Stay late for an exlusive 'after dark' museum tour!",
    ],
    dateTime: '2023-06-02T12:45',
    features: [
      {
        icon: 'hourglass.svg',
        title: 'Journey Through Time',
        description:
          "Travel back in time and explore the rich history of Scotland. From the enigmatic carved stones of the Picts to the intricate illuminated manuscripts of the medieval Scots, you will discover a diverse range of cultures and traditions that have shaped Scotland over the centuries. You will learn about the everyday lives, beliefs, and customs of these ancient peoples, gaining a deeper understanding of Scotland's past and how it has evolved over time.",
      },
      {
        icon: 'map.svg',
        title: 'Uncover Hidden Treasures',
        description:
          "Get the opportunity to see some of Scotland's most fascinating archaeological finds up close. Marvel at the intricate designs and mysterious symbols on the carved stones of the Picts, and discover the exquisite metalwork and jewellery of the Vikings. You will also see Roman artefacts that shed light on the interaction between the Romans and the indigenous peoples of Scotland, as well as other treasures that offer a glimpse into Scotland's rich past.",
      },
      {
        icon: 'spade.svg',
        title: 'Dig into archaeology',
        description:
          "Travel back in time and explore the rich history of Scotland. From the enigmatic carved stones of the Picts to the intricate illuminated manuscripts of the medieval Scots, you will discover a diverse range of cultures and traditions that have shaped Scotland over the centuries. You will learn about the everyday lives, beliefs, and customs of these ancient peoples, gaining a deeper understanding of Scotland's past and how it has evolved over time.",
      },
      {
        icon: 'globe.svg',
        title: 'Explore the Wider World',
        description:
          "Gain a deeper understanding of Scotland's place in the wider world, and how its history has been shaped by interactions with other cultures and civilisations. Learn about the trade and exchange that took place between the ancient Scots and other cultures, as well as the conflicts and alliances that shaped Scotland's history. You will also see how Scotland's own unique culture and traditions have influenced and been influenced by other cultures, creating a rich and diverse tapestry of history and heritage.",
      },
    ],
    reviews: [
      {
        review: [
          'I recently attended the "Ancient Discoveries" event at The Burrell Collection, and I was absolutely blown away. The event was a fascinating journey through Scotland\'s ancient history, and I learned so much about the country\'s rich and complex past.',
          "The event was divided into two parts. The first part was a guided tour of the museum's collection of ancient artefacts. The tour guide was incredibly knowledgeable and passionate about her work, and she did a wonderful job of bringing the history of each artefact to life. The second part of the event was a lecture by a leading archaeologist on the topic of Scotland's ancient history. The lecture was informative and engaging, and it gave me a deeper understanding of the country's past.",
        ],
        img: '/reviewImg.png',
        author: 'Mary Jones',
      },
    ],
  });

  res.status(201).json({
    status: 'success',
    data: {
      event: newEvent,
    },
  });
});

exports.getAllEvents = catchAsync(async (req, res, next) => {
  const events = await Event.find();

  res.status(200).json({
    status: 'success',
    results: events.length,
    data: { events },
  });
});

exports.getEventsAtMuseum = catchAsync(async (req, res, next) => {
  const slug = req.params.museum;
  const events = await Event.find()
    .populate({
      path: 'hostMuseum',
      select: 'name location slug',
    })
    .exec(function (error, events) {
      const filteredEvents = events.filter(
        event => event?.hostMuseum?.slug === slug,
      );

      if (error || !filteredEvents) {
        return res.status(404).json({
          status: 'fail',
          message: 'No events found.',
        });
      }
      return res.status(200).json({
        status: 'success',
        results: events.length,
        data: {
          events: filteredEvents,
        },
      });
    });
});

exports.getSingleEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findOne({ slug: req.params.slug });

  if (!event) {
    return next(new AppError('No tour found with that ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { event },
  });
});

exports.updateEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!event) {
    return next(new AppError('No tour found with that ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { event },
  });
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findOneAndDelete({ slug: req.params.slug });

  if (!event) {
    return next(new AppError('No tour found with that ID.', 404));
  }

  await Booking.deleteMany({ event: event._id });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
