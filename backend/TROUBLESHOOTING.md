# Troubleshooting Guide

## "DataSource with name 'default' has already added" Error

This error occurs when TypeORM tries to register multiple data sources with the same name. This has been fixed by:

1. **Removed duplicate ConfigModule.forRoot()** from `api.module.ts`
2. **Removed conflicting AppDataSource** from `data-source.ts`
3. **Added explicit data source naming** in TypeORM configuration
4. **Fixed transactional data source creation** in `modules-set.ts`

### What was changed:

- ✅ Removed duplicate `ConfigModule.forRoot()` from `ApiModule`
- ✅ Removed standalone `AppDataSource` from `data-source.ts`
- ✅ Added explicit `name: "default"` to TypeORM configuration
- ✅ Fixed data source factory to prevent conflicts

## Environment Variables Not Set

If you see warnings like:

```
The "DATABASE_PORT" variable is not set. Defaulting to a blank string.
```

### Solution:

1. **Create .env file:**

   ```bash
   node setup-env.js
   ```

2. **Or manually copy:**

   ```bash
   cp env.example .env
   ```

3. **Edit .env file** with your actual values

## Common Issues and Solutions

### 1. Database Connection Issues

**Error:** `Connection refused` or `ECONNREFUSED`

**Solution:**

- Ensure Docker containers are running: `docker-compose up -d`
- Check if database port is available: `docker-compose ps`
- Verify environment variables in `.env` file

### 2. Redis Connection Issues

**Error:** `Redis connection failed`

**Solution:**

- Check Redis container status: `docker-compose logs redis`
- Verify Redis password in `.env` file
- Ensure Redis port is not conflicting

### 3. TypeORM Migration Issues

**Error:** `Migration failed` or `Table already exists`

**Solution:**

- Reset database: `docker-compose down -v && docker-compose up -d`
- Check migration files in `src/database/migrations/`
- Verify `synchronize` setting in TypeORM config

### 4. Port Conflicts

**Error:** `Port already in use`

**Solution:**

- Check what's using the port: `netstat -ano | findstr :5432`
- Change port in `.env` file
- Stop conflicting services

## Development Workflow

### 1. Start Development Environment

```bash
# Copy environment file
node setup-env.js

# Start Docker services
docker-compose up -d

# Install dependencies
yarn install

# Start development server
yarn start:dev
```

### 2. Reset Environment

```bash
# Stop and remove containers with volumes
docker-compose down -v

# Rebuild and start
docker-compose up -d --build
```

### 3. View Logs

```bash
# All services
docker-compose logs

# Specific service
docker-compose logs db
docker-compose logs redis
```

## Environment Variables Reference

### Required Variables

```env
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_USERNAME=admin
DATABASE_PASSWORD=admin123
DATABASE_NAME=crm
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=redispass
```

### Optional Variables

```env
APP_PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key
```

## Still Having Issues?

1. **Check Docker status:** `docker-compose ps`
2. **View service logs:** `docker-compose logs [service-name]`
3. **Verify .env file:** Ensure no spaces around `=` signs
4. **Restart everything:** `docker-compose down && docker-compose up -d`
5. **Check file permissions:** Ensure `.env` file is readable
