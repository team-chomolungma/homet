INSERT INTO "users" ("user_id", "displayname", "password_hash", "created_at") VALUES
('akira123', 'あきら', '$2a$10$GjI9T3/OSVzGvKFRWvCh3O.uehR5kjeHqcd4yt7zYERxfhLDw5L8e', NOW()),
('satuki123', 'さつき', '$2a$10$EiO/7/O2EUd111KUVNLGE.8.SxaC.JO1ExBJx.gw3IJeUE9BimiEm', NOW()),
('minato123', 'みなと', '$2a$10$NVr/GpRiCzK6oUH6eTesee7bHI09dyVSZ2ynZrsIDiwcUZRKEG7o.', NOW()),
('masaharu123', 'まさはる', '$2a$10$8S3AZXZ/12BZEC9sBlwii.i4v5urx8Tn7q4qKAV9drhWsJzXh/ODm', NOW()),
('natsuko123', 'なつこ', '$2a$10$Z1q/VIaPJuVOnl7szKylSu.xxq4vXJfPRwRS1nqnjg3lMRZvv7khe', NOW()),
('urasho', 'うら', '$2a$10$5gXu8F3DsIYWlQwzDgnBReSfgXFpAFo1QDhVHXrCqb1/I7IfB./Li', NOW());

INSERT INTO "players" ("user_id","player_id","created_at") VALUES
(1,'dummy1',NOW()),
(2,'dummy2',NOW()),
(3,'dummy3',NOW()),
(4,'dummy4',NOW()),
(5,'dummy5',NOW()),
(6,'dummy_ura_後で修正',NOW());

INSERT INTO "friends" ("user_id","friend_id","approved", "created_at") VALUES
(6, 1, true, NOW()),
(6, 2, true, NOW()),
(6, 3, true, NOW()),
(6, 4, true, NOW()),
(6, 5, true, NOW()),
(1, 6, true, NOW()),
(2, 6, true, NOW()),
(3, 6, true, NOW()),
(4, 6, true, NOW()),
(5, 6, true, NOW());

INSERT INTO "voice_files"
("sender_id", "receiver_id", "file_name", "s3_key", "first_played_at", "play_flag", "sent_at")
VALUES
(1, 6, 'dummy.mp3', 'audio/591e9301-1468-41dc-8990-b2596a5d3069.mp3', NULL, true, NOW() - INTERVAL '0 day'),
(6, 1, 'dummy.mp3', 'audio/591e9301-1468-41dc-8990-b2596a5d3069.mp3', NULL, true, NOW() - INTERVAL '5 days'),
(2, 6, 'dummy.mp3', 'audio/591e9301-1468-41dc-8990-b2596a5d3069.mp3', NULL, true, NOW() - INTERVAL '2 days'),
(6, 2, 'dummy.mp3', 'audio/591e9301-1468-41dc-8990-b2596a5d3069.mp3', NULL, true, NOW() - INTERVAL '1 day'),
(3, 6, 'dummy.mp3', 'audio/591e9301-1468-41dc-8990-b2596a5d3069.mp3', NULL, true, NOW() - INTERVAL '4 days'),
(6, 3, 'dummy.mp3', 'audio/591e9301-1468-41dc-8990-b2596a5d3069.mp3', NULL, true, NOW() - INTERVAL '3 days'),
(4, 6, 'dummy.mp3', 'audio/591e9301-1468-41dc-8990-b2596a5d3069.mp3', NULL, true, NOW() - INTERVAL '0 day'),
(6, 4, 'dummy.mp3', 'audio/591e9301-1468-41dc-8990-b2596a5d3069.mp3', NULL, true, NOW() - INTERVAL '2 days'),
(5, 6, 'dummy.mp3', 'audio/591e9301-1468-41dc-8990-b2596a5d3069.mp3', NULL, true, NOW() - INTERVAL '1 day'),
(6, 5, 'dummy.mp3', 'audio/591e9301-1468-41dc-8990-b2596a5d3069.mp3', NULL, true, NOW() - INTERVAL '3 days'),
(1, 6, 'dummy.mp3', 'audio/591e9301-1468-41dc-8990-b2596a5d3069.mp3', NULL, true, NOW() - INTERVAL '4 days'),
(6, 2, 'dummy.mp3', 'audio/591e9301-1468-41dc-8990-b2596a5d3069.mp3', NULL, true, NOW() - INTERVAL '0 day'),
(3, 6, 'dummy.mp3', 'audio/591e9301-1468-41dc-8990-b2596a5d3069.mp3', NULL, true, NOW() - INTERVAL '5 days'),
(6, 4, 'dummy.mp3', 'audio/591e9301-1468-41dc-8990-b2596a5d3069.mp3', NULL, true, NOW() - INTERVAL '2 days'),
(5, 6, 'dummy.mp3', 'audio/591e9301-1468-41dc-8990-b2596a5d3069.mp3', NULL, true, NOW() - INTERVAL '1 day'),
(6, 1, 'dummy.mp3', 'audio/591e9301-1468-41dc-8990-b2596a5d3069.mp3', NULL, true, NOW() - INTERVAL '3 days'),
(2, 6, 'dummy.mp3', 'audio/591e9301-1468-41dc-8990-b2596a5d3069.mp3', NULL, true, NOW() - INTERVAL '4 days'),
(6, 3, 'dummy.mp3', 'audio/591e9301-1468-41dc-8990-b2596a5d3069.mp3', NULL, true, NOW() - INTERVAL '5 days'),
(4, 6, 'dummy.mp3', 'audio/591e9301-1468-41dc-8990-b2596a5d3069.mp3', NULL, true, NOW() - INTERVAL '0 day'),
(6, 5, 'dummy.mp3', 'audio/591e9301-1468-41dc-8990-b2596a5d3069.mp3', NULL, true, NOW() - INTERVAL '2 days');
