CREATE TABLE
    goals (
        id BIGSERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
        target_date DATE,
        completion_date DATE,
        user_id BIGINT NOT NULL,
        created_at TIMESTAMP
        WITH
            TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP
        WITH
            TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_goals_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
            CONSTRAINT chk_status CHECK (
                status IN ('ACTIVE', 'COMPLETED', 'PAUSED', 'CANCELLED')
            )
    );

CREATE INDEX idx_goals_user_id ON goals (user_id);

CREATE INDEX idx_goals_status ON goals (status);

CREATE INDEX idx_goals_target_date ON goals (target_date);

CREATE INDEX idx_goals_user_status ON goals (user_id, status);