CREATE TABLE user_politician
(   
    up_id uuid PRIMARY KEY default uuid_generate_v4(),
    up_user_id uuid NOT NULL,
    up_politician_id VARCHAR NOT NULL,

    CONSTRAINT up_fk_user    
        FOREIGN KEY(up_user_id)
        REFERENCES user_account(user_id)
)