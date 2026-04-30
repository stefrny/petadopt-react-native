const API_URL = 'https://petadopt.onrender1.com';

export async function getPets() {
  const response = await fetch(`${API_URL}/pet/pets`);

  if (!response.ok) {
    throw new Error('Erro ao buscar pets');
  }
  const data = await response.json();
  return data.pets;
}
