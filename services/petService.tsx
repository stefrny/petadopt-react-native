const API_URL = 'https://petadopt.onrender.com';

export async function getPets() {
  const response = await fetch(`${API_URL}/pet/pets`);

  if (!response.ok) {
    throw new Error('Erro ao buscar pets');
  }
  const data = await response.json();
  return data.pets;
}

// Objetivo: Enviar dados para uma API realizar o cadastro de um usuario.
export async function registerUser(name: string, email: string, password: string, phone: string, confirmpassword: string){
  const response = await fetch(`${API_URL}/user/register` , {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          name,
          email,
          password,
          phone,
          confirmpassword
      }),
  });
}

/*

export → permite que essa função seja usada em outros arquivos (módulos).
async → indica que a função é assíncrona (pode usar await).
Parâmetros:
name: nome do usuário
email: email
password: senha
phone: telefone
confirmpassword: confirmação da senha

fetch → faz uma requisição HTTP para uma API.
${API_URL}/user/register → monta a URL do endpoint de cadastro.
await → espera a resposta da requisição antes de continuar.

body → dados enviados para a API.
JSON.stringify(...) → transforma o objeto JavaScript em JSON.
Aqui você está enviando os dados do usuário para o backend.

*/
