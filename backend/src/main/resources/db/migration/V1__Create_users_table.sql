CREATE TABLE
    users (
        id BIGSERIAL PRIMARY KEY,
        email VARCHAR(64) NOT NULL UNIQUE,
        name VARCHAR(64) NOT NULL,
        created_at TIMESTAMP
        WITH
            TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP
        WITH
            TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

CREATE INDEX idx_users_email ON users (email);