import React, { useState, useEffect } from "react";

export default function Repo() {
  const [repositories, setRepositories] = useState([]);

  //ComponentDidMount = não é passado o segundo parametro
  useEffect(async () => {
    const response = await fetch(
      "https://api.github.com/users/bgeromojs/repos"
    );
    const data = await response.json();

    setRepositories(data);
  }, []);

  //ComponentDidUpdate = recebe a variavel que sera atualizada
  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);

    document.title = `Vocè tem ${filtered.length} favoritos`;
  }, [repositories]);

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });

    setRepositories(newRepositories);
  }

  return (
    <ul>
      {repositories.map(repo => (
        <li key={repo.id}>
          {repo.name}
          {repo.favorite && <span>(Favorito)</span>}
          <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
        </li>
      ))}
    </ul>
  );
}
