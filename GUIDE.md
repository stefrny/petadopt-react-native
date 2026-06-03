# 🐾 Guia do Projeto - Pet Adopt

Este documento tem o objetivo de ajudar a entender como o app está organizado.
O projeto usa **React Native** com **Expo Router**.

## 📂 Estrutura de Pastas (Quem é Quem)

*   **`app/`**: Aqui moram as nossas telas. O nome do arquivo vira a rota automaticamente (ex: `login.tsx` vira `/login`).
    *   **`(tabs)/`**: Telas que têm a barrinha de navegação embaixo (Home, Favoritos, Perfil).
    *   **`pet/`**: Telas específicas de pets, como cadastro e detalhes.
*   **`components/`**: Peças de interface que repetimos, como o card do pet (`PetItem`).
*   **`constants/`**: Constantes globais do projeto.
*   **`contexts/`**: O "cérebro" do app. Aqui guardamos dados que são compartilhados com **todas** as telas (ex: se o usuário está logado ou a lista de pets).
*   **`hooks/`**: Atalhos para facilitar nossa vida. Em vez de escrever 50 linhas de lógica dentro de cada tela, usamos `const { pets } = usePets()`.
*   **`services/`**: São funções que buscam ou salvam dados na internet ou qualquer outro lugar fora do app. Aqui é onde fica o código que se comunica com o servidor (API) do professor.
*   **`storage/`**: Onde o app salva coisas no próprio celular para servir como um cache. Ex: o token de acesso do usuário depois que ele faz o login.
*   **`types/`**: Definições de como são nossos objetos (Usuário, Pet, etc) para o TypeScript nos ajudar com o autocompletar.

---

## 🧠 Como o App funciona (Fluxo de Dados)

1.  **Autenticação**: Ao abrir o app, o `AuthProvider` checa se existe um "token" salvo no celular. Se não tiver, ele te joga para o Login.
2.  **Dados**: O `PetProvider` busca a lista de pets da API uma única vez e guarda na memória. Todas as telas (Home, Favoritos) usam essa mesma lista.
3.  **Filtros**: Quando você digita na busca, não pedimos dados novos para o servidor; nós apenas escondemos os pets que não batem com o que você digitou (isso deixa o app super rápido!).

---

## 🚀 Suas Tasks (Missões)


---

## 💡 Dicas de Ouro
*   Sempre use `import { ... } from '@/hooks'` ou `@/services` para importar as coisas.
*   Se o VS Code sublinhar algo de vermelho, passe o mouse em cima; o TypeScript geralmente te diz o que está faltando.

**Bora pra cima! 🚀**
