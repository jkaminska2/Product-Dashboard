# Product Dashboard Demo

## Struktura katalogów

- `frontend/`
  - `Dockerfile` – wieloetapowy build React + Nginx
  - `nginx.conf` – konfiguracja Nginx dla SPA i cache /api/stats
  - `package.json` / `package-lock.json`
  - `src/` – aplikacja React z routingiem i widokami
- `backend/`
  - `Dockerfile` – kontener Node.js/Express dla API
  - `package.json` / `package-lock.json`
  - `server.js` – endpointy `/items`, `/stats`, `/health`
- `docker-compose.yml` – uruchomienie frontendu i backendu w sieci wewnętrznej
- `frontend/.dockerignore`, `backend/.dockerignore`

## Wymagania funkcjonalne

- Frontend React z routingiem klienta
- Widoki: `/`, `/products`, `/stats`
- Backend API: `GET /api/items`, `POST /api/items`, `GET /api/stats`
- Nginx serwuje SPA i przekazuje `/api/` do backendu
- Cache po stronie Nginx dla `/api/stats` 30 sekund z nagłówkiem `X-Cache-Status`
- Backend działa w sieci wewnętrznej, nie publikuje portu na hoście

## Kluczowe pliki

- `frontend/Dockerfile`
- `frontend/nginx.conf`
- `backend/Dockerfile`
- `backend/server.js`
- `docker-compose.yml`

## Kompilacja lokalna

1. Zbuduj obrazy:

```bash
docker compose build
```

2. Uruchom aplikację:

```bash
docker compose up -d
```

3. Otwórz frontend w przeglądarce:

- `http://localhost:8080`

## Komendy publikacji do rejestru

Zastąp `REGISTRY` własnym rejestrem, np. `docker.io/<user>` lub `ghcr.io/<user>`.

```bash
docker build -t REGISTRY/product-dashboard-backend:v1 -t REGISTRY/product-dashboard-backend:latest ./backend

docker build -t REGISTRY/product-dashboard-frontend:v1 -t REGISTRY/product-dashboard-frontend:latest ./frontend

docker push REGISTRY/product-dashboard-backend:v1

docker push REGISTRY/product-dashboard-backend:latest

docker push REGISTRY/product-dashboard-frontend:v1

docker push REGISTRY/product-dashboard-frontend:latest
```

## Usunięcie lokalnych obrazów i ponowne pobranie

```bash
docker image rm REGISTRY/product-dashboard-backend:v1 REGISTRY/product-dashboard-backend:latest product-dashboard-backend:latest

docker image rm REGISTRY/product-dashboard-frontend:v1 REGISTRY/product-dashboard-frontend:latest product-dashboard-frontend:latest

docker pull REGISTRY/product-dashboard-backend:v1

docker pull REGISTRY/product-dashboard-backend:latest

docker pull REGISTRY/product-dashboard-frontend:v1

docker pull REGISTRY/product-dashboard-frontend:latest
```

## Uruchomienie ze ściągniętych obrazów

```bash
docker network create dashboard_net

docker run -d --name product-dashboard-backend --network dashboard_net -e INSTANCE_ID=backend-1 REGISTRY/product-dashboard-backend:latest

docker run -d --name product-dashboard-frontend --network dashboard_net -p 8080:80 REGISTRY/product-dashboard-frontend:latest
```

## Testowanie endpointów

- Frontend: `http://localhost:8080/`
- Produkty: `http://localhost:8080/products`
- Statystyki: `http://localhost:8080/stats`
- API stats: `http://localhost:8080/api/stats`
