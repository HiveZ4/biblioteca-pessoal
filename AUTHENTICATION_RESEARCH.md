# Pesquisa sobre Autenticação e Autorização para Node.js e React

## 💡 Métodos de Autenticação Comuns

Existem diversos métodos para implementar autenticação e autorização em aplicações web, especialmente com Node.js (Express) e React. Os mais comuns incluem:

1.  **Autenticação Baseada em Sessão (Session-based Authentication)**:
    *   **Como funciona**: O servidor cria uma sessão para o usuário após o login e armazena um ID de sessão (session ID) em um cookie no navegador do cliente. Para cada requisição subsequente, o cliente envia o cookie com o session ID, e o servidor usa esse ID para recuperar os dados da sessão (geralmente armazenados em um banco de dados ou cache).
    *   **Vantagens**: Simples de implementar para aplicações monolíticas, bom para manter o estado do usuário.
    *   **Desvantagens**: Não é ideal para arquiteturas distribuídas ou mobile (APIs RESTful sem estado), vulnerável a CSRF (Cross-Site Request Forgery) se não for bem implementado, exige que o servidor mantenha o estado da sessão.

2.  **Autenticação Baseada em Token (Token-based Authentication)**:
    *   **Como funciona**: Após o login, o servidor gera um token (geralmente um JWT - JSON Web Token) e o envia para o cliente. O cliente armazena esse token (por exemplo, no `localStorage` ou em cookies `httpOnly`) e o envia em cada requisição subsequente no cabeçalho `Authorization` (Bearer Token). O servidor valida o token para autenticar e autorizar a requisição.
    *   **Vantagens**: Sem estado (stateless) no servidor, escalável, funciona bem com APIs RESTful e aplicações mobile, menos vulnerável a CSRF (se o token for armazenado corretamente).
    *   **Desvantagens**: Exige gerenciamento de tokens (expiração, renovação), tokens podem ser roubados se armazenados de forma insegura no cliente (ex: `localStorage` é vulnerável a XSS).

3.  **OAuth 2.0 / OpenID Connect**:
    *   **Como funciona**: Protocolo de autorização que permite que aplicações de terceiros obtenham acesso limitado a recursos de um usuário em um servidor HTTP. Geralmente usado para 


recursos de um usuário em um servidor HTTP. Geralmente usado para "Login com Google", "Login com Facebook", etc. O OpenID Connect é uma camada de identidade construída sobre o OAuth 2.0.
    *   **Vantagens**: Delega a complexidade da autenticação a um provedor de identidade, seguro, amplamente adotado.
    *   **Desvantagens**: Mais complexo de configurar inicialmente, pode ser um exagero para projetos pequenos que não precisam de login social.

## 🔑 JSON Web Tokens (JWT)

Dado que o projeto precisa que cada usuário veja apenas seus próprios livros, e considerando a natureza de uma aplicação web moderna (frontend React e backend Node.js/Express), a autenticação baseada em token, especificamente com JWT, é a abordagem mais recomendada. Ela oferece um bom equilíbrio entre segurança, escalabilidade e facilidade de implementação para este cenário.

### Fluxo de Autenticação com JWT:

1.  **Login do Usuário**: O usuário envia suas credenciais (usuário/senha) para o servidor.
2.  **Geração do Token**: O servidor verifica as credenciais. Se válidas, ele gera um JWT. Este JWT contém informações sobre o usuário (payload), como seu ID, nome de usuário, e quaisquer outras informações relevantes para a autorização (ex: `role`). O token é assinado digitalmente pelo servidor com uma chave secreta.
3.  **Envio do Token ao Cliente**: O servidor envia o JWT de volta ao cliente.
4.  **Armazenamento do Token**: O cliente armazena o JWT. As opções comuns são `localStorage` (fácil acesso, mas vulnerável a XSS) ou cookies `httpOnly` (mais seguro contra XSS, mas pode ser vulnerável a CSRF se não houver proteção).
5.  **Requisições Protegidas**: Para acessar rotas protegidas, o cliente inclui o JWT no cabeçalho `Authorization` de cada requisição (ex: `Authorization: Bearer <token>`).
6.  **Verificação do Token**: O servidor recebe a requisição, extrai o JWT do cabeçalho, verifica sua assinatura (para garantir que não foi adulterado) e sua validade (expiração). Se o token for válido, o servidor extrai as informações do usuário do payload e permite o acesso ao recurso.

