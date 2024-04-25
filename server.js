const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const users = [
  {
    email: "aleksei@example.com",
    fullname: "Alexay",
    password: "lkJlkn8hj",
    token: "fb566635a66295da0c8ad3f467c32dcf",
  },
];

const quotes = [
  {
    quoteId: 1,
    authorId: 1,
    quote:
      "The more you like yourself, the less you are like anyone else, which makes you unique.",
  },
  {
    quoteId: 2,
    authorId: 1,
    quote:
      "Disneyland is a work of love. We didn't go into Disneyland just with the idea of making money.",
  },
  {
    quoteId: 3,
    authorId: 1,
    quote:
      "I always like to look on the optimistic side of life, but I am realistic enough to know that life is a complex matter.",
  },
  {
    quoteId: 4,
    authorId: 2,
    quote: "The secret of getting ahead is getting started.",
  },
  {
    quoteId: 5,
    authorId: 2,
    quote:
      "Part of the secret of a success in life is to eat what you like and let the food fight it out inside.",
  },
  {
    quoteId: 6,
    authorId: 2,
    quote:
      "You can't depend on your eyes when your imagination is out of focus.",
  },
  {
    quoteId: 7,
    authorId: 3,
    quote:
      "Look deep into nature, and then you will understand everything better.",
  },
  {
    quoteId: 8,
    authorId: 3,
    quote:
      "Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning.",
  },
  {
    quoteId: 9,
    authorId: 3,
    quote: "The only source of knowledge is experience.",
  },
];

const authors = [
  {
    authorId: 1,
    name: "Walt Disney",
  },
  {
    authorId: 2,
    name: "Mark Twain",
  },
  {
    authorId: 3,
    name: "Albert Einstein",
  },
];

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

function isAuthorized(req) {
  const { token } = req.query;
  const { pathname } = req._parsedUrl;
  const user = users.find((user) => user.token === token);
  return !!user || pathname === "/login" || pathname === "/info";
}

server.use((req, res, next) => {
  if (isAuthorized(req)) {
    // add your authorization logic here
    const { pathname } = req._parsedUrl;
    if (pathname === "/author" || pathname === "/quote") {
      const delayInMilliseconds = 5000; //5 second
      setTimeout(next, delayInMilliseconds);
    } else {
      next(); // continue to JSON Server router
    }
  } else {
    res.status(401).send({
      success: false,
      data: {
        message: "Access denied.",
      },
    });
  }
});

server.post("/login", (req, res, next) => {
  const { email, password } = req.body?.data || {};
  const user = users.find(
    (user) =>
      user.email === email?.toLocaleLowerCase() && user.password === password
  );

  if (user) {
    user.token = uuidv4();
    return res.jsonp({
      success: true,
      data: {
        token: user.token,
      },
    });
  }
  return res.status(401).send({
    success: false,
    data: {
      message: "Access denied.",
    },
  });
});

server.get("/profile", (req, res) => {
  const { token } = req.query;
  const user = users.find((user) => user.token === token);
  if (user) {
    return res.jsonp({
      success: true,
      data: {
        email: user.email,
        fullname: user.fullname,
      },
    });
  }
});

server.delete("/logout", (req, res) => {
  const { token } = req.query;
  const user = users.find((user) => user.token === token);
  if (user) {
    user.token = "";
    return res.jsonp({
      success: true,
      data: {},
    });
  }
  return res.status(401).send({
    success: false,
    data: {
      message: "Access denied.",
    },
  });
});

server.get("/author", (req, res) => {
  const index = getRandomInt(authors.length - 1);
  return res.jsonp({
    success: true,
    data: authors[index],
  });
});

server.get("/quote", (req, res) => {
  const { authorId } = req.query;
  const authorQuotes = quotes.filter(
    (quote) => quote.authorId.toString() === authorId
  );
  const index = getRandomInt(authorQuotes.length - 1);
  return res.jsonp({
    success: true,
    data: authorQuotes[index],
  });
});

router.render = (req, res) => {
  res.jsonp({
    success: true,
    data: res.locals.data,
  });
};

// Use default router
server.use(router);
server.listen(3001, () => {
  console.log("JSON Server is running");
});
