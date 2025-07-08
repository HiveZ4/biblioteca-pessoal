# 🚀 Instruções de Hospedagem no Vercel

## Pré-requisitos

1. **Conta no Vercel**: Crie uma conta gratuita em [vercel.com](https://vercel.com)
2. **Conta no GitHub**: Seu projeto deve estar em um repositório GitHub
3. **Banco Neon**: Já configurado e funcionando

## 📋 Passo a Passo

### 1. Preparar o Repositório

```bash
# Fazer commit de todas as alterações
git add .
git commit -m "feat: adicionar autenticação JWT e preparar para deploy"
git push origin main
```

### 2. Hospedar o Backend (API)

1. **Acesse o Vercel Dashboard**
2. **Clique em "New Project"**
3. **Importe seu repositório do GitHub**
4. **Configure o projeto:**
   - **Framework Preset**: Other
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Output Directory**: deixe vazio
   - **Install Command**: `npm install`

5. **Configurar Variáveis de Ambiente:**
   - Vá em Settings > Environment Variables
   - Adicione as seguintes variáveis:
     ```
     DATABASE_URL = sua_url_do_neon_aqui
     JWT_SECRET = sua_chave_secreta_jwt_aqui
     ```

6. **Deploy**: Clique em "Deploy"

### 3. Hospedar o Frontend (React)

1. **Criar novo projeto no Vercel**
2. **Importe o mesmo repositório**
3. **Configure o projeto:**
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

4. **Configurar Variáveis de Ambiente:**
   - Vá em Settings > Environment Variables
   - Adicione:
     ```
     REACT_APP_API_URL = https://seu-backend-vercel.vercel.app
     ```
   - **Importante**: Substitua pela URL real do seu backend

5. **Deploy**: Clique em "Deploy"

### 4. Configurar CORS no Backend

Após o deploy do frontend, atualize o arquivo `server/config/corsOptions.js`:

```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'https://seu-frontend-vercel.vercel.app', // Adicione a URL do seu frontend
  'https://seu-dominio-personalizado.com'   // Se tiver domínio próprio
];
```

### 5. Testar a Aplicação

1. **Acesse a URL do frontend**
2. **Teste o registro de usuário**
3. **Teste o login**
4. **Teste a criação de livros**
5. **Verifique se os dados estão sendo salvos no Neon**

## 🔧 Configurações Importantes

### Backend (server/vercel.json)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.js"
    }
  ]
}
```

### Frontend (.env.production)
```
REACT_APP_API_URL=https://seu-backend-vercel.vercel.app
```

## 🛠️ Solução de Problemas

### Erro de CORS
- Verifique se a URL do frontend está em `corsOptions.js`
- Certifique-se de que o backend está rodando

### Erro de Banco de Dados
- Verifique se a `DATABASE_URL` está correta
- Teste a conexão com o Neon

### Erro 404 no Frontend
- Verifique se o `REACT_APP_API_URL` está correto
- Certifique-se de que o backend está online

### Erro de Autenticação
- Verifique se o `JWT_SECRET` está configurado
- Teste o login localmente primeiro

## 📱 URLs Finais

Após o deploy, você terá:
- **Frontend**: `https://seu-projeto-frontend.vercel.app`
- **Backend**: `https://seu-projeto-backend.vercel.app`

## 🎯 Próximos Passos

1. **Domínio Personalizado**: Configure um domínio próprio no Vercel
2. **SSL**: Já incluído automaticamente pelo Vercel
3. **Monitoramento**: Use o dashboard do Vercel para monitorar
4. **Analytics**: Ative o Vercel Analytics se necessário

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs no dashboard do Vercel
2. Teste localmente primeiro
3. Verifique as variáveis de ambiente
4. Consulte a documentação do Vercel

---

**✅ Seu projeto está pronto para produção!**