### Melhores Práticas com JWT:

*   **Tokens de Acesso e Refresh Tokens**: Para aumentar a segurança e a experiência do usuário:
    *   **Access Token**: Curta duração (minutos a horas). Usado para autenticar requisições à API. Se for comprometido, seu tempo de vida limitado minimiza o risco.
    *   **Refresh Token**: Longa duração (dias a meses). Usado para obter um novo Access Token quando o atual expira. Deve ser armazenado de forma mais segura (ex: cookie `httpOnly` e seguro).
*   **Armazenamento Seguro**: Evitar armazenar JWTs no `localStorage` devido à vulnerabilidade a ataques XSS. Cookies `httpOnly` são geralmente preferidos para Access Tokens e Refresh Tokens, com proteção CSRF adicional.
*   **Expiração do Token**: Definir um tempo de expiração adequado para os tokens de acesso. Isso força a reautenticação ou a renovação do token, limitando o tempo de exposição de um token comprometido.
*   **Revogação de Tokens**: Implementar um mecanismo para revogar tokens (especialmente refresh tokens) em caso de logout do usuário ou comprometimento da conta. Isso geralmente envolve uma lista negra (blacklist) de tokens ou um banco de dados de sessões.
*   **HTTPS**: Sempre usar HTTPS para todas as comunicações para proteger os tokens em trânsito.
*   **Validação do Token no Servidor**: Sempre validar a assinatura e a expiração do token em cada requisição protegida no backend.

## 🛡️ Autorização

Após a autenticação, a autorização define o que um usuário autenticado pode fazer. No seu caso, a autorização será baseada no ID do usuário. Cada livro terá um `userId` associado, e as requisições para listar, editar ou deletar livros deverão verificar se o `userId` do token corresponde ao `userId` do livro.

### Implementação da Autorização:

1.  **Adicionar `userId` ao Modelo `Book`**: O modelo `Book` no Prisma (e na tabela do banco de dados) precisará de um campo `userId` para associar cada livro a um usuário.
2.  **Middleware de Autorização**: No backend, um middleware Express pode ser usado para:
    *   Extrair o `userId` do JWT.
    *   Em rotas de listagem, filtrar os livros pelo `userId`.
    *   Em rotas de edição/deleção, verificar se o `userId` do token corresponde ao `userId` do livro que está sendo modificado.
3.  **Frontend**: O frontend precisará enviar o token em todas as requisições protegidas e lidar com as respostas de erro de autorização (ex: 403 Forbidden).

## 🌐 Hospedagem no Vercel

A implementação de autenticação e autorização não interfere diretamente na hospedagem no Vercel. O Vercel é uma plataforma de deploy para frontend (React) e serverless functions (Node.js). Você pode hospedar o frontend React diretamente no Vercel e o backend Node.js/Express como uma API serverless (se for um projeto pequeno/médio) ou em um serviço de backend separado (se for um backend mais robusto e persistente).

Para o seu projeto, o backend Node.js/Express pode ser hospedado em um serviço como o Render, Heroku, ou até mesmo em uma VM. O Vercel é excelente para o frontend React. A conexão com o Neon DB (que já está funcionando) será feita do backend, independentemente de onde ele esteja hospedado.

## 📝 Próximos Passos

Com base nesta pesquisa, o plano de ação mais seguro e adequado para o seu projeto é:

1.  **Implementar Autenticação com JWT no Backend**: Adicionar rotas de registro e login, gerar e validar JWTs.
2.  **Implementar Autorização no Backend**: Adicionar o campo `userId` ao modelo `Book` e criar middlewares para garantir que os usuários só acessem seus próprios livros.
3.  **Integrar Autenticação e Autorização no Frontend**: Modificar o React para enviar credenciais, armazenar tokens e incluir tokens em requisições protegidas.
4.  **Testar Completamente**: Garantir que todo o fluxo de autenticação e autorização funcione como esperado.
5.  **Preparar para Hospedagem**: O frontend no Vercel e o backend em um serviço adequado (como Render ou Heroku, ou até mesmo o próprio Vercel se for via Serverless Functions).

