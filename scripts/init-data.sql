-- Insertion des catégories
INSERT INTO categories (id, name, description, created_at)
VALUES 
  (1, 'Vie Pratique', 'Astuces quotidiennes, petites annonces, conseils pour économiser', NOW()),
  (2, 'Tabous et Sans Filtre', 'Sujets sensibles avec anonymat, parle sans drap', NOW()),
  (3, 'Culture & Détente', 'Humour, musique, cuisine ivoirienne, zouglou, coupé-décalé', NOW())
ON CONFLICT (id) DO NOTHING;

-- Insertion de forums de test (si aucun n'existe)
INSERT INTO forums (title, description, category_id, is_private, creator_id, created_at)
SELECT 
  'Comment économiser à Abidjan ?', 
  'Partagez vos astuces pour économiser au quotidien à Abidjan', 
  1, 
  false, 
  auth.uid(), 
  NOW()
FROM auth.users
WHERE NOT EXISTS (SELECT 1 FROM forums LIMIT 1)
LIMIT 1;

INSERT INTO forums (title, description, category_id, is_private, creator_id, created_at)
SELECT 
  'Le meilleur garba de Cocody', 
  'À la recherche du meilleur garba du quartier', 
  3, 
  false, 
  auth.uid(), 
  NOW()
FROM auth.users
WHERE EXISTS (SELECT 1 FROM forums LIMIT 1)
LIMIT 1;

INSERT INTO forums (title, description, category_id, is_private, creator_id, created_at)
SELECT 
  'Parler de sexe, c''est dur ?', 
  'Discussions ouvertes sur la sexualité sans tabou', 
  2, 
  false, 
  auth.uid(), 
  NOW()
FROM auth.users
WHERE EXISTS (SELECT 1 FROM forums LIMIT 2)
LIMIT 1;

-- Insertion de posts de test
INSERT INTO posts (title, content, forum_id, author_id, is_anonymous, created_at)
SELECT 
  'Astuces pour les transports en commun', 
  'J''ai découvert qu''en prenant les gbaka tôt le matin (avant 6h30), on paie moins cher sur certaines lignes. Quelqu''un d''autre a des astuces à partager ?', 
  f.id, 
  u.id, 
  false, 
  NOW()
FROM forums f, auth.users u
WHERE f.title = 'Comment économiser à Abidjan ?'
AND NOT EXISTS (SELECT 1 FROM posts LIMIT 1)
LIMIT 1;

INSERT INTO posts (title, content, forum_id, author_id, is_anonymous, created_at)
SELECT 
  'Garba pas cher près de l''université', 
  'Il y a un super garbadrôme près de l''université qui fait un garba à 500 FCFA. La qualité est top et les portions sont généreuses. C''est à côté de la pharmacie du campus.', 
  f.id, 
  u.id, 
  false, 
  NOW()
FROM forums f, auth.users u
WHERE f.title = 'Le meilleur garba de Cocody'
AND EXISTS (SELECT 1 FROM posts LIMIT 1)
LIMIT 1;

-- Insertion de commentaires de test
INSERT INTO comments (content, post_id, author_id, is_anonymous, created_at)
SELECT 
  'Merci pour l''info ! Je vais essayer demain matin.', 
  p.id, 
  u.id, 
  false, 
  NOW()
FROM posts p, auth.users u
WHERE p.title = 'Astuces pour les transports en commun'
AND NOT EXISTS (SELECT 1 FROM comments LIMIT 1)
LIMIT 1;

INSERT INTO comments (content, post_id, author_id, is_anonymous, created_at)
SELECT 
  'J''y suis allé hier, c''est vraiment bon ! Merci pour la recommandation.', 
  p.id, 
  u.id, 
  false, 
  NOW()
FROM posts p, auth.users u
WHERE p.title = 'Garba pas cher près de l''université'
AND EXISTS (SELECT 1 FROM comments LIMIT 1)
LIMIT 1;

