CREATE TABLE comment_proposition
(
    cp_id uuid PRIMARY KEY default uuid_generate_v4(),
    cp_user_id uuid NOT NULL,
    cp_proposition_id VARCHAR NOT NULL,
    cp_comment VARCHAR(200) NOT NULL,
    cp_create_timestamp TIMESTAMP default NOW(),
    cp_update_timestamp TIMESTAMP default NOW(),
    
    CONSTRAINT cp_fk_user    
        FOREIGN KEY(cp_user_id)
        REFERENCES user_account(user_id)
)