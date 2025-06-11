CREATE TABLE
    achievements (
        id BIGSERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        criteria TEXT NOT NULL,
        icon VARCHAR(50) NOT NULL DEFAULT '🏆',
        points INTEGER NOT NULL DEFAULT 0,
        category VARCHAR(50),
        is_hidden BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP
        WITH
            TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP
        WITH
            TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT chk_points_non_negative CHECK (points >= 0)
    );

CREATE TABLE
    user_achievements (
        id BIGSERIAL PRIMARY KEY,
        user_id BIGINT NOT NULL,
        achievement_id BIGINT NOT NULL,
        unlocked_at TIMESTAMP
        WITH
            TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMP
        WITH
            TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_user_achievements_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
            CONSTRAINT fk_user_achievements_achievement FOREIGN KEY (achievement_id) REFERENCES achievements (id) ON DELETE CASCADE,
            CONSTRAINT uk_user_achievement UNIQUE (user_id, achievement_id)
    );

CREATE INDEX idx_achievements_category ON achievements (category);

CREATE INDEX idx_achievements_is_hidden ON achievements (is_hidden);

CREATE INDEX idx_user_achievements_user_id ON user_achievements (user_id);

CREATE INDEX idx_user_achievements_achievement_id ON user_achievements (achievement_id);

CREATE INDEX idx_user_achievements_unlocked_at ON user_achievements (unlocked_at);

CREATE INDEX idx_user_achievements_user_unlocked ON user_achievements (user_id, unlocked_at);