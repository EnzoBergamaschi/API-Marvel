const ts = Date.now(); 
const publicKey = "fcbab28a5e7f2861e8522cb08bc04396";
const privateKey = "6130cb891fcc64edd170bc526e4f4d9b87b23ca4";


const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
console.log("Hash gerado:", hash); 

// buscar heróis pelo nome
function searchCharacter() {
    const searchInput = document.getElementById("searchInput").value.trim(); // Pega o valor do input
    if (searchInput === "") {
        alert("DIGITE O NOME DAQUELE QUE TU BUSCAS");
        return;
    }

    // URL da API com o nome do personagem
    const apiUrl = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchInput}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    console.log("URL da API:", apiUrl); // Verifique a URL gerada

    // requisição
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const charactersDiv = document.getElementById("characters");
            charactersDiv.innerHTML = ""; // Limpa os resultados anteriores

            if (data.data.results.length === 0) {
                charactersDiv.innerHTML = "<p>No Data Found.</p>";
                return;
            }

            // personagens na tela
            data.data.results.forEach(character => {
                const charElement = document.createElement("div");
                charElement.classList.add("character-card");
                charElement.innerHTML = `
                    <h2>${character.name}</h2>
                    <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
                    <p>${character.description || "No description."}</p>
                `;
                charactersDiv.appendChild(charElement);
            });
        })
        .catch(error => {
            console.error("Error on Search:", error);
            alert("Error on Search.");
        });
}