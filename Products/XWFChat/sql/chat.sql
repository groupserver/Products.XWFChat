CREATE TABLE chat_message (
    id serial NOT NULL,
    user_id text NOT NULL,
    group_id text NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    message text NOT NULL
);

CREATE TABLE chat_user (
    id serial NOT NULL,
    user_id text NOT NULL,
    group_id text NOT NULL,
    joined timestamp without time zone NOT NULL,
    last_seen timestamp without time zone NOT NULL,
    last_message timestamp without time zone
);

