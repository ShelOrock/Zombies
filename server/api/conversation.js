const router = require('express').Router();
const { Conversation, Reply } = require('../db');

const RESULTS_PER_PAGE = 10;

//get to return all posts
//use query parameter to specify page of results
router.get('/', (req, res, next) => {
  Conversation.findAll({
    limit: RESULTS_PER_PAGE,
    offset: (req.query.page || 0) * RESULTS_PER_PAGE,
    order: [
        ['createdAt', 'DESC']
    ],
  })
    .then(results => {
      res.status(200).send(results);
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

//return all conversations with answer
router.get('/answered', (req, res, next) => {
    Conversation.findAll({
        where: {
          hasAnswer: true,
        },
        order: [
          ['createdAt', 'DESC']
        ],
    })
    .then(results => {
      res.status(200).send(results);
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
})

//return conversation by Id, includes replies
router.get('/:id', (req, res, next) => {
  Conversation.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Reply,
    },
  })
    .then(result => {
      result ? res.status(200).send(result) : res.status(404).send(null);
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

router.post('/', (req, res, next) => {
  const { userId, title } = req.body
  if (!userId || !title ) {
    return res
      .status(400)
      .send('Missing information');
  }
  Conversation.create({
    ...req.body
  })
    .then(created => {
      res.status(200).send(created);
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

router.put('/:id', (req, res, next) => {
  Conversation.update(
    {
      ...req.body,
    },
    {
      where: { id: req.params.id },
      returning: true,
    }
  )
    .then(updated => {
      updated
        ? res.status(201).send(updated[1][0])
        : res.status(404).send(null);
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

router.delete('/:id', (req, res, next) => {
  Conversation.destroy({
    where: {
      id: req.params.id,
    },
    include: [{ model: Reply }],
  })
    .then(destroyed => {
      destroyed
        ? res.status(200).send({ success: true })
        : res.status(404).send({ success: false });
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

module.exports = router;
