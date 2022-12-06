CREATE TABLE IF NOT EXISTS user_account (
    user_id uuid PRIMARY KEY default uuid_generate_v4(),
    
    user_name CHARACTER varying(50) NOT NULL,
    user_email CHARACTER varying(150) UNIQUE NOT NULL,
    user_picture_url CHARACTER varying(500) NOT NULL,

    -- [default | google]
    user_account_type CHARACTER varying(20) NOT NULL,

    user_create_timestamp TIMESTAMP default NOW(),
    user_update_timestamp TIMESTAMP default NOW()
)