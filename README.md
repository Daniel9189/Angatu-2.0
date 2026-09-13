# Angatu - E-commerce

Plataforma de e-commerce full-stack com Laravel 13 (backend) e React (frontend).

## 🛠️ Stack

- **Backend**: Laravel 13, PHP 8.3
- **Banco de Dados**: PostgreSQL 16 (Docker)
- **Frontend**: React 18, Vite

## 📋 Requisitos

- **Docker** e **Docker Compose** (para rodar PostgreSQL)
- **PHP 8.3+**
- **Node.js 18+**
- **Composer**
- **npm** ou **yarn**

## 🚀 Instalação e Setup

Você já tem um banco PostgreSQL rodando no Docker. Agora precisa instalar o backend (Laravel) e frontend (React) localmente.

### 1️⃣ Iniciar o banco de dados

```bash
# A partir da raiz do projeto
docker-compose up -d

# Verificar se o container está rodando
docker-compose ps
```

### 2️⃣ Instalar e configurar o Backend (Laravel)

```bash
cd api

# Instalar dependências PHP
composer install

# Copiar arquivo de configuração
cp .env.example .env

# Gerar chave da aplicação
php artisan key:generate

# Configurar .env para conectar ao banco Docker
# Edite o arquivo .env e defina:
# DB_CONNECTION=pgsql
# DB_HOST=127.0.0.1
# DB_PORT=5433
# DB_DATABASE=
# DB_USERNAME=
# DB_PASSWORD=

# Executar migrations
php artisan migrate

# (Opcional) Inserir dados de exemplo
php artisan db:seed

# Iniciar servidor Laravel
php artisan serve
```

O backend estará disponível em `http://localhost:8000`

### 3️⃣ Instalar e configurar o Frontend (React)

```bash
cd front

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

