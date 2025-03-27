-- Fonction pour initialiser les données de test
CREATE OR REPLACE FUNCTION init_test_data()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  admin_id UUID;
BEGIN
  -- Récupérer un ID d'utilisateur administrateur
  SELECT id INTO admin_id FROM auth.users LIMIT 1;
  
  IF admin_id IS NULL THEN
    RAISE EXCEPTION 'Aucun utilisateur trouvé dans la base de données';
  END IF;

  -- Insertion des catégories
  INSERT INTO categories (id, name, description, created_at)
  VALUES 
    (1, 'Vie Pratique', 'Astuces quotidiennes, petites annonces, conseils pour économiser', NOW()),
    (2, 'Tabous et Sans Filtre', 'Sujets sensibles avec anonymat, parle sans drap', NOW()),
    (3, 'Culture & Détente', 'Humour, musique, cuisine ivoirienne, zouglou, coupé-décalé', NOW())
  ON CONFLICT (id) DO NOTHING;

  -- Insertion de forums de test
  INSERT INTO forums (title, description, category_id, is_private, creator_id, created_at)
  VALUES 
    ('Comment économiser à Abidjan  category_id, is_private, creator_id, created_at)
  VALUES 
    ('Comment économiser à Abidjan ?', 'Partagez vos astuces pour économiser au quotidien à Abidjan', 1, false, admin_id, NOW()),
    ('Le meilleur garba de Cocody', 'À la recherche du meilleur garba du quartier', 3, false, admin_id, NOW()),
    ('Parler de sexe, c''est dur ?', 'Discussions ouvertes sur la sexualité sans tabou', 2, false, admin_id, NOW())
  ON CONFLICT (title) DO NOTHING;

  -- Insertion de posts de test
  INSERT INTO posts (title, content, forum_id, author_id, is_anonymous, created_at)
  SELECT 
    'Astuces pour les transports en commun', 
    'J''ai découvert qu''en prenant les gbaka tôt le matin (avant 6h30), on paie moins cher sur certaines lignes. Quelqu''un d''autre a des astuces à partager ?', 
    id, 
    admin_id, 
    false, 
    NOW()
  FROM forums
  WHERE title = 'Comment économiser à Abidjan ?'
  LIMIT 1;

  INSERT INTO posts (title, content, forum_id, author_id, is_anonymous, created_at)
  SELECT 
    'Garba pas cher près de l''université', 
    'Il y a un super garbadrôme près de l''université qui fait un garba à 500 FCFA. La qualité est top et les portions sont généreuses. C''est à côté de la pharmacie du campus.', 
    id, 
    admin_id, 
    false, 
    NOW()
  FROM forums
  WHERE title = 'Le meilleur garba de Cocody'
  LIMIT 1;

  -- Insertion de commentaires de test
  INSERT INTO comments (content, post_id, author_id, is_anonymous, created_at)
  SELECT 
    'Merci pour l''info ! Je vais essayer demain matin.', 
    p.id, 
    admin_id, 
    false, 
    NOW()
  FROM posts p
  WHERE p.title = 'Astuces pour les transports en commun'
  LIMIT 1;

  INSERT INTO comments (content, post_id, author_id, is_anonymous, created_at)
  SELECT 
    'J''y suis allé hier, c''est vraiment bon ! Merci pour la recommandation.', 
    p.id, 
    admin_id, 
    false, 
    NOW()
  FROM posts p
  WHERE p.title = 'Garba pas cher près de l''université'
  LIMIT 1;

  RETURN TRUE;
END;
$$;

