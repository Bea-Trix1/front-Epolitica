CREATE TABLE IF NOT EXISTS default_account (
    df_account_id uuid PRIMARY KEY default uuid_generate_v4(),
    
    df_account_user_id uuid NOT NULL,
    df_account_password CHARACTER varying(500) NOT NULL,

    df_account_create_timestamp TIMESTAMP default NOW(),
    df_account_update_timestamp TIMESTAMP default NOW(),

    CONSTRAINT df_account_fk_user           
        FOREIGN KEY(df_account_user_id)     
        REFERENCES user_account(user_id)    
)
