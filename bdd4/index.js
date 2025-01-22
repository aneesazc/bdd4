const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './bdd4/database.sqlite',
    driver: sqlite3.Database,
  });
})();

async function fetchAllGames() {
  const query = 'SELECT * FROM games';
  const response = await db.all(query, []);
  return { games: response };
}

app.get('/games', async (req, res) => {
  try {
    const results = await fetchAllGames();
    if (results.games.length === 0) {
      return res.status(400).json({ message: 'No games found' });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getGameById(id) {
  const query = 'SELECT * FROM games WHERE id = ?';
  const response = await db.get(query, [id]);
  return { game: response };
}

app.get('/games/details/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const results = await getGameById(id);
    if (results.game === undefined) {
      return res.status(400).json({ message: `No game by the id ${id} found` });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getGamesByGenre(genre) {
  const query = 'SELECT * FROM games WHERE genre = ?';
  const response = await db.all(query, [genre]);
  return { games: response };
}

app.get('/games/genre/:genre', async (req, res) => {
  const genre = req.params.genre;
  try {
    const results = await getGamesByGenre(genre);
    if (results.games.length === 0) {
      return res
        .status(400)
        .json({ message: `No games found in the genre ${genre}` });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getGamesByPlatform(platform) {
  const query = 'SELECT * FROM games WHERE platform = ?';
  const response = await db.all(query, [platform]);
  return { games: response };
}

app.get('/games/platform/:platform', async (req, res) => {
  const platform = req.params.platform;
  try {
    const results = await getGamesByPlatform(platform);
    if (results.games.length === 0) {
      return res
        .status(400)
        .json({ message: `No games found on the platform ${platform}` });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getGamesSortedByRating() {
  const query = 'SELECT * FROM games ORDER BY rating DESC';
  const response = await db.all(query);
  return { games: response };
}

app.get('/games/sort-by-rating', async (req, res) => {
  try {
    const results = await getGamesSortedByRating();
    if (results.games.length === 0) {
      return res
        .status(400)
        .json({ message: 'No games found to sort by rating' });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getAllPlayers() {
  const query = 'SELECT * FROM players';
  const response = await db.all(query);
  return { players: response };
}

app.get('/players', async (req, res) => {
  try {
    const results = await getAllPlayers();
    if (results.players.length === 0) {
      return res.status(400).json({ message: 'No players found' });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getPlayerById(id) {
  const query = 'SELECT * FROM players WHERE id = ?';
  const response = await db.get(query, [id]);
  return { player: response };
}

app.get('/players/details/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const results = await getPlayerById(id);
    if (results.player === undefined) {
      return res
        .status(400)
        .json({ message: `No player found with the ID ${id}` });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getPlayersByPlatform(platform) {
  const query = 'SELECT * FROM players WHERE platform = ?';
  const response = await db.all(query, [platform]);
  return { players: response };
}

app.get('/players/platform/:platform', async (req, res) => {
  const platform = req.params.platform;
  try {
    const results = await getPlayersByPlatform(platform);
    if (results.players.length === 0) {
      return res
        .status(400)
        .json({ message: `No players found on the platform ${platform}` });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getPlayersSortedByRating() {
  const query = 'SELECT * FROM players ORDER BY rating DESC';
  const response = await db.all(query);
  return { players: response };
}

app.get('/players/sort-by-rating', async (req, res) => {
  try {
    const results = await getPlayersSortedByRating();
    if (results.players.length === 0) {
      return res
        .status(400)
        .json({ message: 'No players found to sort by rating' });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getAllTournaments() {
  const query = 'SELECT * FROM tournaments';
  const response = await db.all(query);
  return { tournaments: response };
}

app.get('/tournaments', async (req, res) => {
  try {
    const results = await getAllTournaments();
    if (results.tournaments.length === 0) {
      return res.status(400).json({ message: 'No tournaments found' });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getTournamentById(id) {
  const query = 'SELECT * FROM tournaments WHERE id = ?';
  const response = await db.get(query, [id]);
  return { tournament: response };
}

app.get('/tournaments/details/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const results = await getTournamentById(id);
    if (results.tournament === undefined) {
      return res
        .status(400)
        .json({ message: `No tournament found with the ID ${id}` });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getTournamentsByGameId(gameId) {
  const query = 'SELECT * FROM tournaments WHERE gameId = ?';
  const response = await db.all(query, [gameId]);
  return { tournaments: response };
}

app.get('/tournaments/game/:id', async (req, res) => {
  const gameId = req.params.id;
  try {
    const results = await getTournamentsByGameId(gameId);
    if (results.tournaments.length === 0) {
      return res
        .status(400)
        .json({ message: `No tournaments found for game ID ${gameId}` });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getTournamentsSortedByPrizePool() {
  const query = 'SELECT * FROM tournaments ORDER BY prizePool DESC';
  const response = await db.all(query);
  return { tournaments: response };
}

app.get('/tournaments/sort-by-prize-pool', async (req, res) => {
  try {
    const results = await getTournamentsSortedByPrizePool();
    if (results.tournaments.length === 0) {
      return res
        .status(400)
        .json({ message: 'No tournaments found to sort by prize pool' });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
